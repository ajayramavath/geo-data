package controller

import (
	"fmt"
	"log"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/ajayramavath/geo-data-app/server/database"
	"github.com/ajayramavath/geo-data-app/server/models"
	"github.com/ajayramavath/geo-data-app/server/util"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
)

func validateEmail(email string) bool {
	Re := regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
	return Re.MatchString(email)

}

func Register(c *fiber.Ctx) error {
	var data map[string]interface{}
	var userData models.User
	if err := c.BodyParser(&data); err != nil {
		fmt.Println("Unable to pass body")
	}

	//check if pass is less than 8 characters

	if len(data["password"].(string)) < 8 {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Password must be atleat 8 characters",
		})
	}

	//check if email given is valid

	if !validateEmail(strings.TrimSpace(data["email"].(string))) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Invalid Email Address",
		})
	}

	//check if email already exists in our database

	database.DB.Where("email=?", strings.TrimSpace(data["email"].(string))).First(&userData)
	if userData.ID != 0 {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Email Already Exists",
		})
	}

	// Adding user to the database
	user := models.User{
		Name:  data["name"].(string),
		Email: strings.TrimSpace(data["email"].(string)),
	}
	user.SetPassword(data["password"].(string))
	if err := database.DB.Create(&user); err != nil {
		log.Println(err)
	}
	c.Status(200)
	return c.JSON(fiber.Map{
		"user":    user,
		"message": "Account created successfully",
	})
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		fmt.Println("Unable to pass body")
	}
	var user models.User

	//check if user is registered
	database.DB.Where("email=?", data["email"]).First(&user)
	if user.ID == 0 {
		c.Status(404)
		return c.JSON(fiber.Map{
			"message": "Email does not exists.Please Sign Up",
		})
	}

	// check if password is correct
	if err := user.ComparePassword(data["password"]); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Incorrect Password",
		})
	}

	//Authenticate user
	token, err := util.GenerateJwt(strconv.Itoa(int(user.ID)))
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return nil
	}
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "Logged In!",
		"user":    user,
	})

}

type Claims struct {
	jwt.StandardClaims
}

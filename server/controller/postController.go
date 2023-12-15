package controller

import (
	"errors"
	"fmt"
	"math"
	"net/http"
	"strconv"

	"github.com/ajayramavath/geo-data-app/server/database"
	"github.com/ajayramavath/geo-data-app/server/models"
	"github.com/ajayramavath/geo-data-app/server/util"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"gorm.io/gorm"
)

func CreatePost(c *fiber.Ctx) error {
	var post models.File
	if err := c.BodyParser(&post); err != nil {
		fmt.Println("Unable to pass body")
	}
	if err := database.DB.Create(&post).Error; err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Invalid Payload",
		})

	}

	// file, err := c.FormFile("file")
	// if err != nil {
	// 	c.Status(400)
	// 	return c.JSON(fiber.Map{
	// 		"message": "Error in file upload",
	// 	})
	// }
	// filename := randLetter(5) + "-" + file.Filename

	// if err := c.SaveFile(file, "./uploads/"+filename); err != nil {
	// 	return c.JSON(fiber.Map{
	// 		"message": "could not save file",
	// 	})
	// }
	return c.JSON(fiber.Map{
		"message": "Congrats, Your post is live",
		"post":    post,
		//"url":     "http://localhost:3000/api/uploads/" + filename,
	})

}
func GetAllPosts(c *fiber.Ctx) error {
	page, _ := strconv.Atoi(c.Query("page", "1"))
	limit := 5
	offset := (page - 1) * limit
	var total int64
	var getpost []models.File
	database.DB.Preload("User").Offset(offset).Limit(limit).Find(&getpost)
	database.DB.Model(&models.File{}).Count(&total)
	return c.JSON(fiber.Map{
		"data": getpost,
		"meta": fiber.Map{
			"total":     total,
			"page":      page,
			"last_page": math.Ceil((float64(int(total) / limit))),
		},
	})
}
func SendFile(c *fiber.Ctx) error {
	fileName := c.Params("name")
	err := filesystem.SendFile(c, http.Dir("./uploads"), "./uploads"+fileName)
	if err != nil {
		return c.JSON(fiber.Map{
			"message": "Something Happened",
		})
	}
	return nil
}

func PostById(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var post models.File
	database.DB.Where("id = ?", id).Preload("User").First(&post)
	return c.JSON(fiber.Map{
		"data": post,
	})
}

func UpdatePost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	post := models.File{
		Id: uint(id),
	}
	if err := c.BodyParser(&post); err != nil {
		fmt.Println("Unable to pass body")
	}
	database.DB.Model(&post).Updates(post)
	return c.JSON(post)

}

func UserPosts(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	id, _ := util.Parsejwt(cookie)
	var post []models.File
	database.DB.Model(&post).Where("user_id=?", id).Preload("User").Find(&post)
	return c.JSON(post)

}

func DeletePost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	post := models.File{
		Id: uint(id),
	}
	deleteQuery := database.DB.Delete(&post)
	if errors.Is(deleteQuery.Error, gorm.ErrRecordNotFound) {
		return c.JSON(fiber.Map{
			"message": "Post Not Found!",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Post deleted!",
	})

}

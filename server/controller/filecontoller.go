package controller

import (
	"math/rand"

	"github.com/gofiber/fiber/v2"
)

var letters = []rune("abcdefghijklmnopqrsuvwxyz")

func randLetter(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

func Upload(c *fiber.Ctx) error {
	file, err := c.FormFile("file")
	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Error in file upload",
		})
	}
	filename := randLetter(5) + "-" + file.Filename

	if err := c.SaveFile(file, "./uploads/"+filename); err != nil {
		return c.JSON(fiber.Map{
			"message": "could not save file",
		})
	}
	return c.JSON(fiber.Map{
		"url":  "http://localhost:3000/api/uploads/" + filename,
		"name": filename,
	})
}

package main

import (
	"log"
	"os"

	"github.com/ajayramavath/geo-data-app/server/database"
	"github.com/ajayramavath/geo-data-app/server/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {

	database.Connect()
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	port := os.Getenv("PORT")

	app := fiber.New()

	routes.Setup(app)

	app.Listen(":" + port)
}

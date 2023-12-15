package main

import (
	"log"
	"os"

	"github.com/ajayramavath/geo-data-app/server/database"
	"github.com/ajayramavath/geo-data-app/server/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
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

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3001",
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
		AllowHeaders:     "Origin,Content-Type,Accept,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin,Access-Control-Allow-Headers,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization",
		AllowCredentials: true,
		MaxAge:           300,
	}))

	routes.Setup(app)

	app.Listen(":" + port)
}

package routes

import (
	"github.com/ajayramavath/geo-data-app/server/controller"
	"github.com/ajayramavath/geo-data-app/server/middleware"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Please login",
		})
	})
	app.Post("/api/register", controller.Register)
	app.Post("/api/login", controller.Login)
	app.Use(middleware.IsAuthenticated)
	app.Post("/api/post", controller.CreatePost)
	app.Put("/api/updatepost/:id", controller.UpdatePost)
	app.Get("/api/uniquepost", controller.UserPosts)
	app.Get("/api/allpost", controller.GetAllPosts)
	app.Get("/api/post/:id", controller.PostById)
	app.Use("/api/getfile/:name", controller.SendFile)
	app.Delete("/api/deletepost/:id", controller.DeletePost)
	app.Post("/api/upload-file", controller.Upload)
	app.Post("/api/logout", controller.Logout)
	app.Static("/api/uploads", "./uploads")

}

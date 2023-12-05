package models

type File struct {
	Id       uint   `gorm:"Primarykey"`
	Title    string `json:"title"`
	Filename string `json:"file_name"`
	UserID   string `json:"userid"`
	User     User   `gorm:"foriegnkey:UserID"`
}

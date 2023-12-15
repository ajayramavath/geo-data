package models

type File struct {
	Id       uint   `gorm:"Primarykey"`
	Title    string `json:"title"`
	Filename string `json:"filename"`
	Url      string `json:"url"`
	UserID   string `json:"userid"`
	User     User   `gorm:"foriegnkey:UserID"`
}

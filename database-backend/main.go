package main

import (
	"database-backend/entity"
	"database/sql"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"net/http"
)

func main() {
	handler := gin.Default()
	handler.GET("/test", test)

	handler.GET("/qrcode", getQRcode)
	handler.POST("/qrcode", setQRcode)

	handler.GET("/contract", getLaborContract)
	handler.POST("/contract", setLaborContract)
	handler.DELETE("/contract", deleteLaborContract)

	handler.Run()
}

func getQRcode(c *gin.Context) {
	wpindex, date := c.Query("workplaceindex"), c.Query("date")
	db, err := sql.Open("mysql", "root:rootroot@tcp(127.0.0.1:3306)/capstone")

	defer db.Close()

	if err != nil {
		panic(err)
	}

	var qr entity.Qrcode

	err = db.QueryRow("SELECT * FROM qrcodecheck WHERE workplaceindex= ? AND date1= ?",
		wpindex, date).Scan(&qr.WorkplaceIndex, &qr.Date, &qr.RandomNum)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, qr)
}

func setQRcode(c *gin.Context) {
	var qr entity.Qrcode

	err := c.BindJSON(&qr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	db, err := sql.Open("mysql", "root:rootroot@tcp(127.0.0.1:3306)/capstone")
	defer db.Close()
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("INSERT INTO qrcodecheck VALUES (?, ?, ?)", qr.WorkplaceIndex, qr.Date, qr.RandomNum)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, qr)
}

func getLaborContract(c *gin.Context) {
	
}

func setLaborContract(c *gin.Context) {

}

func deleteLaborContract(c *gin.Context) {

}

func test(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "testok",
	})
}

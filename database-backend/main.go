package main

import (
	"github.com/gin-gonic/gin"
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

}

func setQRcode(c *gin.Context) {

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

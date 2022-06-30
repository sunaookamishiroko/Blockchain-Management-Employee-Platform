package main

import (
	"database-backend/entity"
	"database/sql"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"net/http"
)

func main() {
	handler := gin.Default()
	handler.Use(CORSMiddleware())

	handler.GET("/qrcode", getQRcode)
	handler.POST("/qrcode", setQRcode)

	handler.GET("/contract", getLaborContract)
	handler.POST("/contract", setLaborContract)
	handler.DELETE("/contract", deleteLaborContract)

	handler.Run(":8080")
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

	switch {
	case err == sql.ErrNoRows:
		c.Status(http.StatusOK)
		return
	case err != nil:
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
		log.Print(err.Error())
		return
	}

	db, err := sql.Open("mysql", "root:rootroot@tcp(127.0.0.1:3306)/capstone")
	defer db.Close()
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("INSERT INTO qrcodecheck VALUES (?, ?, ?)", qr.WorkplaceIndex, qr.Date, qr.RandomNum)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.Status(http.StatusCreated)
}

func getLaborContract(c *gin.Context) {
	address := c.Query("address")

	db, err := sql.Open("mysql", "root:rootroot@tcp(127.0.0.1:3306)/capstone")
	defer db.Close()
	if err != nil {
		panic(err)
	}

	rows, err := db.Query("SELECT * FROM laborcontract WHERE address= ?", address)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		log.Print(err.Error())
		return
	}

	contracts := make([]entity.LaborContract, 0)

	for rows.Next() {
		var contract entity.LaborContract
		err = rows.Scan(
			&contract.Address,
			&contract.WpName,
			&contract.WpEmployer,
			&contract.EmployeeName,
			&contract.WorkplaceIndex,
			&contract.Period,
			&contract.Duties,
			&contract.WorkingTime,
			&contract.WorkingDays,
			&contract.Wage,
			&contract.WageDay,
			&contract.Comment,
		)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		contracts = append(contracts, contract)
	}

	c.JSON(http.StatusOK, contracts)
}

func setLaborContract(c *gin.Context) {
	var contract entity.LaborContract

	err := c.BindJSON(&contract)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		log.Print(err.Error())
		return
	}

	db, err := sql.Open("mysql", "root:rootroot@tcp(127.0.0.1:3306)/capstone")
	defer db.Close()
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("INSERT INTO laborcontract VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?",
		contract.Address,
		contract.WpName,
		contract.WpEmployer,
		contract.EmployeeName,
		contract.WorkplaceIndex,
		contract.Period,
		contract.Duties,
		contract.WorkingTime,
		contract.WorkingDays,
		contract.Wage,
		contract.WageDay,
		contract.Comment)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.Status(http.StatusCreated)
}

func deleteLaborContract(c *gin.Context) {
	var info map[string]interface{}
	err := c.BindJSON(&info)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		log.Print(err.Error())
		return
	}

	db, err := sql.Open("mysql", "root:rootroot@tcp(127.0.0.1:3306)/capstone")
	defer db.Close()
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("DELETE FROM laborcontract WHERE address= ? AND workplaceindex= ?",
		info["address"].(string), int(info["workplaceindex"].(float64)))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.Status(http.StatusOK)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, DELETE, POST")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

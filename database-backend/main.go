package main

import (
	"database-backend/entity"
	"database/sql"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"net/http"
)

// 드라이버 이름과 DB 연결 주소
var driverName = "mysql"
var dataSourceName = "root:rootroot@tcp(127.0.0.1:3306)/capstone"

func main() {
	router := gin.Default()
	router.Use(corsMiddleware())

	router.GET("/qrcode", getQRcode)
	router.POST("/qrcode", setQRcode)

	router.GET("/contract", getLaborContract)
	router.POST("/contract", setLaborContract)
	router.DELETE("/contract", deleteLaborContract)

	router.Run(":8080")
}

// qrcode 불러오기 (GET)
// 해당하는 workplaceindex와 날짜 필요
// ex) /qrcode?workplaceindex=0&date=2022-07-01
func getQRcode(c *gin.Context) {
	wpindex, date := c.Query("workplaceindex"), c.Query("date")

	db, err := sql.Open(driverName, dataSourceName)
	defer db.Close()
	if err != nil {
		panic(err)
	}

	var qr entity.Qrcode

	err = db.QueryRow("SELECT * FROM qrcode WHERE workplaceindex= ? AND date= ?",
		wpindex, date).Scan(&qr.WorkplaceIndex, &qr.Date, &qr.RandomNum)

	switch {
	case err == sql.ErrNoRows:
		c.Status(http.StatusOK)
		return
	case err != nil:
		c.JSON(http.StatusBadRequest, errorResponse(err))
		log.Print(err.Error())
		return
	}

	c.JSON(http.StatusOK, qr)
}

// qrcode 업로드 (POST)
// 해당하는 workplaceindex, 날짜, randomnum 필요
// ex) /qrcode
// 입력은 json
func setQRcode(c *gin.Context) {
	var qr entity.Qrcode

	err := c.BindJSON(&qr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, errorResponse(err))
		log.Print(err.Error())
		return
	}

	db, err := sql.Open(driverName, dataSourceName)
	defer db.Close()
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("INSERT INTO qrcode VALUES (?, ?, ?)", qr.WorkplaceIndex, qr.Date, qr.RandomNum)

	if err != nil {
		c.JSON(http.StatusBadRequest, errorResponse(err))
		log.Print(err.Error())
		return
	}

	c.Status(http.StatusCreated)
}

// 임시 근로 계약서 불러오기 (GET)
// 해당하는 address 필요
// ex) /contract?address=0xffffffffffffffffffffffffffffffffffffffff
func getLaborContract(c *gin.Context) {
	address := c.Query("address")

	db, err := sql.Open(driverName, dataSourceName)
	defer db.Close()
	if err != nil {
		panic(err)
	}

	rows, err := db.Query("SELECT * FROM laborcontract WHERE address= ?", address)

	if err != nil {
		c.JSON(http.StatusInternalServerError, errorResponse(err))
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
			c.JSON(http.StatusBadRequest, errorResponse(err))
			log.Print(err.Error())
			return
		}

		contracts = append(contracts, contract)
	}

	c.JSON(http.StatusOK, contracts)
}

// 임시 근로 계약서 업로드 (POST)
// 해당하는 entity 필요
// ex) /contract
// 입력은 json
func setLaborContract(c *gin.Context) {
	var contract entity.LaborContract

	err := c.BindJSON(&contract)
	if err != nil {
		c.JSON(http.StatusInternalServerError, errorResponse(err))
		log.Print(err.Error())
		return
	}

	db, err := sql.Open(driverName, dataSourceName)
	defer db.Close()
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("INSERT INTO laborcontract VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
		c.JSON(http.StatusBadRequest, errorResponse(err))
		log.Print(err.Error())
		return
	}

	c.Status(http.StatusCreated)
}

// 임시 근로 계약서 삭제 (DELETE)
// address와 workplaceindex 필요
// ex) /contract
// 입력은 json
func deleteLaborContract(c *gin.Context) {
	var req struct {
		Address        string
		Workplaceindex int
	}

	err := c.BindJSON(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, errorResponse(err))
		log.Print(err.Error())
		return
	}

	db, err := sql.Open(driverName, dataSourceName)
	defer db.Close()
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("DELETE FROM laborcontract WHERE address= ? AND workplaceindex= ?",
		req.Address, req.Workplaceindex)

	if err != nil {
		c.JSON(http.StatusBadRequest, errorResponse(err))
		log.Print(err.Error())
		return
	}

	c.Status(http.StatusOK)
}

// CORS 해결하기 위한 함수
func corsMiddleware() gin.HandlerFunc {
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

// error에 대한 Map 반환
func errorResponse(err error) gin.H {
	return gin.H{
		"error": err.Error(),
	}
}

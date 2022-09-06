package main

import (
	"bytes"
	"database-backend/entity"
	"database/sql"
	"encoding/json"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestSetQRcode(t *testing.T) {
	// before
	router := gin.Default()
	router.POST("/qrcode", setQRcode)

	qr := entity.Qrcode{
		WorkplaceIndex: 0,
		Date:           "2022-09-07",
		RandomNum:      1234,
	}
	body, _ := json.Marshal(qr)

	// do
	req, _ := http.NewRequest("POST", "/qrocde", bytes.NewBuffer(body))
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// after
	assert := assert.New(t)

	db, _ := sql.Open("mysql", "root:rootroot@tcp(127.0.0.1:3306)/capstone")
	defer db.Close()

	db.QueryRow("SELECT * FROM qrcode WHERE workplaceindex= ? AND date= ?",
		0, "2022-09-07").Scan(&qr.WorkplaceIndex, &qr.Date, &qr.RandomNum)

	assert.Equal(0, qr.WorkplaceIndex)
	assert.Equal("2022-09-07", qr.Date)
	assert.Equal(1234, qr.RandomNum)
}

func TestGetQRcode(t *testing.T) {
	// before
	router := gin.Default()
	router.GET("/qrcode", getQRcode)

	db, _ := sql.Open("mysql", "root:rootroot@tcp(127.0.0.1:3306)/capstone")
	defer db.Close()

	db.Exec("INSERT INTO qrcode VALUES (?, ?, ?)", 0, "2022-09-07", 1234)

	// do
	req, _ := http.NewRequest("GET", "/qrcode?workplaceindex=0&date=2022-09-07", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// after
	assert := assert.New(t)
	var qr entity.Qrcode
	json.Unmarshal(w.Body.Bytes(), &qr)

	assert.Equal(0, qr.WorkplaceIndex)
	assert.Equal("2022-09-07", qr.Date)
	assert.Equal(1234, qr.RandomNum)
}

func TestSetLaborContract(t *testing.T) {

}

func TestGetLaborContract(t *testing.T) {

}

func TestDeleteLaborContract(t *testing.T) {

}

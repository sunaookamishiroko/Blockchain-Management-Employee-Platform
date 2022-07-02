package main

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestGetQRcode(t *testing.T) {
	router := gin.Default()
	router.GET("/qrcode", getQRcode)
	assert := assert.New(t)

	db, err := sql.Open("mysql", "root:rootroot@tcp(127.0.0.1:3306)/capstone")
	defer db.Close()
	if err != nil {
		panic(err)
	}
	_, err = db.Exec("INSERT INTO qrcodecheck VALUES (?, ?, ?)", 0, "2022-12-01", 123456)
	if err != nil {
		t.Error()
	}

}

func TestSetQRcode(t *testing.T) {

}

func TestGetLaborContract(t *testing.T) {

}

func TestSetLaborContract(t *testing.T) {

}

func TestDeleteLaborContract(t *testing.T) {

}

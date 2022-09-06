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

	var actual entity.Qrcode
	db.QueryRow("SELECT * FROM qrcode WHERE workplaceindex= ? AND date= ?",
		0, "2022-09-07").Scan(&actual.WorkplaceIndex, &actual.Date, &actual.RandomNum)

	assert.Equal(qr, actual)
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

	expected := entity.Qrcode{
		WorkplaceIndex: 0,
		Date:           "2022-09-07",
		RandomNum:      1234,
	}
	assert.Equal(expected, qr)
}

func TestSetLaborContract(t *testing.T) {
	// before
	router := gin.Default()
	router.POST("/laborcontract", setLaborContract)

	contract1 := entity.LaborContract{
		Address:        "0x8F22cbB2Fe066d8671c9C09bfF005F0507e1627e",
		WpName:         "GS25 한국공학대점",
		WpEmployer:     "홍길동",
		EmployeeName:   "이서윤",
		WorkplaceIndex: 0,
		Period:         "2022-04-28~2022-06-30",
		Duties:         "서빙 재고정리",
		WorkingTime:    "12:00-19:00",
		WorkingDays:    "목금",
		Wage:           "9160",
		WageDay:        "매달 31일",
		Comment:        "없음",
	}
	body1, _ := json.Marshal(contract1)

	contract2 := entity.LaborContract{
		Address:        "0x8F22cbB2Fe066d8671c9C09bfF005F0507e1627e",
		WpName:         "올리브영 시화점",
		WpEmployer:     "호잇호잇",
		EmployeeName:   "이서윤",
		WorkplaceIndex: 1,
		Period:         "2022-03-01~2022-09-30",
		Duties:         "계산",
		WorkingTime:    "13:00-20:00",
		WorkingDays:    "토일",
		Wage:           "10000",
		WageDay:        "매달 31일",
		Comment:        "없음",
	}
	body2, _ := json.Marshal(contract2)

	// do
	req, _ := http.NewRequest("POST", "/laborcontract", bytes.NewBuffer(body1))
	w1 := httptest.NewRecorder()
	router.ServeHTTP(w1, req)

	req, _ = http.NewRequest("POST", "/laborcontract", bytes.NewBuffer(body2))
	w2 := httptest.NewRecorder()
	router.ServeHTTP(w2, req)

	// after
	assert := assert.New(t)
	db, _ := sql.Open("mysql", "root:rootroot@tcp(127.0.0.1:3306)/capstone")
	defer db.Close()

	rows, _ := db.Query("SELECT * FROM laborcontract WHERE address= ?",
		"0x8F22cbB2Fe066d8671c9C09bfF005F0507e1627e")

	contracts := make([]entity.LaborContract, 0)

	for rows.Next() {
		var contract entity.LaborContract
		rows.Scan(
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

		contracts = append(contracts, contract)
	}

	assert.Equal(contract1, contracts[0])
	assert.Equal(contract2, contracts[1])
}

func TestGetLaborContract(t *testing.T) {
	// before
}

func TestDeleteLaborContract(t *testing.T) {

}

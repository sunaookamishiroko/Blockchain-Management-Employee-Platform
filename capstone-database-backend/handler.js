'use strict';

const mysql = require('serverless-mysql')({
  config: {
    host     : 'blockchain-db.c8fuurdwdt8q.ap-northeast-2.rds.amazonaws.com',    // 호스트 주소
    user     : 'admin',           // mysql user
    password : 'adminadmin',      // mysql password
    database : 'capstone'         // mysql 데이터베이스
  }
})

// qr 코드 가져오기
module.exports.getQrcode = async (event, context, callback) => {

  const { workplaceindex, date } = event.queryStringParameters;


  let results = await mysql.query(
    `SELECT * FROM qrcodecheck WHERE workplaceindex=${workplaceindex} AND date1="${date}"`
  );

  await mysql.end();
  mysql.quit();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(results)
  };
};

// qr 코드 설정하기
module.exports.setQrcode = async (event, context, callback) => {

  const { workplaceindex, date, randomnum } = JSON.parse(event.body);

  let results = await mysql.query(
    `INSERT INTO qrcodecheck VALUES (${workplaceindex}, "${date}", ${randomnum})`
  );

  await mysql.end();
  mysql.quit();

  return {
    statusCode: 200,
    body: JSON.stringify(results)
  };
}

// 근로계약서 요청 가져오기 
module.exports.getLaborcontract = async (event, context, callback) => {

  const { address } = event.queryStringParameters;

  let results = await mysql.query(
    `SELECT * FROM laborcontract WHERE address="${address}"`
  );

  await mysql.end();
  mysql.quit();

  return {
    statusCode: 200,
    body: JSON.stringify(results)
  };
}

// 근로계약서 요청 보내기
module.exports.setLaborcontract = async (event, context, callback) => {
  
  const {
    address,
    wpname,
    wpemployer,
    employeename,
    workplaceindex,
    period,
    duties,
    workingtime,
    workingdays,
    wage,
    wageday,
    comment
  } = JSON.parse(event.body);
  
  let results = await mysql.query(
    `INSERT INTO laborcontract VALUES ("${address}", "${wpname}", "${wpemployer}", "${employeename}",
     ${workplaceindex}, "${period}", "${duties}", "${workingtime}", "${workingdays}", "${wage}", 
     "${wageday}", "${comment}")`
  );

  await mysql.end();
  mysql.quit();


  return {
    statusCode: 200,
    body : JSON.stringify(results)
  }
  
}

module.exports.deleteLaborcontract = async (event, context, callback) => {
  
  const { address, workplaceindex } = JSON.parse(event.body);
  
  let results = await mysql.query(
    `DELETE FROM laborcontract WHERE address="${address}" AND workplaceindex=${workplaceindex}`
  );

  await mysql.end();
  mysql.quit();


  return {
    statusCode: 200,
    body : JSON.stringify(results)
  }
  
}
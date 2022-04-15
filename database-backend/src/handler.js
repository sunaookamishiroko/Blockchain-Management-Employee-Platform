'use strict';

module.exports.getQrcode = async (event, context, callback) => {

  const {id, password} = JSON.parse(event.body);

  
  return {
    statusCode: 200,
    body: JSON.stringify(body)
  };
};

module.exports.setQrcdoe = async (event, context, callback) => {

  ///////////////////////////////////////쿠키, 응답 선언하기////////////////////////////////////////////
  const {date_list, is_weekend, outStayAplyDt, cookies} = JSON.parse(event.body);


  
  return {
    statusCode: 200,
    body: JSON.stringify(body)
  }
}

module.exports.getLaborcontract = async (event, context, callback) => {


  const {yy, tmGbn, userNm, cookies} = JSON.parse(event.body);
  

  return {
    statusCode: 200,
    body : JSON.stringify(body)
  }
}

module.exports.setLaborcontract = async (event, context, callback) => {

  ///////////////////////////////////////쿠키, 응답 선언하기////////////////////////////////////////////


  const {userNm, cookies} = JSON.parse(event.body);


  return {
    statusCode: 200,
    body : JSON.stringify(body)
  }
  
}
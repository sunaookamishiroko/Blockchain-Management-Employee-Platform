import React, { useState, useEffect } from "react";
import styled from "styled-components";
import QRCode from "qrcode.react";

import { ENDPOINT } from "../../proxySetting.js";

import axios from "axios";
import { Button } from "@mui/material";

/*
QR 코드를 보여주는 컴포넌트 입니다.
*/

const StyledQRComponent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 294px;
  height: 300px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  border-radius: 20px;
  background-color: #f7f7f7;
  margin-bottom: 20px;
`;

const QRComponent = ({ wpinfo }) => {
  useEffect(() => {
    isMakeQrcode();
  }, []);

  const [isqrcode, setIsqrcode] = useState(null);
  const [QRvalue, setQRvalue] = useState(null);

  // 해당하는 날짜에 생성한 qr코드가 db에 있는지 체크하는 함수
  const isMakeQrcode = async () => {
    try {
      const response = await axios.get(
        `${ENDPOINT}getqrcode?workplaceindex=${wpinfo[0]}&date=2022-05-31`
      );
        
      if (response.data.length == 0) {
        setIsqrcode(false);
      } else {
        setQRvalue(response.data[0].randomnum);
        setIsqrcode(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // qr코드를 생성해 db에 올리는 함수
  const MakeQrcode = async () => {
    let random = Math.floor(Math.random() * 100000000) + 1;

    const body = {
      workplaceindex: 0,
      date: "2022-05-31",
      randomnum: random,
    };

    try {
      const response = await axios.post(`${ENDPOINT}setqrcode`, body);

      if (response.status !== 200) alert("db 에러 발생");
      else {
        setQRvalue(random);
        setIsqrcode(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <StyledQRComponent>
      <h2 style={{ textAlign: "center" }}>QR 코드 인증</h2>
      {isqrcode == null && <p>데이터를 불러오는 중입니다...</p>}
      {isqrcode == true && (
        <>
          <QRCode value={QRvalue.toString()} />
        </>
      )}
      {isqrcode == false && (
        <Button onClick={MakeQrcode}>QR코드 생성하기</Button>
      )}
    </StyledQRComponent>
  );
};

export default QRComponent;

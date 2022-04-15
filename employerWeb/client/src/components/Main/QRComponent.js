import React from "react";
import styled from "styled-components";
import QRCode from "qrcode.react";
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

const QRComponent = () => {
  const QRValue = Math.floor(Math.random() * 100000000) + 1;
  return (
    <StyledQRComponent>
      <h2 style={{ textAlign: "center" }}>QR 코드 인증</h2>
      {/* value에 url을 쏴줄 것 
      string 값도 가능*/}
      <h1>{QRValue}</h1>
      <QRCode value={QRValue.toString()} />
    </StyledQRComponent>
  );
};

export default QRComponent;

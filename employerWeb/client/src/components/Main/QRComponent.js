import React from "react";
import styled from "styled-components";

/*
QR 코드를 보여주는 컴포넌트 입니다.

*/

const StyledQRComponent = styled.div`
  width: 294px;
  height: 300px;
  box-shadow: 5px 5px 5px 5px gray;
  border-radius: 20px;
  background-color: #f7f7f7;
  margin-bottom: 20px;
`;

const QRComponent = () => {
  return (
    <StyledQRComponent>
      <h2 style={{ textAlign: "center" }}>QR 코드 인증</h2>
    </StyledQRComponent>
  );
};

export default QRComponent;

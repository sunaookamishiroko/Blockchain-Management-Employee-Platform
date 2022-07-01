import React from "react";
import styled from "styled-components";

const TANotification = styled.div`
  width: 100%;
  height: 70%;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  border-radius: 20px;
  background-color: #f7f7f7;
`;

// 실시간 근태 알람이 들어갈 자리지만 시간 관계상 생략
const TANotificationComponent = () => {
  return (
    <TANotification>
      <h2 style={{ textAlign: "center" }}></h2>
    </TANotification>
  );
};

export default TANotificationComponent;

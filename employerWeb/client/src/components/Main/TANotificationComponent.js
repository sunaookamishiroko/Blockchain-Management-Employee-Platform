import React from "react";
import styled from "styled-components";

const TANotification = styled.div`
  width: 294px;
  height: 490px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  border-radius: 20px;
  background-color: #f7f7f7;
`;

const TANotificationComponent = () => {
  return (
    <TANotification>
      <h2 style={{ textAlign: "center" }}>실시간 근태 알림</h2>
    </TANotification>
  );
};

export default TANotificationComponent;

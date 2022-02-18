import { textAlign } from "@mui/system";
import React from "react";
import styled from "styled-components";

const TANotification = styled.div`
  width: 294px;
  height: 560px;
  box-shadow: 5px 5px 5px 5px gray;
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

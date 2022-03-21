import React from "react";
import styled from "styled-components";
import QRComponent from "./QRComponent";
import TANotificationComponent from "./TANotificationComponent";

const RightSide = styled.div`
  display: flex;
  flex-direction: column;

  margin: 25px;
`;

const RightSideComponent = () => {
  return (
    <RightSide>
      <QRComponent />
      <TANotificationComponent />
    </RightSide>
  );
};

export default RightSideComponent;

import React from "react";
import styled from "styled-components";
import QRComponent from "./QRComponent";
import TANotificationComponent from "./TANotificationComponent";

const RightSide = styled.div`
  display: flex;
  flex-direction: column;

  margin: 48px 48px 48px 0;
`;

const RightSideComponent = ({ wpinfo }) => {
  return (
    <RightSide>
      <QRComponent wpinfo={wpinfo} />
      <TANotificationComponent />
    </RightSide>
  );
};

export default RightSideComponent;

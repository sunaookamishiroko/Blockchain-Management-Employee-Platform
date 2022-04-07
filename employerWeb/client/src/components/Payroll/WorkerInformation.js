import React from "react";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  border-radius: 20px;
  background-color: #f7f7f7;
  margin-bottom: 50px;
  padding: 0px 24px 0 24px;
`;

const WorkerInformation = () => {
  return (
    <Content>
      <h1>김영희 님의 급여정산 내역</h1>
    </Content>
  );
};

export default WorkerInformation;

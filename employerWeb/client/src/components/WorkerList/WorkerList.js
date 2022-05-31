import React from "react";
import styled from "styled-components";
import WorkerListAdapter from "./WorkerListAdapter";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 72px 48px 72px 48px;
  padding: 0 24px 0 24px;
  width: 40%;
  height: auto;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  border-radius: 20px;
  background-color: #f7f7f7;

  h1 {
    font-size: 26px;
    font-family: "Noto Sans CJK KR";
  }
`;

const WorkerList = ({ ready, customworkers, onClickEnquiry }) => {

  return (
    <Content>
      <h1>근로자 목록</h1>
      {ready == true || !ready ? (
        <WorkerListAdapter
          workers={customworkers}
          onClickEnquiry={onClickEnquiry}
        />
      ) : (
        <p>잠시만 기다려 주세요...</p>
      )}
    </Content>
  );
};

export default WorkerList;

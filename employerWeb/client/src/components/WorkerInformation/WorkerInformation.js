import React from "react";
import styled from "styled-components";
import Buttons from "./Buttons";
import Profile from "./Profile";
import WorkingDetails from "./WorkingDetails";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 72px 96px 72px 0;
  padding: 0 24px 20px 24px;
  width: 60%;
  height: auto;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  border-radius: 20px;
  background-color: #ffffff;

  h1 {
    font-size: 26px;
    font-family: "Noto Sans CJK KR";
  }

  hr {
    width: 100%;
    border: none;
    height: 4px;
    background-color: #f1f1f1;
  }
`;

const WorkerInformation = ({
  userdata,
  selectedWorker,
  handleClickContract,
  handleClickReward,
  handleClickTermination,
}) => {

  // 근로계약서 조회
  const onClickContract = () => {
    handleClickContract(selectedWorker[1], selectedWorker[0]);
  };

  // TODO 보상 지급 버튼 클릭 시
  const onClickReward = () => {
    handleClickReward();
  };

  // TODO 근로계약 해지 버튼 클릭 시
  const onClickTermination = () => {
    handleClickTermination();
  };

  return (
    <Content>
      <h1>근로자 정보</h1>
      {selectedWorker ? (
        <>
          <Profile selectedWorker={selectedWorker} />
          <hr />
          <WorkingDetails userdata={userdata} />
          <Buttons
            onClickReward={onClickReward}
            onClickContract={onClickContract}
            onClickTermination={onClickTermination}
          />
        </>
      ) : (
        <></>
      )}
    </Content>
  );
};

export default WorkerInformation;

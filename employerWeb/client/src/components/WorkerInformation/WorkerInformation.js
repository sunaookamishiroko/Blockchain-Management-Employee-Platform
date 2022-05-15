import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Badge from "./Badge";
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

// TODO 근로자 정보 받아오는 메소드가 contract에 명시된 형식으로 불러와져야 함
// TODO 평균 근무일수, 지각률 가져와야 함 workPlaceData
const WorkerInformation = ({
  userdata,
  selectedWorker,
  laborContract,
  handleClickContract,
  handleClickReward,
  handleClickTermination,
}) => {
  // TODO 하드코딩 데이터
  const [badges, setBadges] = useState([
    {
      image: "img/badge_test.png",
      issueData: "2021/05/24",
      issuancePoint: "CGV용산",
      etc: "필요한 내용 기입",
      statement:
        "이곳에는 추가적으로 배지에 관한 내용이 기재됩니다. 이 친구 고객들에게 친절하고 지각을 한 번도 하지 않음. 보장함ㅇㅇ",
      tags: ["친절", "칭잔", "장기근속"],
    },
    "",
    "",
    "",
  ]);

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
          {/* <Badge badges={badges} setBadges={setBadges} /> */}
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

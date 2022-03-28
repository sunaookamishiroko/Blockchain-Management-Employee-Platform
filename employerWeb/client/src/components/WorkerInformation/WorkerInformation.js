import React, { useState } from "react";
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

const onClickReward = () => {
  alert("test");
};
const onClickContract = () => {};
const onClickTermination = () => {};

const WorkerInformation = () => {
  const userData = ["사오륙", "010-1234-5678", "hddgf-24-df23"];
  const userData2 = ["2021/03/01", "375일", "2022/03/11", "18%"];
  const workPlaceData = ["CU편의점 산기대점", "482일", "22%"];

  const [badges, setBadges] = useState(["badge_test", "", "", ""]);

  return (
    <Content>
      <h1>근로자 정보</h1>
      <Profile userData={userData} />
      <hr />
      <WorkingDetails userData={userData2} workPlaceData={workPlaceData} />
      <hr />
      <Badge badges={badges} setBadges={setBadges} />
      <Buttons
        onClickReward={onClickReward}
        onClickContract={onClickContract}
        onClickTermination={onClickTermination}
      />
    </Content>
  );
};

export default WorkerInformation;

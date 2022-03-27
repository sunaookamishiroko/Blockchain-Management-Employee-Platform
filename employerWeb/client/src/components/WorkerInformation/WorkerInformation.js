import React from "react";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 72px 96px 72px 0;
  padding: 0 24px 0 24px;
  width: 60%;
  height: auto;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  border-radius: 20px;
  background-color: #ffffff;

  h1 {
    font-size: 26px;
    font-family: "Noto Sans CJK KR";
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #ff000016;

  > img {
    align-self: center;
    width: 120px;
    height: 120px;
    border-radius: 25px;
    background: white;
    overflow: hidden;
    margin-right: 48px;
  }

  > div {
    background-color: #00ff0016;
    display: flex;
    flex-direction: column;

    > div {
      display: flex;
      flex-direction: row;

      > h4 {
        width: 140px;
        color: #999999;
        font-size: 20px;
        font-weight: bold;
      }

      > p {
        align-self: center;
        color: #999999;
        font-size: 20px;
      }
    }
  }
`;

const WorkerInformation = () => {
  const testData = ["이름", "연락처", "Address"];
  const testData2 = ["사오륙", "010-1234-5678", "hddgf-24-df23"];

  return (
    <Content>
      <h1>근로자 정보</h1>
      <Profile>
        <img src="img/profile.png" alt="프로필" />
        <div>
          {testData.map((data, index) => (
            <div>
              <h4>{data}</h4>
              <p>{testData2[index]}</p>
            </div>
          ))}
        </div>
      </Profile>
    </Content>
  );
};

export default WorkerInformation;

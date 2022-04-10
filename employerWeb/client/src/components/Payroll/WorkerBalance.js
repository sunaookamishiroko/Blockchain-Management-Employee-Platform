import React from "react";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  flex-direction: row;

  padding: 12px 24px 12px 24px;

  width: 100%;
  height: auto;

  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  border-radius: 20px;
  background-color: #f7f7f7;

  margin-bottom: 50px;

  background-color: #00ff0016;

  > div {
    width: 100%;
    > h2 {
      font-size: 26px;
      font-weight: bold;
      margin: 0px;
    }

    > div {
      margin-top: 12px;
      > div {
        display: flex;
        > p {
          font-size: 16px;
          color: #999999;
          font-weight: bold;
          margin: 0px;
          width: 84px;
        }
      }
    }
  }

  .div1 {
    background-color: #ff000016;
  }
  .div2 {
    background-color: #0000ff16;
  }
`;

const WorkerBalance = ({ name, accounts, balance }) => {
  return (
    <Content>
      <div className="div1">
        <h2>나의 계정 정보</h2>
        <div>
          <div>
            <p>이름:</p>
            <p>{name}</p>
          </div>
          <div>
            <p>계정주소:</p>
            <p>{accounts}</p>
          </div>
        </div>
      </div>
      <div className="div2">
        <h2>계정 잔액</h2>
        <h1>{balance} 원</h1>
      </div>
    </Content>
  );
};

export default WorkerBalance;

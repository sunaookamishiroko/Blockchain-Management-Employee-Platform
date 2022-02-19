import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ContractButton = styled.button`
  background-color: #1c89e9;
  font-family: "Noto Sans CJK KR";
  font-weight: bold;
  border: 0px;
  color: white;
  font-size: 20px;
  border-radius: 30px;
  padding-left: 30px;
  padding-right: 30px;
`;

const SettlementButton = styled(NavLink)`
  background-color: #2669a4;
  font-family: "Noto Sans CJK KR";
  font-weight: bold;
  border: 0px;
  color: white;
  text-decoration: none;
  font-size: 20px;
  border-radius: 30px;
  padding-left: 30px;
  padding-right: 30px;
`;

const WorkerListItem = ({ index, address, name, handleClickContract }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{name}</td>
      <td>
        <ContractButton
          onClick={() => {
            handleClickContract(name, address);
          }}
        >
          확인
        </ContractButton>
      </td>
      <td>
        <SettlementButton
          onDragExitCapture={("" === "main").toString()}
          to={`/Settlement`}
        >
          정산하기
        </SettlementButton>
        {/* <SettlementButton
          onClick={() => {
            handleClickSettlement(name, address);
          }}
        >
          정산하기
        </SettlementButton> */}
      </td>
    </tr>
  );
};

export default WorkerListItem;

import React, { useState } from "react";
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
  const [open, setOpen] = useState(false);

  // 근로계약서 다이얼로그 상태
  const [contractOpen, setContractOpen] = useState(false);
  // 급여정산 다이얼로그 상태
  const [settlementOpen, setSettltmentOpen] = useState(false);

  const [workername, setWorkername] = useState();
  const [contractaddress, setContractAddress] = useState();
  const [laborcontract, setLaborcontract] = useState();

  // 근로계약서 확인 버튼 눌렀을 때 호출
  const handleClickContract = (name, address) => {
    setOpen(true);
    setContractOpen(true);
    setWorkername(name);
    setContractAddress(address);
  };

  // 급여정산 정산하기 버튼 눌렀을 때 호출
  const handleClickSettlement = (name, address) => {
    setOpen(true);
    setSettltmentOpen(true);
    setWorkername(name);
    setContractAddress(address);
  };

  //

  return (
    <Content>
      <h1> 근로자 목록 </h1>
      {ready == false && <p>잠시만 기다려 주세요...</p>}  
      {ready && (
        <WorkerListAdapter
          workers={customworkers}
          // handleClickContract={handleClickContract}
          // handleClickSettlement={handleClickSettlement}
          onClickEnquiry={onClickEnquiry}
        />
      )}
    </Content>
  );
};

export default WorkerList;

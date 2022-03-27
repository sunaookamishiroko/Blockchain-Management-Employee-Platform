import React from "react";
import { useState, useRef, useCallback, useEffect } from "react";

import { NavLink } from "react-router-dom";
import styled, { ThemeConsumer } from "styled-components";
import WorkerListAdapter from "../components/WorkerList/WorkerListAdapter";
import Dialog from "@mui/material/Dialog";
import { DialogTitle } from "@mui/material";
import Categories from "../components/Categories/Categories";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import WorkerList from "../components/WorkerList/WorkerList";
import WorkerInformation from "../components/WorkerInformation/WorkerInformation";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #f5f8fb;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  padding: 10px;
  width: 100%;
  height: auto;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  border-radius: 20px;
  background-color: #f7f7f7;

  h1 {
    font-size: 26px;
    font-family: "Noto Sans CJK KR";
  }
`;

const ContractDialog = styled.div`
  width: 1280px;
  height: 720px;
  padding: 30px;
  border-radius: 15px;
  border: 3px solid #f1f1f1;
  margin: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background-color: #fc7070;
  font-family: "Noto Sans CJK KR";
  font-weight: bold;
  border: 0px;
  color: white;
  font-size: 20px;
  width: 96px;
  height: 48px;
  border-radius: 30px;
  padding-left: 30px;
  padding-right: 30px;
`;

const WorkerManagement = ({ accounts, contract, name, workers, wpinfo }) => {
  const [open, setOpen] = useState(false);

  // 근로계약서 다이얼로그 상태
  const [contractOpen, setContractOpen] = useState(false);
  // 급여정산 다이얼로그 상태
  const [settlementOpen, setSettltmentOpen] = useState(false);

  const [workername, setWorkername] = useState();
  const [customworkers, setCustomworkers] = useState();
  const [contractaddress, setContractAddress] = useState();
  const [laborcontract, setLaborcontract] = useState();

  /////////////////////////////

  const [ready, setReady] = useState(false);
  const [contractready, setContractready] = useState(false);

  useEffect(() => {
    makeCustomWorker();
  }, []);

  useEffect(() => {
    getLaborContract();
  }, [contractaddress]);

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

  const handleClose = () => {
    setContractAddress(null);
    setOpen(false);
    setSettltmentOpen(false);
    setContractOpen(false);
    setContractready(false);
  };

  const makeCustomWorker = async () => {
    let temp = [];

    for (let x = 0; x < workers[0].length; x++) {
      temp.push([workers[0][x], decodeURI(workers[1][x])]);
    }
    setCustomworkers(temp);
    setReady(true);
  };

  const getLaborContract = async () => {
    try {
      const response = await contract.methods
        .getLaborContract(0, contractaddress)
        .call({ from: accounts[0] });
      console.log(response);
      setLaborcontract(response);
      setContractready(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      {/* 근로 계약서 Dialog */}
      {contractaddress != null && (
        <Dialog maxWidth={1280} onClose={handleClose} open={contractOpen}>
          <DialogTitle> {workername} 님 </DialogTitle>
          <CloseButton onClick={handleClose} />
          {!contractready && <p>잠시만 기다려주세요...</p>}
          {contractready && (
            <ContractDialog>
              <h2> 근로 계약 기간 </h2> <p> {laborcontract[1]}</p>
              <h2> 업무 내용 </h2>
              <p> {decodeURI(laborcontract[2])} </p>
              <h2> 소정 근로 시간 </h2>
              <p> {laborcontract[3]} </p>
              <h2> 근무일 </h2>
              <p> {decodeURI(laborcontract[4])} </p>
              <h2> 임금(시급) </h2>
              <p> {laborcontract[5]} </p>
              <h2> 임금지급일 </h2>
              <p> {decodeURI(laborcontract[6])} </p>
              <h2> 기타사항 </h2>
              <p> {decodeURI(laborcontract[7])} </p>
            </ContractDialog>
          )}
        </Dialog>
      )}

      {/* 좌측 카테고리 */}
      <Categories name={name} wpname={wpinfo[1]} />

      {/* 근로자 목록 */}
      <WorkerList ready={ready} customworkers={customworkers} />

      {/* 근로자 정보 */}
      <WorkerInformation />

      {/* TODO 나중에 지울 것 */}
      {/* <Content>
        <h1> 근로자 목록 </h1>
        {!ready && <p>잠시만 기다려 주세요...</p>}
        {ready && (
          <>
            <WorkerListAdapter
              workers={customworkers}
              handleClickContract={handleClickContract}
              handleClickSettlement={handleClickSettlement}
            />
          </>
        )} */}
      {/* </Content> */}
    </Container>
  );
};

export default WorkerManagement;

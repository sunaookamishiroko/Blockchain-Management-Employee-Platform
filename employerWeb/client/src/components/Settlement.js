import React from "react";
import { useState, useRef, useCallback, useEffect } from "react";

import { NavLink } from "react-router-dom";
import styled, { ThemeConsumer } from "styled-components";
import Dialog from "@mui/material/Dialog";
import { DialogTitle } from "@mui/material";
import SettlementAdapter from "./SettlementAdapter";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Categories from "./Categories/Categories";

const Container = styled.div`
  width: 1900px;
  height: 1080px;
  .Left-Sidebar {
    width: 250px;
    height: 1080px;
    background-color: #e9e9e9;
    float: left;
    display: flex;
    flex-direction: column;
    align-items: center;
    .link {
    }
  }
`;

const Content = styled.div`
  padding: 10px;
  width: 1630px;
  height: 1080px;
  background-color: #f7f7f7;
  float: left;
`;

const Settlement = ({ accounts, contract, name, workers }) => {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState();
  const [workername, setWorkername] = useState();
  const [customworkers, setCustomworkers] = useState();
  const [contractaddress, setContractAddress] = useState();

  const [ready, setReady] = useState(false);
  const [contractready, setContractready] = useState(false);

  useEffect(() => {
    makeCustomWorker();
  }, []);

  const handleClickOpen = (name, address) => {
    setOpen(true);
    setWorkername(name);
    setContractAddress(address);
  };

  const handleClose = () => {
    setContractAddress(null);
    setOpen(false);
    setContractready(false);
  };

  // test용 데이터
  // title : 표시되는 이름
  // color : RGB 색상
  // display(고정) : 둥근 아이콘
  const testEvent = [
    {
      title: "홍길동 결근",
      start: "2022-01-06",
      color: "#FF0000",
      display: "list-item",
    },
    {
      title: "홍길순 출근",
      start: "2022-01-06",
      color: "#00FF00",
      display: "list-item",
    },
  ];

  const makeCustomWorker = async () => {
    let temp = [];

    for (let x = 0; x < workers[0].length; x++) {
      temp.push([workers[0][x], decodeURI(workers[1][x])]);
    }
    setCustomworkers(temp);
    setReady(true);
  };

  return (
    <Container>
      <Categories name={name} />
      {contractready != null && (
        <Dialog fullWidth={true} onClose={handleClose} open={open}>
          <DialogTitle> {workername}님 </DialogTitle>
          <FullCalendar
            contentHeight={425}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={testEvent}
          />
          <h2> 결근 </h2> <h2> 출퇴근 </h2> <h2> 총 </h2>
        </Dialog>
      )}
      <Content>
        <h1> 급여 정산 </h1>
        {!ready && <p>잠시만 기다려 주세요...</p>}
        {ready && (
          <>
            <SettlementAdapter
              workers={customworkers}
              handleClickOpen={handleClickOpen}
            />
          </>
        )}
      </Content>
    </Container>
  );
};

export default Settlement;

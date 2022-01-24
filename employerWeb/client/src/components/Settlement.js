import React from "react";
import { useState, useRef, useCallback } from "react";
import "../resources/css/Main.scss";
import { NavLink } from "react-router-dom";
import styled, { ThemeConsumer } from "styled-components";
import Dialog from "@mui/material/Dialog";
import { DialogTitle } from "@mui/material";
import SettlementAdapter from "./SettlementAdapter";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Categories from "./Categories";

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

const Settlement = ({ workers, contracts, attendances }) => {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState();
  const [selectedNumber, setSelectedNumber] = useState();

  const handleClickOpen = (selectedNumber) => {
    setOpen(true);
    setSelectedNumber(selectedNumber);
  };

  const handleClose = () => {
    setSelectedNumber(null);
    setOpen(false);
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

  return (
    <Container>
      <Categories />
      {selectedNumber != null && (
        <Dialog fullWidth={true} onClose={handleClose} open={open}>
          <DialogTitle> {workers[selectedNumber].name}님 </DialogTitle>
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
        <SettlementAdapter
          workers={workers}
          contracts={contracts}
          attendances={attendances}
          handleClickOpen={handleClickOpen}
        />
      </Content>
    </Container>
  );
};

export default Settlement;

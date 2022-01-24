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

const LeftSidebar = styled.div`
  width: 250px;
  height: 1080px;
  background-color: #e9e9e9;
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SideButton = styled(NavLink)`
  display: flex;
  justify-content: center;
  width: 200px;
  height: 50px;
  margin-bottom: 20px;
  font-size: 15px;
  color: inherit;
  text-decoration: none;
  border: 1px solid black;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: white;
  cursor: pointer;
  &:hover {
    color: #495057;
  }
  & + & {
    margin-top: 1rem;
  }
`;

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

const Settlement = () => {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState();

  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: "이서윤",
      phone: "010-1234-5678",
      state: "근로중",
      current: 100000,
      estimate: 200000,
      contract: {
        name: "이서윤",
        from: "2021.08.21",
        to: "2022.12.31",
        date: "매달 10일",
      },
      detail: {
        test: 10,
      },
    },
    {
      id: 2,
      name: "김동현",
      phone: "010-1234-5678",
      state: "근로중",
      current: 200000,
      estimate: 300000,
      contract: {
        name: "김동현",
        from: "2021.08.21",
        to: "2022.12.31",
        date: "매달 10일",
      },
      detail: {
        test: 10,
      },
    },
    {
      id: 3,
      name: "박태민",
      phone: "010-1234-5678",
      state: "근로중",
      current: 500000,
      estimate: 600000,
      contract: {
        name: "박태민",
        from: "2021.08.21",
        to: "2022.12.31",
        date: "매달 10일",
      },
      detail: {
        test: 10,
      },
    },
    {
      id: 4,
      name: "표민성",
      phone: "010-1234-5678",
      state: "근로중",
      current: 700000,
      estimate: 800000,
      contract: {
        name: "표민성",
        from: "2021.08.21",
        to: "2022.12.31",
        date: "매달 10일",
      },
      detail: {
        test: 10,
      },
    },
  ]);

  const handleClickOpen = (detail) => {
    setOpen(true);
    setDetail(detail);
  };

  const handleClose = () => {
    setDetail(null);
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
      {detail && (
        <Dialog
          fullWidth={true}
          onClose={handleClose}
          open={open}
          detail={detail}
        >
          <DialogTitle>{detail.name}님</DialogTitle>
          <FullCalendar
            contentHeight={425}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={testEvent}
          />
          <h2>결근</h2>
          <h2>출퇴근</h2>
          <h2>총 </h2>
        </Dialog>
      )}
      <Content>
        <h1> 급여 정산 </h1>
        <SettlementAdapter
          workers={workers}
          handleClickOpen={handleClickOpen}
        />
      </Content>
    </Container>
  );
};

export default Settlement;

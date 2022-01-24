import React from "react";
import "../resources/css/Main.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import styled from "styled-components";
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

const Main = ({ workers, contracts, attendances }) => {
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
      <Content>
        <h1> 출석부 </h1>
        <FullCalendar
          contentHeight={600}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={testEvent}
        />
        <h1> 보유금액 </h1> <h1> 근태현황 </h1>
      </Content>
    </Container>
  );
};

export default Main;

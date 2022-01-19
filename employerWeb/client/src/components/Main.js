import React from "react";
import "../resources/css/Main.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

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

const Main = () => {
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
      <LeftSidebar>
        <h1> ** 사장님 </h1>
        <SideButton to="/EnrollWorker"> 근로자 등록 </SideButton>
        <SideButton to="/WorkerList"> 근로자 목록 </SideButton>
        <SideButton to="/Settlement"> 급여 정산 </SideButton>
        <SideButton to="/Payroll"> 급여 지급 </SideButton>
        <SideButton to="/Another"> 매장 </SideButton>
      </LeftSidebar>
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

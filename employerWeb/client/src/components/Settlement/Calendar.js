import React from "react";
import CalendarLegend from "./CalendarLegend";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";

const CalendarDiv = styled.div`
  width: 762px;
  height: 730px;
  box-shadow: 5px 5px 5px 5px gray;
  border-radius: 20px;
  padding: 20px;
  background-color: #f7f7f7;
`;

const Calendar = ({attendance}) => {
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
    <CalendarDiv>
      <h1>출/퇴근 기록부</h1>
      <CalendarLegend />

      <FullCalendar
        contentHeight={560}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={attendance}
      />
    </CalendarDiv>
  );
};

export default Calendar;

import React from "react";
import CalendarLegend from "./CalendarLegend";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";

const CalendarDiv = styled.div`
  width: 762px;
  height: 730px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  border-radius: 20px;
  padding: 20px;
  background-color: #f7f7f7;
`;

const Calendar = ({ attendance }) => {
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

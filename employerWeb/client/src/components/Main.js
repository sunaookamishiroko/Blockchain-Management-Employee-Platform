import React from "react";
import "../resources/css/Main.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Main = () => {
  return (
    <div class="Container">
      <div class="Left-Sidebar">
        <h1>** 사장님</h1>
        <button>근로자 등록</button>
        <button>근로자 목록</button>
        <button>급여 정산</button>
        <button>급여 지급</button>
        <button>매장</button>
      </div>
      <div class="Contents">
        <h1>출석부</h1>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={[
            {
              title: "홍길동 결근",
              start: "2022-01-06T13:00:00",
              //constraint: 'businessHours',
              color: "#FF0000",
            },
            {
              title: "홍길순 출근",
              start: "2022-01-06T11:00:00",
              //constraint: 'availableForMeeting', // defined below
              color: "#00FF00",
            },
          ]}
        />
        <h1>보유금액</h1>
        <h1>근태현황</h1>
      </div>
    </div>
  );
};

export default Main;

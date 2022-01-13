import React from "react";
import "../resources/css/Main.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div class="Container">
      <div class="Left-Sidebar">
        <h1>** 사장님</h1>
        <Link to="/AddWorker" className="link">
          근로자 등록
        </Link>
        <Link to="/WorkerList">근로자 목록</Link>
        <Link to="/AddWorker">급여 정산</Link>
        <Link to="/AddWorker">급여 지급</Link>
        <Link to="/AddWorker">매장</Link>
      </div>
      <div class="Contents">
        <h1>출석부</h1>
        <FullCalendar
          contentHeight={600}
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

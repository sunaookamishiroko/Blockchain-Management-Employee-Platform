import React from "react";

import FullCalendar from "@fullcalendar/react";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import dayGridPlugin from "@fullcalendar/daygrid";
import CalendarLegend from "../Settlement/CalendarLegend";

const Calendar = ({ attendance }) => {
  return (
    <>
      <CalendarLegend />
      <FullCalendar
        contentHeight="auto"
        plugins={[dayGridPlugin, bootstrap5Plugin]}
        initialView="dayGridMonth"
        events={attendance}
      />
    </>
  );
};

export default Calendar;

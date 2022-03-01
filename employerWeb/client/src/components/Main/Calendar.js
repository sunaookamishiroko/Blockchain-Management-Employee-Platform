import React from "react";

import FullCalendar from "@fullcalendar/react";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import dayGridPlugin from "@fullcalendar/daygrid";

const Calendar = ({ attendance }) => {
  return (
    <FullCalendar
      contentHeight={560}
      plugins={[dayGridPlugin, bootstrap5Plugin]}
      initialView="dayGridMonth"
      events={attendance}
    />
  );
};

export default Calendar;

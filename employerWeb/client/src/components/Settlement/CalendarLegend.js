import React from "react";

const CalendarLegend = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginRight: "10px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRadius: "30px",
            background: "#05EF5B",
            width: "10px",
            height: "10px",
            marginRight: "10px",
          }}
        />
        출근
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginRight: "10px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRadius: "30px",
            background: "#1C89E9",
            width: "10px",
            height: "10px",
            marginRight: "10px",
          }}
        ></div>
        퇴근
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginRight: "10px",
        }}
      >
        <div
          style={{
            borderRadius: "30px",
            background: "#E91C1C",
            width: "10px",
            height: "10px",
            marginRight: "10px",
          }}
        ></div>
        결근
      </div>
    </div>
  );
};

export default CalendarLegend;

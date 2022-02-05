import React, { Component, useEffect, useState } from "react";
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

const Main = ({ web3, accounts, contract, name }) => {
  // test용 데이터
  // title : 표시되는 이름
  // color : RGB 색상
  // display(고정) : 둥근 아이콘

  //const [name, setName] = useState();
  const [attendance, setAttendance] = useState();

  const [calready, setCalready] = useState(false);

  useEffect(() =>{
    getAttendance();
  }, []);

  useEffect(() => {
    setCalready(true);
  }, [attendance]);

  const getAttendance = (async () => {
    //const response = await contract.methods.getWorkplaces().call({ from: accounts[0] });

    //console.log(response[0]);

    try {
      const employeeinfo = await contract.methods.getEmployeeInfo(0).call({ from: accounts[0] });

      let event = [];

      for (let x = 0; x < employeeinfo[0].length ; x++) {
        let caldata = await contract.methods.getCalAttendance(0, x).call({ from: accounts[0] });
        console.log(caldata);

        if (caldata[0].length == caldata[1].length) {

          for (let y = 0 ; y < caldata[0].length; y++) {
            event.push({
              title: decodeURI(employeeinfo[1][x]),
              start: caldata[0][y],
              color: "#00FF00", 
              display: "list-item",
            })
          }

        } else {
          for (let y = 0 ; y < caldata[0].length - 1; y++) {
            event.push({
              title: employeeinfo[1][x],
              start: caldata[0][y],
              color: "#00FF00", 
              display: "list-item",
            })
          }

          event.push({
            title: employeeinfo[1][x],
            start: caldata[0][caldata[0].length - 1],
            color: "##0037ff", 
            display: "list-item",
          })
        }
      }

      setAttendance(event);

    } catch (e) {
      console.log(e);
    }

  })

  return (
    <Container>
      <Categories name={name} />
      <h1> 출석부 </h1>
      {!calready && (
        <p>잠시만 기다려주세요 ...</p>
      )}
      {calready && (
        <Content>
          <FullCalendar
            contentHeight={600}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={attendance}
          />
          <h1> 보유금액 </h1> <h1> 근태현황 </h1>
        </Content>
      )}
    </Container>
  );
};

export default Main;

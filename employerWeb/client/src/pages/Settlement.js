import React from "react";
import { useState, useRef, useCallback, useEffect } from "react";

import { NavLink, useLocation } from "react-router-dom";
import styled, { ThemeConsumer } from "styled-components";
import Dialog from "@mui/material/Dialog";
import { autocompleteClasses, DialogTitle } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Categories from "../components/Categories/Categories";
import Calendar from "../components/Settlement/Calendar";

const Container = styled.div`
  width: 1800px;
  height: 1080px;
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  margin: 30px;
  padding: 10px;
  width: 1416px;
  height: auto;

  h1 {
    font-size: 26px;
    font-family: "Noto Sans CJK KR";
  }
`;

const LeftMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
`;

const Information = styled.div`
  width: 762px;
  height: 150px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  border-radius: 20px;
  padding: 20px;
  background-color: #f7f7f7;
  margin-bottom: 30px;

  table {
    width: 100%;
    color: #999999;
    font-family: "Noto Sans CJK KR";
    font-weight: bold;
  }
`;

// const Calendar = styled.div`
//   width: 762px;
//   height: 702px;
//    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
//   border-radius: 20px;
//   padding: 20px;
//   background-color: #f7f7f7;
// `;

const History = styled.div`
  width: 606px;
  height: 950px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  border-radius: 20px;
  padding: 20px;
  background-color: #f7f7f7;

  p {
    font-family: "Noto Sans CJK KR";
  }
`;

const Total = styled.div`
  display: flex;
  width: 100%;
  flex-direction: "row";
`;

const Settlement = ({ accounts, contract, name, wpinfo }) => {
  const [open, setOpen] = useState(false);

  const [detail, setDetail] = useState();
  const [attendance, setAttendance] = useState();
  const [workerindex, setWorkerindex] = useState();

  const [indexready, setIndexready] = useState(false);
  const [calready, setCalready] = useState(false);
  const [detailready, setDetailready] = useState(false);

  const location = useLocation();
  const workerinfo = location["state"];

  useEffect(() => {
    getWorkerindex();
  }, []);

  useEffect(() => {
    getAttendance();
    getDetail();
  }, [indexready]);

  const getWorkerindex = async () => {
    let response;
    try {
      response = await contract.methods
        .getIndexOfEmployee(wpinfo[0], workerinfo["address"])
        .call({ from: accounts[0] });
    } catch (e) {
      console.log(e);
    }

    setWorkerindex(response);
    setIndexready(true);
  };

  const getAttendance = async () => {
    let event = [];
    let caldata;
    try {
      caldata = await contract.methods
        .getAllAttendance(wpinfo[0], workerindex)
        .call({ from: accounts[0] });

      if (caldata[0].length == caldata[3].length) {
        for (let y = 0; y < caldata[0].length; y++) {
          event.push({
            title: "출근",
            start: caldata[0][y],
            color: "#00FF00",
            display: "list-item",
          });
        }
      } else {
        for (let y = 0; y < caldata[0].length - 1; y++) {
          event.push({
            title: "출근",
            start: caldata[0][y],
            color: "#00FF00",
            display: "list-item",
          });
        }

        event.push({
          title: "근무중",
          start: caldata[0][caldata[0].length - 1],
          color: "##0037ff",
          display: "list-item",
        });
      }
    } catch (e) {
      console.log(e);
    }
    setAttendance(event);
    setCalready(true);
  };

  const getDetail = async () => {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;

    let selectdate = year + "-" + ("0" + month.toString()).slice(-2);

    let indexarr = await patternMatching(selectdate, workerindex);

    let startIndex = indexarr[0];
    let endIndex = indexarr[1];

    let temp = {};
    if (startIndex != -1) {
      try {
        let hourwage = await contract.methods
          .getWage(0, workerindex)
          .call({ from: accounts[0] });
        temp["hourwage"] = hourwage;
        hourwage = parseInt(hourwage);

        let wage = await contract.methods
          .getPayment(0, workerindex, startIndex, endIndex, hourwage)
          .call({ from: accounts[0] });
        temp["totalwage"] = wage;

        let worktime = await contract.methods
          .getWorkTime(wpinfo[0], workerindex, startIndex, endIndex)
          .call({ from: accounts[0] });

        temp["allhours"] = worktime[0];
        temp["allmin"] = worktime[1];
      } catch (e) {
        console.log(e);
      }
    } else {
      temp["hourwage"] = 0;
      temp["totalwage"] = 0;
      temp["allhours"] = 0;
      temp["allmin"] = 0;
    }
    setDetail(temp);
    setDetailready(true);
  };

  // 패턴 매칭하는 함수 -> 현재 달의 출석을 찾음
  const patternMatching = async (selectdate, index) => {
    let data;

    let stflag = 0,
      edflag = 0;
    let startIndex = -1,
      endIndex = -1;

    try {
      data = await contract.methods
        .getAllAttendance(wpinfo[0], index)
        .call({ from: accounts[0] });
      for (let x = 0; x < data[3].length; x++) {
        if (data[3][x].search(selectdate) != -1) {
          if (stflag == 0) {
            startIndex = x;
            stflag = 1;
          }
        } else {
          if (stflag == 0) continue;
          else {
            endIndex = x - 1;
            edflag = 1;
            break;
          }
        }
      }

      if (startIndex != -1 && edflag == 0) endIndex = data[3].length - 1;
    } catch (e) {
      console.log(e);
    }
    return [startIndex, endIndex];
  };

  return (
    <Container>
      <Categories name={name} wpname={wpinfo[1]} />
      <Content>
        <LeftMenu>
          <Information>
            <h1>근로자 정보</h1>
            <table>
              <tr>
                <td>
                  이름:&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                  {workerinfo["name"]}
                </td>
                <td>
                  Address:&nbsp; &nbsp; &nbsp; &nbsp; {workerinfo["address"]}
                </td>
              </tr>
              <tr>
                <td>근무일정:&nbsp; &nbsp; &nbsp; &nbsp; cc</td>
              </tr>
            </table>
          </Information>
          {!calready && <p>잠시만 기다려주세요...</p>}
          {calready && <Calendar attendance={attendance} />}
        </LeftMenu>
        <History>
          <h1>급여정산 내역</h1>
          {!detailready && <p>계산중입니다...</p>}
          {detailready && (
            <>
              <p>정상출근 몇 번</p>
              <p>결근 몇 번</p>
              <p>
                총 근무 {detail["allhours"]}시간 {detail["allmin"]}분
              </p>
              <p>시급 {detail["hourwage"]}원</p>
              <br />
              <Total>
                <h1 style={{ flex: 1, textAlign: "center" }}>총 금액:</h1>
                <h1 style={{}}>{detail["totalwage"]}원</h1>
              </Total>
            </>
          )}
        </History>
      </Content>
    </Container>
  );
};

export default Settlement;

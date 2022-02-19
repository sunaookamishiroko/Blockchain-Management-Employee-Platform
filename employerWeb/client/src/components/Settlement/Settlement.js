import React from "react";
import { useState, useRef, useCallback, useEffect } from "react";

import { NavLink } from "react-router-dom";
import styled, { ThemeConsumer } from "styled-components";
import Dialog from "@mui/material/Dialog";
import { autocompleteClasses, DialogTitle } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Categories from "../Categories/Categories";
import Calendar from "./Calendar";

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
  box-shadow: 5px 5px 5px 5px gray;
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
//   box-shadow: 5px 5px 5px 5px gray;
//   border-radius: 20px;
//   padding: 20px;
//   background-color: #f7f7f7;
// `;

const History = styled.div`
  width: 606px;
  height: 950px;
  box-shadow: 5px 5px 5px 5px gray;
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

const Settlement = ({ web3, accounts, contract, name, workers }) => {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState();
  const [workername, setWorkername] = useState();
  const [customworkers, setCustomworkers] = useState();
  const [contractaddress, setContractAddress] = useState();

  // TODO false로 바꿔야 함
  const [ready, setReady] = useState(true);

  //   useEffect(() => {
  //     makeCustomWorker();
  //   }, []);

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

  //   const makeCustomWorker = async () => {
  //     let temp = [];

  //     for (let x = 0; x < workers[0].length; x++) {
  //       temp.push([workers[0][x], decodeURI(workers[1][x])]);
  //     }
  //     setCustomworkers(temp);
  //     setReady(true);
  //   };

  // TODO 하드코딩 데이터 지워야 함
  const data = {
    name: "홍길동",
    birthday: "1990.03.16",
    phone: "010-1234-5678",
    schedule: "주3일(화, 수, 목)/일 4시간 근무",
  };
  const total = 0;

  return (
    <Container>
      <Categories name={name} />
      <Content>
        <LeftMenu>
          <Information>
            <h1>근로자 정보</h1>
            <table>
              <tr>
                <td>
                  이름:&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;{" "}
                  {data.name ? data.name : "홍길동"}
                </td>
                <td>
                  생년월일:&nbsp; &nbsp; &nbsp; &nbsp;{" "}
                  {data.birthday ? data.birthday : "1990.03.16"}
                </td>
              </tr>
              <tr>
                <td>
                  연락처:&nbsp; &nbsp; &nbsp; &nbsp;{" "}
                  {data.phone ? data.phone : "010-1234-5678"}
                </td>
                <td>
                  근무일정:&nbsp; &nbsp; &nbsp; &nbsp;
                  {data.schedule
                    ? data.schedule
                    : "주3일(화,수,목)/일 4시간 근무"}
                </td>
              </tr>
            </table>
          </Information>
          <Calendar />
        </LeftMenu>
        <History>
          <h1>급여정산 내역</h1>
          <p>정상출근 몇 번</p>
          <p>결근 몇 번</p>
          <p>총 근무 시간 몇 시간</p>
          <p>시급 얼마</p>
          <br />

          <p>합해서 000000원</p>
          <br />

          <p>세금 몇 퍼 적용</p>
          <p>보험금 몇 퍼 적용</p>
          <p>그 외 빼야할 것들 적용</p>
          <br />

          <p>
            근로계약서에 적힌 계약사항(인센티브, 보너스, 성과금 등) 얼마 적용
          </p>
          <br />

          <p>총 계산하면 이정도 000000</p>
          <br />

          <Total>
            <h1 style={{ flex: 1, textAlign: "center" }}>금액:</h1>
            <h1 style={{}}>{total ? total : "000,000 원"}</h1>
          </Total>
        </History>
      </Content>
    </Container>
  );
};

export default Settlement;

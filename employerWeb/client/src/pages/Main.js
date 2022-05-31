import React, { useEffect, useState } from "react";

import styled from "styled-components";
import Categories from "../components/Categories/Categories";
import RightSideComponent from "../components/Main/RightSideComponent";
import Calendar from "../components/Main/Calendar";

const Container = styled.div`
  background: #f5f8fb;
  width: 100%;
  height: auto;
  display: flex;
`;

const Content = styled.div`
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  border-radius: 20px;
  padding: 10px;
  margin: 30px;
  width: 60%;
  height: 100%;
  background-color: #f7f7f7;
  float: left;

  h1 {
    font-family: "Noto Sans CJK KR";
    font-size: 28px;
  }
`;

const Main = ({ accounts, contract, name, workers, wpinfo }) => {
  // test용 데이터
  // title : 표시되는 이름
  // color : RGB 색상
  // display(고정) : 둥근 아이콘

  //const [name, setName] = useState();
  const [attendance, setAttendance] = useState();

  const [calready, setCalready] = useState(false);

  // 출근 event 잡는 함수
  contract.events
    .Onwork()
    .on("data", (event) => {
      let values = event.returnValues;
      console.log(values.name, values.timeHour, values.timeMinute);
    })
    .on("error", console.error);

  // 퇴근 event 잡는 함수
  contract.events
    .Offwork()
    .on("data", (event) => {
      let values = event.returnValues;
      console.log(values.name, values.timeHour, values.timeMinute);
    })
    .on("error", console.error);

  useEffect(() => {
    getPastevent();
    getAttendance();
  }, []);

  useEffect(() => {
    setCalready(true);
  }, [attendance]);

  const getAttendance = async () => {
    let event = [];

    for (let x = 0; x < workers[0].length; x++) {
      try {
        let caldata = await contract.methods
          .getCalAttendance(wpinfo[0], x)
          .call({ from: accounts[0] });
        console.log(caldata);

        if (caldata[0].length == caldata[1].length) {
          for (let y = 0; y < caldata[0].length; y++) {
            event.push({
              title: decodeURI(workers[1][x]),
              start: caldata[0][y],
              color: "#00FF00",
              display: "list-item",
            });
          }
        } else {
          for (let y = 0; y < caldata[0].length - 1; y++) {
            event.push({
              title: decodeURI(workers[1][x]),
              start: caldata[0][y],
              color: "#00FF00",
              display: "list-item",
            });
          }

          event.push({
            title: decodeURI(workers[1][x]),
            start: caldata[0][caldata[0].length - 1],
            color: "##0037ff",
            display: "list-item",
          });
        }
      } catch (e) {
        console.log(e);
      }
    }

    setAttendance(event);
  };

  const getPastevent = async () => {
    // 이벤트 히스토리
    contract
      .getPastEvents("Onwork", { fromBlock: 0, toBlock: "latest" })
      .then((events) => {
        console.log(events);
      });

    contract
      .getPastEvents("Offwork", { fromBlock: 0, toBlock: "latest" })
      .then((events) => {
        console.log(events);
      });
  };

  return (
    <Container>
      <Categories name={name} wpname={wpinfo[1]} />
      <Content>
        <h1> 출/퇴근 기록부 </h1>
        {!calready && <p>잠시만 기다려주세요 ...</p>}
        {calready && <Calendar attendance={attendance} />}
      </Content>
      {/* TODO QR 데이터, 근태 데이터 전달해줄 것 */}
      <RightSideComponent wpinfo={wpinfo} />
    </Container>
  );
};

export default Main;

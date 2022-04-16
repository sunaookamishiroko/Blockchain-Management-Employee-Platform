import { Dialog } from "@mui/material";
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Categories from "../components/Categories/Categories";
import SubmitDialog from "../components/Enroll/Dialog/SubmitDialog";
import EnrollContent from "../components/Enroll/EnrollContent";
//import { firestore } from "./firebase.js";
//import { collection, addDoc } from "firebase/firestore";

import axios from "axios";

const Container = styled.div`
  background: #f5f8fb;
  width: 100%;
  height: auto;
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  margin: 30px;
  padding: 10px;

  width: 100%;
  height: auto;

  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  border-radius: 20px;

  background-color: #f7f7f7;

  h1 {
    font-size: 26px;
    font-family: "Noto Sans CJK KR";
  }

  form > div {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }
`;

const LeftInput = styled.div`
  width: 480px;
`;

const RightInput = styled.div`
  width: 768px;
`;

const SubmitDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 260px;
    border-radius: 30px;
    font-family: "Noto Sans CJK KR";
    border: 0px;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    background-color: #1c89e9;
    color: white;
    margin-right: 20px;
  }

  input {
    width: 260px;
    border-radius: 30px;
    font-family: "Noto Sans CJK KR";
    border: 0px;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    background-color: #f1f1f1;
    color: #999999;
    margin-right: 20px;
  }
`;

const EnrollLabel = styled.label`
  display: flex;
  flex-direction: column;

  h2 {
    font-family: "Noto Sans CJK KR";
    font-weight: bold;
    font-style: "normal";
    font-size: 22px;
  }
  input {
    width: auto;
    height: auto;
    padding: 10px;
    font-size: 16px;
    border: 0px;
    background-color: #f1f1f1;
    color: #999999;
    font-family: "Noto Sans CJK KR";
    font-weight: bold;
    border-radius: 40px;
  }
`;

const EnrollWorker = ({ name, onEnroll, wpinfo }) => {
  const [worker, setWorker] = useState({
    employeename: "",
    address: "",
    period1: "",
    period2: "",
    duties: "",
    workingTime: "",
    workingDays: "",
    wage: "",
    wageday: "",
    comment: "",
  });

  // 계약서 작성 요청 보내기 클릭 시 다이얼로그 띄우기
  const [submitOpen, setSubmitOpen] = useState(false);
  // 다이얼로그 없애기
  const handleClose = () => {
    setSubmitOpen(false);
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setWorker({ ...worker, [name]: value });
  };

  const onSubmit = async (e) => {
    console.log(worker);
    console.log(wpinfo);  

    // period1, period2 onchange 안먹힘 -> 해결해야함
    let body = {
      "address" : worker.address,
      "wpname" : wpinfo[1],
      "wpemployer" : name,
      "employeename" : worker.employeename,
      "workplaceindex" : wpinfo[0],
      "period" : "2022-04-01~2022-04-31",
      "duties" : worker.duties,
      "workingtime" : worker.workingTime,
      "workingdays" : worker.workingDays,
      "wage" : worker.wage,
      "wageday" : worker.wageday,
      "comment" : worker.comment
    };

    try {
      const response = await axios.post(`setcontract`, body);

      if (response.status !== 200) alert("db 에러 발생");
      else {
        alert("근로계약서를 정상적으로 요청했습니다!");
      }
    } catch(e) {
      console.log(e);
    }
    
    // 사업장 index를 포함하여 등록할 것
    //onEnroll(worker);
    e.preventDefault();
  };

  const onChangeHandler = (e) => {
    console.log(e.target);
  };

  // TODO 주석 해제해야함
  const onClickHandler = (e) => {
    e.preventDefault();
    try {
      setWorker({
        address: "",
        period1: "",
        period2: "",
        duties: "",
        workingTime: "",
        workingDays: "",
        wage: "",
        wageday: "",
        comment: "",
      });

      console.log(e.target);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Container>
      <Categories name={name} wpname={wpinfo[1]} />

      {/* 계약서 작성 요청 보내기 클릭 시 다이얼로그 */}
      <Dialog maxWidth={1280} onClose={handleClose} open={submitOpen}>
        <SubmitDialog onClickClose={handleClose} onClickSubmit={onSubmit} />
      </Dialog>

      <EnrollContent
        onSubmit={setSubmitOpen}
        onChange={onChange}
        onClickHandler={onClickHandler}
      />
    </Container>
  );
};
export default EnrollWorker;

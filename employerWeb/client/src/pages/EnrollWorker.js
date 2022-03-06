import { FormLabel } from "@mui/material";
import React, { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Categories from "../components/Categories/Categories";
//import { firestore } from "./firebase.js";
//import { collection, addDoc } from "firebase/firestore";

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

  box-shadow: 5px 5px 5px 5px gray;
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
    address: "",
    age: 0,
    gender: "남",
    period1: "",
    period2: "",
    duties: "",
    workingTime: "",
    workingDays: "",
    wage: "",
    wageday: "",
    comment: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setWorker({ ...worker, [name]: value });
  };

  const onSubmit = (e) => {
    //TODO 입력값 검증 필요
    console.log(worker);

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
      // firestore.collection("workersData").add({
      //   address: this.state.worker.address,
      //   age: this.state.worker.age,
      //   gender: this.state.worker.gender,
      //   period1: this.state.worker.period1,
      //   period2: this.state.worker.period2,
      //   duties: this.state.worker.duties,
      //   workingTime: this.state.worker.workingTime,
      //   workingDays: this.state.worker.workingDays,
      //   wage: this.state.worker.wage,
      //   wageday: this.state.worker.wageday,
      //   comment: this.state.worker.comment,
      // });
      setWorker({
        address: "",
        age: 0,
        gender: "남",
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
      <Content>
        <h1> 근로자 등록 </h1>
        <form className="Enroll" onSubmit={onSubmit}>
          <div>
            <LeftInput>
              <EnrollLabel>
                <h2> 이름 </h2>
                <input
                  placeholder="근로자 이름을 입력해주세요."
                  name="name"
                  onChange={onChange}
                />
              </EnrollLabel>
              <EnrollLabel>
                <h2>주소</h2>
                <input
                  placeholder="근로자 주소를 입력하세요"
                  name="address"
                  onChange={onChange}
                />
              </EnrollLabel>

              <EnrollLabel>
                <h2> 근로자 나이 </h2>
                <input
                  placeholder="근로자 나이 입력하세요"
                  name="age"
                  onChange={onChange}
                />
              </EnrollLabel>
              <EnrollLabel>
                <h2> 근로자 성별 </h2>
                <FormLabel>
                  남
                  <input
                    type="radio"
                    name="gender"
                    value="남"
                    onChange={onChange}
                    checked
                  />
                </FormLabel>
                <FormLabel>
                  여
                  <input
                    type="radio"
                    name="gender"
                    value="여"
                    onChange={onChange}
                  />
                </FormLabel>
              </EnrollLabel>
            </LeftInput>

            <RightInput>
              <EnrollLabel>
                <h2>계약기간</h2>
                <div style={{ display: "flex", width: "auto" }}>
                  <input type="date" name="period1" />
                  <p
                    style={{
                      color: "#999999",
                      fontFamily: "Noto Sans CJK KR",
                      fontWeight: "bold",
                    }}
                  >
                    부터
                  </p>
                  <input type="date" name="period2" />
                </div>
              </EnrollLabel>

              <EnrollLabel>
                <h2> 업무 내용 </h2>
                <input
                  placeholder="업무 내용을 입력하세요"
                  name="duties"
                  onChange={onChange}
                />
              </EnrollLabel>

              <EnrollLabel>
                <h2> 소정 근로 시간 </h2>
                <input
                  placeholder="소정 근로 시간을 입력하세요"
                  name="workingTime"
                  onChange={onChange}
                />
              </EnrollLabel>
              <EnrollLabel>
                <h2> 근무일 </h2>
                <input
                  placeholder="근무일을 입력하세요"
                  name="workingDays"
                  onChange={onChange}
                />
              </EnrollLabel>
              <EnrollLabel>
                <h2> 임금(시급) </h2>
                <input
                  placeholder="임금(시급)을 입력하세요"
                  name="wage"
                  onChange={onChange}
                />
              </EnrollLabel>
              <EnrollLabel>
                <h2> 임금지급일 </h2>
                <input
                  placeholder="임금(시급)지급일을 입력하세요"
                  name="wageday"
                  onChange={onChange}
                />
              </EnrollLabel>
              <EnrollLabel>
                <h2> 기타사항 </h2>
                <input
                  placeholder="기타 사항을 입력하세요"
                  name="comment"
                  onChange={onChange}
                />
              </EnrollLabel>
            </RightInput>
          </div>
          <SubmitDiv>
            <button onClick={onClickHandler}>계약서 작성 요청 보내기</button>
            <input type={"reset"} value="초기화"></input>
          </SubmitDiv>
        </form>
      </Content>
    </Container>
  );
};
export default EnrollWorker;

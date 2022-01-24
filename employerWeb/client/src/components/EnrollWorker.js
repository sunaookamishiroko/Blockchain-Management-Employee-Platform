import { FormLabel } from "@mui/material";
import React, { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Categories from "./Categories";

const LeftSidebar = styled.div`
  width: 250px;
  height: 1080px;
  background-color: #e9e9e9;
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SideButton = styled(NavLink)`
  display: flex;
  justify-content: center;
  width: 200px;
  height: 50px;
  margin-bottom: 20px;
  font-size: 15px;
  color: inherit;
  text-decoration: none;
  border: 1px solid black;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: white;
  cursor: pointer;
  &:hover {
    color: #495057;
  }
  & + & {
    margin-top: 1rem;
  }
`;

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

const SubmitDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: auto;
  height: auto;
  padding: 10px;
  font-size: 20px;
  border: 1px solid #999999;
  border-radius: 40px;
`;

const EnrollWorker = ({ onEnroll }) => {
  const [worker, setWorker] = useState({
    address: "",
    age: 0,
    gender: "남",
    period: "",
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

  return (
    <Container>
      <Categories />
      <Content>
        <form className="Enroll" onSubmit={onSubmit}>
          <h1> 근로자 등록 </h1>
          <h2> 근로자 Address </h2>
          <Input
            placeholder="근로자 주소를 입력하세요"
            name="address"
            onChange={onChange}
          />
          <h2> 근로자 이름 </h2>
          <Input
            placeholder="근로자 이름을 입력하세요"
            name="name"
            onChange={onChange}
          />
          <h2> 근로자 나이 </h2>
          <Input
            placeholder="근로자 나이 입력하세요"
            name="age"
            onChange={onChange}
          />
          <h2> 근로자 성별 </h2>
          <FormLabel>
            남
            <Input
              type="radio"
              name="gender"
              value="남"
              onChange={onChange}
              checked
            />
          </FormLabel>
          <FormLabel>
            여
            <Input type="radio" name="gender" value="여" onChange={onChange} />
          </FormLabel>
          <h2> 근로 계약 기간 </h2> <Input type="date" name="period" />
          <h2> 업무 내용 </h2>
          <Input
            placeholder="업무 내용을 입력하세요"
            name="duties"
            onChange={onChange}
          />
          <h2> 소정 근로 시간 </h2>
          <Input
            placeholder="소정 근로 시간을 입력하세요"
            name="workingTime"
            onChange={onChange}
          />
          <h2> 근무일 </h2>
          <Input
            placeholder="근무일을 입력하세요"
            name="workingDays"
            onChange={onChange}
          />
          <h2> 임금(시급) </h2>
          <Input
            placeholder="임금(시급)을 입력하세요"
            name="wage"
            onChange={onChange}
          />
          <h2> 임금지급일 </h2>
          <Input
            placeholder="임금(시급)지급일을 입력하세요"
            name="wageday"
            onChange={onChange}
          />
          <h2> 기타사항 </h2>
          <Input
            placeholder="기타 사항을 입력하세요"
            name="comment"
            onChange={onChange}
          />
          <SubmitDiv>
            <button type="submit"> 요청 보내기 </button>
          </SubmitDiv>
        </form>
      </Content>
    </Container>
  );
};

export default EnrollWorker;

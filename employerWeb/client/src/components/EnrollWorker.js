import React, { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

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
  const [value, setValue] = useState("");

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onEnroll(value);
      setValue("");
      e.preventDefault();
    },
    [onEnroll, value]
  );

  return (
    <Container>
      <LeftSidebar>
        <h1>** 사장님</h1>
        <SideButton to="/">뒤로가기</SideButton>
      </LeftSidebar>
      <Content>
        <form className="Enroll" onSubmit={onSubmit}>
          <h1>근로자 등록</h1>
          <h2>근로자 Address</h2>
          <Input
            placeholder="근로자 주소를 입력하세요"
            value={value}
            onChange={onChange}
          />
          <h2>근로 계약 기간</h2>
          <Input type="date" />
          <SubmitDiv>
            <button type="submit">요청 보내기</button>
          </SubmitDiv>
        </form>
      </Content>
    </Container>
  );
};

export default EnrollWorker;

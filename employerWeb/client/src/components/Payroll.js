import React from "react";
import { useState, useRef, useCallback } from "react";
import "../resources/css/Main.scss";
import { NavLink } from "react-router-dom";
import styled, { ThemeConsumer } from "styled-components";
import WorkerListAdapter from "./WorkerListAdapter";
import Dialog from "@mui/material/Dialog";
import { DialogTitle } from "@mui/material";
import PayrollAdapter from "./PayrollAdapter";

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

const Payroll = () => {
  const [open, setOpen] = useState(false);
  const [contract, setContract] = useState();

  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: "이서윤",
      phone: "010-1234-5678",
      state: "근로중",
      pay: 10000,
      contract: {
        name: "이서윤",
        from: "2021.08.21",
        to: "2022.12.31",
        date: "매달 10일",
      },
    },
    {
      id: 2,
      name: "김동현",
      phone: "010-1234-5678",
      state: "근로중",
      pay: 10000,
      contract: {
        name: "김동현",
        from: "2021.08.21",
        to: "2022.12.31",
        date: "매달 10일",
      },
    },
    {
      id: 3,
      name: "박태민",
      phone: "010-1234-5678",
      state: "근로중",
      pay: 10000,
      contract: {
        name: "박태민",
        from: "2021.08.21",
        to: "2022.12.31",
        date: "매달 10일",
      },
    },
    {
      id: 4,
      name: "표민성",
      phone: "010-1234-5678",
      state: "근로중",
      pay: 10000,
      contract: {
        name: "표민성",
        from: "2021.08.21",
        to: "2022.12.31",
        date: "매달 10일",
      },
    },
  ]);

  const onSubmit = () => {
    alert("submit 클릭");
  };

  return (
    <Container>
      <LeftSidebar>
        <h1> ** 사장님 </h1> <SideButton to="/"> 뒤로가기 </SideButton>
      </LeftSidebar>
      <Content>
        <h1> 급여 지급 </h1>
        <PayrollAdapter workers={workers} onSubmit={onSubmit} />
      </Content>
    </Container>
  );
};

export default Payroll;

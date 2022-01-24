import React from "react";
import { useState, useRef, useCallback } from "react";
import "../resources/css/Main.scss";
import { NavLink } from "react-router-dom";
import styled, { ThemeConsumer } from "styled-components";
import WorkerListAdapter from "./WorkerListAdapter";
import Dialog from "@mui/material/Dialog";
import { DialogTitle } from "@mui/material";
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

const WorkerList = () => {
  const [open, setOpen] = useState(false);
  const [contract, setContract] = useState();

  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: "이서윤",
      phone: "010-1234-5678",
      state: "근로중",
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
      contract: {
        name: "표민성",
        from: "2021.08.21",
        to: "2022.12.31",
        date: "매달 10일",
      },
    },
  ]);

  const handleClickOpen = (contract) => {
    setOpen(true);
    setContract(contract);
  };

  const handleClose = () => {
    setContract(null);
    setOpen(false);
  };

  return (
    <Container>
      <Categories />
      {contract && (
        <Dialog
          fullWidth={true}
          onClose={handleClose}
          open={open}
          contract={contract}
        >
          <DialogTitle>{contract.name}님</DialogTitle>
          <h2>근로 계약 기간</h2>
          <p>{contract.from}</p>
          <p>{contract.to}</p>
          <h2>임금 지급일</h2>
          <p>{contract.date}</p>
        </Dialog>
      )}
      <Content>
        <h1> 근로자 목록 </h1>
        <WorkerListAdapter
          workers={workers}
          handleClickOpen={handleClickOpen}
        />
      </Content>
    </Container>
  );
};

export default WorkerList;

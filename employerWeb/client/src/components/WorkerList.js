import React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
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

const WorkerList = ({ web3, accounts, contract }) => {

  const [open, setOpen] = useState(false);
  const [contractAddress, setContractAddress] = useState();
  const [workers, setWorkers] = useState();

  const [ready, setReady] = useState(false);

  useEffect(() =>{
    getWorkerList();
  }, []);


  const handleClickOpen = (address) => {
    setOpen(true);
    setContractAddress(address);
  };

  const handleClose = () => {
    setContractAddress(null);
    setOpen(false);
  };

  const getWorkerList = (async() => {
    const response = await contract.methods.getEmployeeInfo(0).call({ from: accounts[0] });
    console.log(response);

    let temp = [];
    
    for (let x = 0 ; x < response[0].length ; x++) {
      temp.push([
        response[0][x], decodeURI(response[1][x])
      ])
    }
    setWorkers(temp);
    setReady(true);
  })

  return (
    <Container>
      {contractAddress != null && (
        <Dialog fullWidth={true} onClose={handleClose} open={open}>
          <DialogTitle> {contractAddress} 님 </DialogTitle>
          <h2> 근로 계약 기간 </h2> <p>  </p>
          <h2> 업무 내용 </h2>
          <p>  </p>
          <h2> 소정 근로 시간 </h2>
          <p> </p>
          <h2> 근무일 </h2>
          <p> </p>
          <h2> 임금(시급) </h2>
          <p>  </p>
          <h2> 임금지급일 </h2>
          <p>  </p>
          <h2> 기타사항 </h2>
          <p>  </p>
        </Dialog>
      )}
      <Categories />
        <Content>
          <h1> 근로자 목록 </h1>
          {!ready && (
            <p>잠시만 기다려 주세요...</p>
          )}
          {ready && (
            <>
              <WorkerListAdapter
              workers={workers}
              handleClickOpen={handleClickOpen}
            />
            </>
          )}
        </Content>
    </Container>
  );
};

export default WorkerList;

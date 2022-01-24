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

const WorkerList = ({ workers, contracts, attendances }) => {
  const [open, setOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const handleClickOpen = (identiNumber) => {
    setOpen(true);
    setSelectedNumber(identiNumber);
  };

  const handleClose = () => {
    setSelectedNumber(null);
    setOpen(false);
  };

  return (
    <Container>
      {selectedNumber != null && (
        <Dialog fullWidth={true} onClose={handleClose} open={open}>
          <DialogTitle> {workers[selectedNumber].name}님 </DialogTitle>
          {/* uint workplaceIndex;      // 사업장 index
    string peroid;            // 근로계약기간 
    string duties;            // 업무내용
    string workingTime;       // 소정근로시간
    string workingDays;       // 근무일
    string wage;              // 임금(시급)
    string wageday;           // 임금지급일
    string comment;           // 기타사항 */}
          <h2> 근로 계약 기간 </h2> <p> {contracts[selectedNumber].period} </p>
          <h2> 업무 내용 </h2>
          <p> {contracts[selectedNumber].duties} </p>
          <h2> 소정 근로 시간 </h2>
          <p> {contracts[selectedNumber].workingTime} </p>
          <h2> 근무일 </h2>
          <p> {contracts[selectedNumber].workingDays} </p>
          <h2> 임금(시급) </h2>
          <p> {contracts[selectedNumber].wage} </p>
          <h2> 임금지급일 </h2>
          <p> {contracts[selectedNumber].wageday} </p>
          <h2> 기타사항 </h2>
          <p> {contracts[selectedNumber].comment} </p>
        </Dialog>
      )}
      <Categories />
      <Content>
        <h1> 근로자 목록 </h1>
        <WorkerListAdapter
          workers={workers}
          contracts={contracts}
          attendances={attendances}
          handleClickOpen={handleClickOpen}
        />
      </Content>
    </Container>
  );
};

export default WorkerList;

import React from "react";
import { useState, useEffect, useCallback } from "react";

import { NavLink } from "react-router-dom";
import styled, { ThemeConsumer } from "styled-components";
import WorkerListAdapter from "../WorkerList/WorkerListAdapter";
import Dialog from "@mui/material/Dialog";
import { DialogTitle } from "@mui/material";
import PayrollAdapter from "./PayrollAdapter";
import Categories from "../Categories/Categories";

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

const Payroll = ({ accounts, contract, tokencontract, name, workers }) => {
  const [open, setOpen] = useState(false);

  const [customworkers, setCustomworkers] = useState();
  const [ready, setReady] = useState(false);

  const payWage = () => {
    alert("submit 클릭");
  };

  useEffect(() => {
    makeCustomWorker();
  }, []);

  const patternMatching = (async(selectdate, index) => {
    let data = await contract.methods.getAllAttendance(0, index).call({ from: accounts[0] });

    let stflag = 0, edflag = 0;
    let startIndex = -1, endIndex = -1;
    
    for (let x = 0 ; x < data[3].length ; x++) {
      if (data[3][x].search(selectdate) != -1) {
        if (stflag == 0) {
          startIndex = x;
          stflag = 1;
        }
      } else {
        if (stflag == 0) continue;
        else {
          endIndex = x - 1;
          edflag = 1;
          break;
        }
      }
    }

    if (startIndex != -1 && edflag == 0) endIndex = data[3].length -1;
    return ([startIndex, endIndex]);
  })

  const makeCustomWorker = (async() => {
    let temp = [];

    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1; 

    let selectdate = year+"-"+(("0"+month.toString()).slice(-2));

    for (let x = 0 ; x < workers[0].length ; x++) {
      let indexarr = await patternMatching(selectdate, x);

      let startIndex = indexarr[0];
      let endIndex = indexarr[1];

      if (startIndex != -1) {
        let employeeindex = await contract.methods.getIndexOfEmployee(0, workers[0][x]).call({ from: accounts[0] });
    
        let hourwage = await contract.methods.getWage(0, employeeindex).call({ from: accounts[0] });
        hourwage = parseInt(hourwage);
    
        let wage = await contract.methods.getPayment(
          0, employeeindex, startIndex, endIndex, hourwage
        ).call({ from: accounts[0] });

        temp.push([
          workers[0][x], decodeURI(workers[1][x]), wage
        ])
        
      } else {
          temp.push([
            workers[0][x], decodeURI(workers[1][x]), 0
          ])
      }
    }
    setCustomworkers(temp);
    setReady(true);
  });
  
  return (
    <Container>
      {!ready && <p>잠시만 기다려주세요 ... </p>}
      {ready && (
        <>
          <Categories name={name}/>
          <Content>
            <h1> 급여 지급 </h1>{" "}
            <PayrollAdapter
              workers={customworkers}
              onSubmit={payWage}
            />{" "}
          </Content>{" "}
        </>
      )}
    </Container>
  );
};

export default Payroll;
import React from "react";
import { useState, useRef, useCallback } from "react";

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

const Payroll = ({ workers, contracts, attendances }) => {
  const [open, setOpen] = useState(false);
  const [contract, setContract] = useState();

  const onSubmit = () => {
    alert("submit 클릭");
  };

  return (
    <Container>
      <Categories />
      <Content>
        <h1> 급여 지급 </h1>{" "}
        <PayrollAdapter
          workers={workers}
          contracts={contracts}
          attendances={attendances}
          onSubmit={onSubmit}
        />{" "}
      </Content>{" "}
    </Container>
  );
};

export default Payroll;

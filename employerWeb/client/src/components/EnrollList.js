import { FormLabel } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Categories from "./Categories";
//import { firestore } from "./firebase.js";
//import {  } from "firebase/firestore";

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

const EnrollList = ({ onEnroll }) => {
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

  useEffect(() => {
    /*
    const workerlist = firestore.collection('workersData')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    */
  });

  const onClickHandler=(e) => {
    console.log(e.target);
  }

  const onChangeHandler = (e) => {
    console.log(e.target);
  }

  return (
    <Container>
      <Categories />
      <Content>
        <div className="EnrollList">
          <h1> 근로자 등록 요청 목록 </h1>
        </div>
       </Content>
     </Container>
  );
};

export default EnrollList;
import React, { useState } from "react";
import styled from "styled-components";
import Categories from "../components/Categories/Categories";
import EnrollContent from "../components/Enroll/EnrollContent";

import { ENDPOINT } from "../envSetting";

import axios from "axios";

const Container = styled.div`
  background: #f5f8fb;
  width: 100%;
  height: auto;
  display: flex;
`;

const EnrollWorker = ({ name, wpinfo }) => {
  const [worker, setWorker] = useState({
    employeename: "",
    address: "",
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

  const onSubmit = async (e) => {
    e.preventDefault();
    let body = {
      address: worker.address,
      wpname: wpinfo[1],
      wpemployer: name,
      employeename: worker.employeename,
      workplaceindex: wpinfo[0],
      period: `${worker.period1}~${worker.period2}`,
      duties: worker.duties,
      workingtime: worker.workingTime,
      workingdays: worker.workingDays,
      wage: worker.wage,
      wageday: worker.wageday,
      comment: worker.comment,
    };
    
    try {
      const response = await axios.post(`${ENDPOINT}setcontract`, body);

      if (response.status !== 200) alert("db 에러 발생");
      else {
        alert("근로계약서를 정상적으로 요청했습니다!");
      }
    } catch (e) {
      console.log(e);
    }

  };

  const onClickHandler = (e) => {
    e.preventDefault();
    try {
      setWorker({
        address: "",
        period1: "",
        period2: "",
        duties: "",
        workingTime: "",
        workingDays: "",
        wage: "",
        wageday: "",
        comment: "",
      });

      //console.log(e.target);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Container>
      <Categories name={name} wpname={wpinfo[1]} />

      <EnrollContent
        onSubmit={onSubmit}
        onChange={onChange}
        onClickHandler={onClickHandler}
      />
    </Container>
  );
};
export default EnrollWorker;

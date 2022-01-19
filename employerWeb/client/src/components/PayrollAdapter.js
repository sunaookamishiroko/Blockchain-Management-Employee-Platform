import React, { useState } from "react";
import styled from "styled-components";
import PayrollItem from "./PayrollItem";

const Adapter = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`;

const PayrollAdapter = ({ workers, onSubmit }) => {
  const total = workers.reduce((stack, el) => {
    return stack + el.pay;
  }, 0);
  return (
    <Adapter>
      {workers.map((worker) => (
        <PayrollItem worker={worker} />
      ))}
      <div>총 {total}원</div>
      <button onClick={onSubmit}>지급하기</button>
    </Adapter>
  );
};

export default PayrollAdapter;

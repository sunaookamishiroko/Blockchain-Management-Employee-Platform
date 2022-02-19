import React, { useState } from "react";
import styled from "styled-components";
import PayrollItem from "./PayrollItem";

const Adapter = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`;

const PayrollAdapter = ({ workers, contracts, attendances, onSubmit }) => {
  // 급여 지급 계산기
  const total = workers.reduce((stack, el) => {
    return stack + el.pay;
  }, 0);

  return (
    <Adapter>
      {workers.map((worker, index) => (
        <PayrollItem worker={worker} contract={contracts[index]} />
      ))}
      <div>총 {total}원</div>
      <button onClick={onSubmit}>지급하기</button>
    </Adapter>
  );
};

export default PayrollAdapter;

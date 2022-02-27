import React, { useState } from "react";
import styled from "styled-components";
import PayrollItem from "./PayrollItem";

const Adapter = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`;

const PayrollAdapter = ({ workers, onSubmit }) => {

  return (
    <Adapter>
      {workers.map((x, index) => (
        <>
          <PayrollItem 
            index={index + 1}
            address={workers[index][0]}
            name={workers[index][1]} 
          />
          <div>총 {workers[index][2]}원</div>
          <button onClick={onSubmit}>지급하기</button>
        </>
      ))}
    </Adapter>
  );
};

export default PayrollAdapter;

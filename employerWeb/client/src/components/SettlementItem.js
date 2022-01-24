import React, { useState } from "react";
import styled from "styled-components";

const Item = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  &::nth-child(even) {
    background-color: #f8f9fa;
  }
  & + & {
    border-top: 1px solid #dee2e6;
  }
`;

const SettlementItem = ({ worker, contract, attendance, handleClickOpen }) => {
  const { identiNumber, name } = worker;

  return (
    <Item>
      <div> {identiNumber} </div> <div> {name} </div>
      <button
        onClick={() => {
          handleClickOpen(identiNumber);
        }}
      >
        자세히
      </button>
    </Item>
  );
};

export default SettlementItem;

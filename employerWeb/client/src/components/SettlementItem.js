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

const SettlementItem = ({ worker, handleClickOpen }) => {
  const { id, name, current, estimate, detail } = worker;

  return (
    <Item>
      <div> {id} </div>
      <div> {name} </div>
      <div> {current} </div>
      <div> {estimate} </div>
      <button
        onClick={() => {
          handleClickOpen(detail);
        }}
      >
        자세히
      </button>
    </Item>
  );
};

export default SettlementItem;

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

const WorkerListItem = ({ index, address, name, handleClickOpen }) => {

  return (
    <Item>
      <div> {index} </div>
      <div> {name} </div> <div> {address} </div>
      <button
        onClick={() => {
          handleClickOpen(address);
        }}
      >
        계약서 보기
      </button>
    </Item>
  );
};

export default WorkerListItem;

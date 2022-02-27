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

const PayrollItem = ({ worker, total }) => {
  const { id, name } = worker;
  return (
    <Item>
      <div> {id} </div> <div> {name} </div> <div> {total}</div>
    </Item>
  );
};

export default PayrollItem;

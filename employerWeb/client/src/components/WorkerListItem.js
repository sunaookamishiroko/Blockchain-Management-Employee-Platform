import React from "react";
import styled from "styled-components";
import Dialog from "@materrial-ui/core/Dialog";
import DialogActions from "@materrial-ui/core/DialogActions";
import DialogTitle from "@materrial-ui/core/DialogTitle";

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

const WorkerListItem = ({ worker }) => {
  const { id, name, phone, state, contract } = worker;

  const onClick = () => {
    // <WorkerModal visible={true}>Hello</WorkerModal>;
  };

  return (
    <Item>
      <div> {id} </div> <div> {name} </div> <div> {phone} </div>{" "}
      <div> {state} </div> <button onClick={onClick}> 계약서 보기 </button>{" "}
    </Item>
  );
};

export default WorkerListItem;

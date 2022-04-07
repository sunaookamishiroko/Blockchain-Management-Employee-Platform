import { css } from "@emotion/react";
import React from "react";
import styled from "styled-components";

const StyledTermination = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;

  > h2 {
    text-align: center;
    margin: 100px;
    color: #999999;
  }

  > div {
    display: flex;
    justify-content: center;
  }
`;

const TerminationButton = styled.button`
  margin: 17px;
  height: 48px;
  font-family: "Noto Sans CJK KR";
  font-weight: bold;
  border: 0px;
  color: white;
  background-color: #fc7070;
  font-size: 20px;
  border-radius: 30px;
  padding-left: 30px;
  padding-right: 30px;
  width: 120px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  margin: 17px;
  height: 48px;
  font-family: "Noto Sans CJK KR";
  font-weight: bold;
  border: 0px;
  color: #999999;
  font-size: 20px;
  border-radius: 30px;
  padding-left: 30px;
  padding-right: 30px;
  width: 120px;
  cursor: pointer;
`;

const TerminationDialog = ({ name, onClickClose }) => {
  return (
    <StyledTermination>
      <h2>{name}님과의 근로계약을 해지하시겠습니까?</h2>
      <div>
        <TerminationButton>해지</TerminationButton>
        <CancelButton onClick={onClickClose}>취소</CancelButton>
      </div>
    </StyledTermination>
  );
};

export default TerminationDialog;

import React from "react";
import styled from "styled-components";

const StyledSubmit = styled.div`
  display: flex;
  flex-direction: column;
  width: 1280px;

  > h2 {
    text-align: center;
  }

  > div {
    display: flex;
    justify-content: center;
  }
`;

const SubmitDialog = ({ name, onClickSubmit, onClickClose }) => {
  return (
    <StyledSubmit>
      <h2>{name}님에게</h2>
      <h2>근로계약서 작성을 요청하시겠습니까?</h2>
    </StyledSubmit>
  );
};

export default SubmitDialog;

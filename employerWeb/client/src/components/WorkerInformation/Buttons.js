import React from "react";
import styled, { css } from "styled-components";

const StyledButtons = styled.div`
  width: 100%;
  display: flex;
`;

const Button = styled.button`
  margin: 17px;
  height: 48px;
  font-family: "Noto Sans CJK KR";
  font-weight: bold;
  border: 0px;
  color: white;
  font-size: 20px;
  border-radius: 30px;
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
  cursor: pointer;

  ${(props) =>
    props.blue &&
    css`
      background-color: #1c89e9;

      :hover {
        background-color: #1c89e9cc;
      }
    `}

  ${(props) =>
    props.darkblue &&
    css`
      background-color: #2669a4;
      :hover {
        background-color: #2669a4cc;
      }
    `}
    ${(props) =>
    props.red &&
    css`
      background-color: #fc7070;
      :hover {
        background-color: #fc7070cc;
      }
    `};
`;

const Buttons = ({ onClickReward, onClickContract, onClickTermination }) => {
  return (
    <StyledButtons>
      <Button onClick={onClickReward} blue>
        보상 지급
      </Button>
      <Button onClick={onClickContract} darkblue>
        근로계약서 조회
      </Button>
      <Button onClick={onClickTermination} red>
        근로 계약 해지
      </Button>
    </StyledButtons>
  );
};

export default Buttons;

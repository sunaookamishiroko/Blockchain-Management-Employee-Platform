import React from "react";
import styled, { css } from "styled-components";

const StyledAward = styled.div`
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

const StyledBadge = styled.img`
  width: 162px;
  height: 244px;
  border-radius: 25px;
  border-color: white;
  background: white;
  overflow: hidden;
`;

const Button = styled.button`
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
  width: 240px;
  cursor: pointer;
  ${(props) =>
    props.blue &&
    css`
      background-color: #1c89e9;
      color: white;

      :hover {
        background-color: #1c89e9cc;
      }
    `}
`;

const AwardDialog = ({ badges, onClickClose }) => {
  // TODO 보상 지급 Dialog에서 배지 지급 버튼 클릭 시
  const onClickAwardBadge = () => {
    alert("onClickAwardBadge");
  };

  const categories = ["친절", "지각", "장기근속", "칭찬", "기타", "기타"];
  return (
    <StyledAward>
      <h2>증정할 배지를 선택해주세요</h2>
      <div>
        {badges.map((badge) => (
          <StyledBadge src={badge.image} />
        ))}
      </div>
      <div>
        <Button blue onClick={onClickAwardBadge}>
          배지지급
        </Button>
        <Button onClick={onClickClose}>취소</Button>
      </div>
    </StyledAward>
  );
};

export default AwardDialog;

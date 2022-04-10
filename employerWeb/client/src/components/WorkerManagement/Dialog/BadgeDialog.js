import React from "react";
import styled from "styled-components";

const StyledBadgeDialog = styled.div`
  display: flex;
  width: 960px;

  > div {
    display: flex;
    flex-direction: column;

    > p {
      font-size: 24px;
    }

    > div {
      display: flex;
    }
  }
`;

const StyledBadge = styled.img`
  width: 328px;
  height: 494px;
  border-radius: 25px;
  border-color: white;
  background: white;
  overflow: hidden;
`;

const StyledTag = styled.p`
  display: flex;
  justify-content: center;
  margin-right: 8px;
  width: 164px;
  font-size: 24px;
  align-self: center;
  border-radius: 20px;
  background-color: #1c89e9;
  color: white;
  font-weight: bold;
`;

const BadgeDialog = ({ selectedBadge }) => {
  const image = selectedBadge.image;
  const issueData = selectedBadge.issueData;
  const issuancePoint = selectedBadge.issuancePoint;
  const etc = selectedBadge.etc;
  const statement = selectedBadge.statement;
  const tags = selectedBadge.tags;

  return (
    <StyledBadgeDialog>
      <StyledBadge src={image} />
      <div>
        <p>발급일: {issueData}</p>
        <p>발급지점: {issuancePoint}</p>
        <p>그 외 추가: {etc}</p>
        <p>{statement}</p>
        <div>
          {tags.map((tag) => (
            <StyledTag>{tag}</StyledTag>
          ))}
        </div>
      </div>
    </StyledBadgeDialog>
  );
};

export default BadgeDialog;

import React, { useEffect } from "react";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #00ff0016;
`;

const StyledBadges = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledBadge = styled.img`
  width: 162px;
  height: 244px;
  border-radius: 25px;
  border-color: white;
  background: white;
  overflow: hidden;
`;

const Badge = ({ badges, setBadges }) => {
  // TODO 길이를 최소 4개로 만들어주기
  useEffect(() => {
    // while (badges.length < 4) {
    console.log(badges.length);
    //   console.log("test");
    //   setBadges([...badges, "1"]);
    // }
  }, []);

  return (
    <Content>
      <h1>보유중인 보상 배지</h1>
      <StyledBadges>
        {badges.map((badge) =>
          badge === "" ? (
            <StyledBadge />
          ) : (
            <StyledBadge src={`img/${badge}.png`} alt={`img/${badge}.png`} />
          )
        )}
      </StyledBadges>
    </Content>
  );
};

export default Badge;

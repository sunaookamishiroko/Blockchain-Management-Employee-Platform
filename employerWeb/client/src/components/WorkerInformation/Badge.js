import { Dialog, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BadgeDialog from "../WorkerManagement/Dialog/BadgeDialog";

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

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background-color: #fc7070;
  font-family: "Noto Sans CJK KR";
  font-weight: bold;
  border: 0px;
  color: white;
  font-size: 20px;
  width: 96px;
  height: 48px;
  border-radius: 30px;
  padding-left: 30px;
  padding-right: 30px;
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

  //
  const [badgeOpen, setBadgeOpen] = useState(false);
  // TODO 선택된 badge
  const [selectedBadge, setSelectedBadge] = useState({
    image: "img/badge_test.png",
    issueData: "2021/05/24",
    issuancePoint: "CGV용산",
    etc: "필요한 내용 기입",
    statement:
      "이곳에는 추가적으로 배지에 관한 내용이 기재됩니다. 이 친구 고객들에게 친절하고 지각을 한 번도 하지 않음. 보장함ㅇㅇ",
  });

  const handleClose = () => {
    setBadgeOpen(false);
  };

  const onClickBadge = (badge) => {
    setSelectedBadge(badge);
    setBadgeOpen(true);
  };

  return (
    <Content>
      {/* 배지 클릭 Dialog */}

      <Dialog maxWidth={640} onClose={handleClose} open={badgeOpen}>
        <CloseButton onClick={handleClose} />
        <BadgeDialog selectedBadge={selectedBadge} />
      </Dialog>

      <h1>보유중인 보상 배지</h1>
      <StyledBadges>
        {badges.map((badge) =>
          badge === "" ? (
            <StyledBadge />
          ) : (
            <StyledBadge
              src={badge.image}
              alt={badge.image}
              onClick={() => onClickBadge(badge)}
            />
          )
        )}
      </StyledBadges>
    </Content>
  );
};

export default Badge;

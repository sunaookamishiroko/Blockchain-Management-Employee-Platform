import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import SideLogo from "./SideLogo";
import Title from "./Title";

const LeftSidebar = styled.div`
  padding-left: 50px;
  padding-top: 50px;
  width: 250px;
  height: auto;
  background-color: white;
  float: left;
  display: flex;
  flex-direction: column;
`;

const Category = styled.div`
  p {
    color: #999999;
    font-family: "Noto Sans KR";
    font-weight: bold;
  }
  margin-bottom: 20px;
`;

const SideButton = styled(NavLink)`
  width: 200px;
  height: 50px;

  display: flex;
  justify-content: left;

  margin-left: 20px;
  margin-bottom: -10px;

  font-weight: bold;
  font-size: 20px;
  font-family: "Noto Sans KR", "Malgun Gothic";

  color: #999999;
  text-decoration: none;

  cursor: pointer;
  &:hover {
    color: #1c89e9;
  }
  &.active {
    color: #1c89e9;
  }
`;

const categories = [
  {
    name: "홈",
    submenu: [
      {
        name: "main",
        text: "출/퇴근 현황",
      },
    ],
  },
  {
    name: "근로자 관리",
    submenu: [
      {
        name: "WorkerList",
        text: "근로자 목록",
      },
      {
        name: "EnrollWorker",
        text: "근로자 등록",
      },

      {
        name: "Payroll",
        text: "급여 지급",
      },
    ],
  },
  {
    name: "추가 항목",
    submenu: [
      {
        name: "Another",
        text: "메뉴 추가 필요",
      },
    ],
  },
  {
    name: "설정",
    submenu: [
      {
        name: "Workplace",
        text: "사업장 변경",
      },
      {
        name: "Logout",
        text: "로그아웃",
      },
    ],
  },
];

const Categories = ({ name }) => {
  return (
    <LeftSidebar>
      {/* TODO 매장 이름, 사장 이름 전달해야 함 */}
      <Title name={name} />

      {categories.map((c) => (
        <Category key={c.name}>
          <p>{c.name}</p>
          {c.submenu.map((sub) => (
            <SideButton
              key={sub.name}
              activeclassname="active"
              onDragExitCapture={(sub.name === "main").toString()}
              to={sub.name === "main" ? "/" : `/${sub.name}`}
            >
              {sub.text}
            </SideButton>
          ))}
        </Category>
      ))}

      <SideLogo />
    </LeftSidebar>
  );
};

export default Categories;

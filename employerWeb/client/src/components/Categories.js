import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const LeftSidebar = styled.div`
  width: 250px;
  height: 1080px;
  background-color: #e9e9e9;
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SideButton = styled(NavLink)`
  display: flex;
  justify-content: center;
  width: 200px;
  height: 50px;
  margin-bottom: 20px;
  font-size: 15px;
  color: inherit;
  text-decoration: none;
  border: 1px solid black;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: white;
  cursor: pointer;
  &:hover {
    color: #495057;
  }
  &.active {
    color: #22b8cf;
    &:hover {
      color: #3bc9db;
    }
  }
  & + & {
    margin-top: 1rem;
  }
`;

const categories = [
  {
    name: "main",
    text: "메인",
  },
  {
    name: "EnrollWorker",
    text: "근로자 등록",
  },
  {
    name: "WorkerList",
    text: "근로자 목록",
  },
  {
    name: "Settlement",
    text: "근로자 정산",
  },
  {
    name: "Payroll",
    text: "급여 지급",
  },
  {
    name: "Another",
    text: "매장",
  },
];
const Categories = () => {
  return (
    <LeftSidebar>
      <h1> ** 사장님 </h1>
      {categories.map((c) => (
        <SideButton
          key={c.name}
          activeclassname="active"
          onDragExitCapture={(c.name === "main").toString()}
          to={c.name === "main" ? "/" : `/${c.name}`}
        >
          {c.text}
        </SideButton>
      ))}
    </LeftSidebar>
  );
};

export default Categories;

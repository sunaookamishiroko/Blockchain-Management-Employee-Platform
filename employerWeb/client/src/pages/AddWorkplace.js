import React from "react";
import Categories from "../components/Categories/Categories";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  background: #f5f8fb;
`;

const Content = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;

  padding: 30px;
  width: 100%;
  height: auto;
  border-radius: 20px;

  h1 {
    font-size: 26px;
    font-family: "Noto Sans CJK KR";
  }
`;

const Item = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 35px;
  background: white;
  box-shadow: 5px 20px 10px 5px #00000016;
  margin-right: 50px;
  margin-bottom: 50px;
  overflow: hidden;
  cursor: pointer;
`;

const AddWorkplace = ({
  name,
  wpinfo,
  web3,
  accounts,
  contract,
}) => {

  return (
    <Container>
      <Categories name={name} wpname={wpinfo[1]} />
        <Content>
        </Content>
    </Container>
  );
};

export default AddWorkplace;
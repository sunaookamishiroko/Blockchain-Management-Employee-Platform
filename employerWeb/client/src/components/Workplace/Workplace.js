import React from "react";
import Categories from "../Categories/Categories";
import styled from "styled-components";

const Container = styled.div`
  width: 1800px;
  height: 1080px;
  display: flex;
  background: #f5f8fb;
`;

const Content = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;

  margin: 30px;
  padding: 10px;
  width: 1416px;
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
`;

const Workplace = () => {
  const workplace = [
    "img/cgv.png",
    "img/cu.png",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];
  return (
    <Container>
      <Categories />
      <Content>
        {workplace.map((c, i) => (
          <Item>
            <img
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              src={c}
              alt={i}
            />
          </Item>
        ))}
      </Content>
    </Container>
  );
};

export default Workplace;

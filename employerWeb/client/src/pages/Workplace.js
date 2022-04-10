import React, { useState, useEffect } from "react";
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

const Workplace = ({
  accounts,
  contract,
  name,
  wpinfo,
  workplaceList,
  employerSetting,
}) => {
  const [workplaceinfo, setWorkplaceinfo] = useState();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    getWorkplaceinfo();
  }, []);

  // TODO workplaceList 이미지와 일치시킬 것
  const workplaceImg = [
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

  const getWorkplaceinfo = async () => {
    try {
      const workplaceinfo = await contract.methods
        .getWorkplaces()
        .call({ from: accounts[0] });
      console.log(workplaceinfo);
      setWorkplaceinfo(workplaceinfo);
    } catch (e) {
      console.log(e);
    }

    setReady(true);
  };

  const onClickItem = (i) => {
    employerSetting(i);
  };

  return (
    <Container>
      <Categories name={name} wpname={wpinfo[1]} />
      {!ready && <p>잠시만 기다려주세요... </p>}
      {ready && (
        <Content>
          {workplaceList.map((c, i) => (
            <Item
              onClick={() => {
                onClickItem(i);
              }}
            >
              <img
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                src={workplaceImg[i]}
                alt={workplaceImg[i]}
              />
            </Item>
          ))}
        </Content>
      )}
    </Container>
  );
};

export default Workplace;

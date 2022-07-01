import React, { useState } from "react";

import Categories from "../components/Categories/Categories";
import styled from "styled-components";

const Container = styled.div`
  background: #f5f8fb;
  width: 100%;
  height: 100%;
  display: flex;
`;

const Content = styled.div`
  margin: 30px;
  padding: 10px;

  width: 100%;
  height: auto%;

  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  border-radius: 20px;

  background-color: #f7f7f7;

  h1 {
    font-size: 26px;
    font-family: "Noto Sans CJK KR";
  }
`;

const StyledSubmitButton = styled.input`
  width: 260px;
  border-radius: 30px;
  font-family: "Noto Sans CJK KR";
  border: 0px;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  background-color: #1c89e9;
  color: white;
  margin-top: 50px;

  :hover {
    cursor: pointer;
    background-color: #1c89e9cc;
  }
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 

  input {
    width: auto;
    height: auto;
    padding: 10px;
    font-size: 16px;
    border: 0px;
    background-color: #f1f1f1;
    color: #999999;
    font-family: "Noto Sans CJK KR";
    font-weight: bold;
    border-radius: 40px;
  }

  select {
    border: 1px solid #1c89e9cc;
    border-radius: 0px; 
  }
`;

const AddWorkplace = ({
  name,
  wpinfo,
  web3,
  accounts,
  contract,
}) => {

  const [workplacedata, setWorkplacedata] = useState({
    name: "",
    location: "",
  });

  const workplaceOnChange = (event) => {
    const { name, value } = event.target;
    setWorkplacedata({ ...workplacedata, [name]: value });
  };

  const workplaceOnSubmit = async (e) => {
    e.preventDefault();

    if (workplacedata.name == "" || workplacedata.location == "") {
      alert("양식을 전부 채워주세요!");
      return;
    }
    
    try {
      await contract.methods
      .uploadWorkplace(
        accounts[0],
        encodeURI(workplacedata.name),
        encodeURI(workplacedata.location)
      )
      .send({ from: accounts[0] });
      alert("사업장 업로드 트랜잭션을 성공적으로 보냈습니다.");
    } catch (e) {
      alert("트랜잭션 요청을 거절하거나 알 수 없는 오류가 발생했습니다.");
      console.log(e);
    }

  };

  return (
    <Container>
      <Categories name={name} wpname={wpinfo[1]} />
      <Content>
        <h1>사업장 추가</h1>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"80%", flexDirection:"column"}}>
          <form>
            <InputDiv>
              <h2>이름</h2>
              <input
                placeholder="사업장 이름을 입력해주세요"
                name="name"
                value={workplacedata.name}
                onChange={workplaceOnChange}
              />
            </InputDiv>
            <InputDiv>
              <h2>주소</h2>
              <input
                placeholder="사업장 주소를 입력해주세요"
                name="location"
                value={workplacedata.location}
                onChange={workplaceOnChange}
              />
            </InputDiv>
            <StyledSubmitButton type={"submit"} value="제출" onClick={workplaceOnSubmit}/>
          </form>
        </div>
      </Content>
      
    </Container>
  );
};

export default AddWorkplace;
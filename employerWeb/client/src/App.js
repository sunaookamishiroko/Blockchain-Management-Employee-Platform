import React, { useEffect, useState } from "react";
import styled from "styled-components";

import WonTokenContract from "./contractABI/WonToken.json";
import ERC20Contract from "./contractABI/ERC20.json";
import LaborContract from "./contractABI/LaborContract.json";
import ERC721Contract from "./contractABI/myNFT.json";
import getWeb3 from "./getWeb3";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Main from "./pages/Main";
import WorkerManagement from "./pages/WorkerManagement";
import EnrollWorker from "./pages/EnrollWorker";
import Settlement from "./pages/Settlement";
import Payroll from "./pages/Payroll";
import Test from "./pages/Test";
import Workplace from "./pages/Workplace";
import AddWorkplace from "./pages/AddWorkplace";

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

const App = () => {
  const [web3, setWeb3] = useState();
  const [accounts, setAccounts] = useState();
  const [contract, setContract] = useState();
  const [tokencontract, setTokencontract] = useState();
  const [erc20contract, setErc20contract] = useState();
  const [nftcontract, setNftcontract] = useState();

  const [name, setName] = useState();
  const [workers, setWorkers] = useState();
  const [wpinfo, setWpinfo] = useState();

  // 사업장 관리용 근로지
  const [workplaceList, setWorkplaceList] = useState([]);

  const [loginready, setLoginready] = useState(false);
  const [ready, setReady] = useState(false);

  const [ispersonaldata, setIspersonaldata] = useState(true);
  const [isworkplacedata, setIsworkplacedata] = useState(true);

  // 업로드용 state
  const [personaldata, setPersonaldata] = useState({
    name: "",
    age: "",
    gender: "남",
  });

  const [workplacedata, setWorkplacedata] = useState({
    name: "",
    location: "",
  });

  useEffect(() => {
    loginSetting();
  }, []);

  useEffect(() => {
    employerSetting(0);
  }, [loginready]);

  // 컨트랙트 ABI를 설정하고, Web3 provider, 메타마스크 로그인을 설정하는 함수
  const loginSetting = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // laborContract abi 설정
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = LaborContract.networks[networkId];
      const instance = new web3.eth.Contract(
        LaborContract.abi,
        deployedNetwork.address
      );

      // wontoken abi 설정
      const TokenDeployNetwork = WonTokenContract.networks[networkId];
      const Tokeninstance = new web3.eth.Contract(
        WonTokenContract.abi,
        TokenDeployNetwork.address
      );

      const ERC20DeployNetwork = ERC20Contract.networks[networkId];
      const ERC20instance = new web3.eth.Contract(
        ERC20Contract.abi,
        ERC20DeployNetwork.address
      );

      // ERC721 abi 설정
      const NftDeployNetwork = ERC721Contract.networks[networkId];
      const Nftinstance = new web3.eth.Contract(
        ERC721Contract.abi,
        NftDeployNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.

      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
      setTokencontract(Tokeninstance);
      setErc20contract(ERC20instance);
      setNftcontract(Nftinstance);
    } catch (error) {
      alert(`web3, accounts, contract를 로드하는데 실패했습니다.`);
      console.error(error);
    }

    setLoginready(true);
  };

  // 사업주의 이름과 사업장의 근로자들 정보를 불러오는 함수
  // 맨 처음은 무조건 0번 index의 정보를 불러옴
  const employerSetting = async (index) => {
    try {
      const personalinfo = await contract.methods
        .getPersonInformation(accounts[0])
        .call({ from: accounts[0] });

      if (personalinfo["name"] == "") {
        setIspersonaldata(false)
      }

      const workplaceinfo = await contract.methods
        .getWorkplaces()
        .call({ from: accounts[0] });

      if (workplaceinfo[0].length == 0) {
        setIsworkplacedata(false)
      } else {
        setWorkplaceList(workplaceinfo[0]);
        let temp = [];
        temp.push(
          workplaceinfo[0][index],
          decodeURI(workplaceinfo[1][index]),
          decodeURI(workplaceinfo[2][index])
        );
  
        const workersinfo = await contract.methods
          .getEmployeeInfo(workplaceinfo[0][index])
          .call({ from: accounts[0] });
  
        setName(decodeURI(personalinfo["name"]));
        setWorkers(workersinfo);
        setWpinfo(temp);
        setReady(true);
      }

      // Test 데이터 설정중에는 주석해제 해주어야 합니다.
      setReady(true);
    } catch (e) {
      console.log(e);
    }
  };

  // 개인정보용
  const personalOnChange = (event) => {
    const { name, value } = event.target;
    setPersonaldata({ ...personaldata, [name]: value });
  };

  const personalOnSubmit = async (e) => {
    e.preventDefault();

    if (personaldata.name == "" || personaldata.age == "") {
      alert("양식을 전부 채워주세요!");
      return;
    }

    try {
      await contract.methods
      .uploadPersonalInfo(
        accounts[0],
        1,
        encodeURI(personaldata.name),
        parseInt(personaldata.age),
        encodeURI(personaldata.gender)
      )
      .send({ from: accounts[0] });
      setIspersonaldata(true);
      alert("개인 정보 업로드 트랜잭션을 성공적으로 보냈습니다.");
    } catch (e) {
      alert("트랜잭션 요청을 거절하거나 알 수 없는 오류가 발생했습니다.");
      console.log(e);
    }

  };

  // 사업장용
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
      await employerSetting(0);
      alert("사업장 업로드 트랜잭션을 성공적으로 보냈습니다.");
    } catch (e) {
      alert("트랜잭션 요청을 거절하거나 알 수 없는 오류가 발생했습니다.");
      console.log(e);
    }

  };
  
  if (!ready && ispersonaldata && isworkplacedata) {
    return (
    <h2 style={{
      display:"flex",
      justifyContent:"center", 
      alignItems:"center", 
      height:"100vh"}}>
        메타마스크 로그인, web3, 초기 정보 설정중 ...
    </h2>);
  } else if (!ready && !ispersonaldata) {
    return (
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", flexDirection:"column"}}>
        <h2>개인정보 업로드</h2>
        <form>
          <InputDiv>
            <h3>이름</h3>
            <input
              placeholder="사장님 이름을 입력해주세요"
              name="name"
              value={personaldata.name}
              onChange={personalOnChange}
            />
          </InputDiv>
          <InputDiv>
            <h3>나이</h3>
            <input
              type="number"
              placeholder="나이를 입력해주세요"
              name="age"
              value={personaldata.age}
              onChange={personalOnChange}
            />
          </InputDiv>
          <InputDiv>
            <h3>성별</h3>
            <select name="gender" onChange={personalOnChange}>
              <option value="남">남</option>
              <option value="여">여</option>
            </select>
          </InputDiv>
          <div>
            <StyledSubmitButton type={"submit"} value="제출" onClick={personalOnSubmit}/>
          </div>
        </form>
      </div>
    )
  } else if (!ready && !isworkplacedata) {
    return (
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", flexDirection:"column"}}>
        <h2>사업장 업로드</h2>
        <form>
          <InputDiv>
            <h3>이름</h3>
            <input
              placeholder="사업장 이름을 입력해주세요"
              name="name"
              value={workplacedata.name}
              onChange={workplaceOnChange}
            />
          </InputDiv>
          <InputDiv>
            <h3>주소</h3>
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
    )
  }
  else {
    return (
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                accounts={accounts}
                contract={contract}
                name={name}
                workers={workers}
                wpinfo={wpinfo}
              />
            }
          />
          <Route
            path="/manage"
            element={
              <WorkerManagement
                accounts={accounts}
                contract={contract}
                nftcontract={nftcontract}
                name={name}
                workers={workers}
                wpinfo={wpinfo}
              />
            }
          />
          <Route
            path="/enroll"
            element={<EnrollWorker name={name} wpinfo={wpinfo} />}
          />
          <Route
            path="/settlement"
            element={
              <Settlement
                accounts={accounts}
                contract={contract}
                name={name}
                wpinfo={wpinfo}
              />
            }
          />
          <Route
            path="/payroll"
            element={
              <Payroll
                web3={web3}
                accounts={accounts}
                contract={contract}
                erc20contract={erc20contract}
                tokencontract={tokencontract}
                name={name}
                workers={workers}
                wpinfo={wpinfo}
              />
            }
          />
          <Route
            path="/workplace"
            element={
              <Workplace
                accounts={accounts}
                contract={contract}
                name={name}
                wpinfo={wpinfo}
                workplaceList={workplaceList}
                employerSetting={employerSetting}
              />
            }
          />
          <Route
            path="/test"
            element={
              <Test
                web3={web3}
                accounts={accounts}
                contract={contract}
                tokencontract={tokencontract}
                nftcontract={nftcontract}
                erc20contract={erc20contract}
              />
            }
          />
          <Route
            path="/addworkplace"
            element={
              <AddWorkplace
                name={name}
                wpinfo={wpinfo}
                web3={web3}
                accounts={accounts}
                contract={contract}
              />
            }
          />
        </Routes>
      </div>
    );
  }
};

export default App;

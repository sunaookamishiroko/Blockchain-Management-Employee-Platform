import React, { Component, useEffect, useState } from "react";
import ERC20Contract from "./contracts/ERC20.json";
import LaborContract from "./contracts/LaborContract.json";
import getWeb3 from "./getWeb3";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/Main";
import WorkerList from "./components/WorkerList/WorkerList";
import EnrollWorker from "./components/Enroll/EnrollWorker";
import Settlement from "./components/Settlement/Settlement";
import Payroll from "./components/Payroll/Payroll";
import Test from "./components/Test";
import EnrollList from "./components/Enroll/EnrollList";
import Workplace from "./components/Workplace/Workplace";
//import { firestore } from "./components/firebase";

const App = () => {

  const [web3, setWeb3] = useState();
  const [accounts, setAccounts] = useState();
  const [contract, setContract] = useState();
  const [tokencontract, setTokencontract] = useState();

  const [name, setName] = useState();
  const [workers, setWorkers] = useState();
  const [wpinfo, setWpinfo] = useState();

  const [loginready, setLoginready] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loginSetting();
  }, []);
  
  useEffect(() => {
    employerSetting();
  }, [loginready])

  // 컨트랙트 ABI를 설정하고, Web3 provider, 메타마스크 로그인을 설정하는 함수
  const loginSetting = (async () => {

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
        deployedNetwork && deployedNetwork.address,
      );

      // ERC20 abi 설정
      const TokenDeployNetwork = ERC20Contract.networks[networkId];
      const Tokeninstance = new web3.eth.Contract(
        ERC20Contract.abi,
        TokenDeployNetwork && TokenDeployNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.

      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
      setTokencontract(Tokeninstance);
    } catch (error) {
      alert(
        `web3, accounts, contract를 로드하는데 실패했습니다.`,
      );
      console.error(error);
    }

    setLoginready(true);
  })
  
  // 사업주의 이름과 사업장의 근로자들 정보를 불러오는 함수
  // 맨 처음은 무조건 0번 index의 정보를 불러옴
  const employerSetting = (async () => {
    try {
      const personalinfo = await contract.methods.getPersonInformation(accounts[0]).call({ from: accounts[0] });
      const workplaceinfo = await contract.methods.getWorkplaces().call({ from: accounts[0] });
      
      let temp = [];
      temp.push(
        workplaceinfo[0][0], decodeURI(workplaceinfo[1][0]), decodeURI(workplaceinfo[2][0])
      );

      const workersinfo = await contract.methods.getEmployeeInfo(workplaceinfo[0][0]).call({ from: accounts[0] });

      setName(decodeURI(personalinfo[1]));
      setWorkers(workersinfo);
      setWpinfo(temp); 
      setReady(true);
    } catch (e) {
      console.log(e);
    }
  })
  
  // Test 데이터 설정중에는 !ready -> !loginready로 바꿔줍니다
  if (!ready) {
    return (
      <div>메타마스크 로그인, web3, 초기정보 설정중 ...</div>
    );
  } else {
      return (
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
            path="/WorkerList"
            element={
              <WorkerList
                accounts={accounts}
                contract={contract}
                name={name}
                workers={workers}
                wpinfo={wpinfo}
              />
            }
          />
          <Route path="/EnrollWorker" element={<EnrollWorker name={name} wpinfo={wpinfo}/>} />
          <Route
            path="/EnrollList"
            element={<EnrollList />}
          />
          <Route
            path="/Settlement"
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
            path="/Payroll" 
            element={
              <Payroll 
                accounts={accounts}
                contract={contract}
                tokencontract={tokencontract}
                name={name}
                workers={workers}
                wpinfo={wpinfo}
              />
            } 
          />
          <Route
            path="/Workplace"
            element={
              <Workplace
                accounts={accounts}
                contract={contract}
                name={name}
                wpinfo={wpinfo}
              />
            }
          />
          <Route
            path="/Test"
            element={<Test accounts={accounts} contract={contract} tokencontract={tokencontract} />}
          />
        </Routes>
      );
  };
};

export default App;
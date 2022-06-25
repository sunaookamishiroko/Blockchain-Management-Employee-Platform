import React, { Component, useEffect, useState } from "react";
import WonTokenContract from "./contracts/WonToken.json";
import ERC20Contract from "./contracts/ERC20.json";
import LaborContract from "./contracts/LaborContract.json";
import ERC721Contract from "./contracts/myNFT.json";
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
      const workplaceinfo = await contract.methods
        .getWorkplaces()
        .call({ from: accounts[0] });
      // 근로지 수 변경
      setWorkplaceList(workplaceinfo[0]);

      let temp = [];
      temp.push(
        workplaceinfo[0][index],
        decodeURI(workplaceinfo[1][index]),
        decodeURI(workplaceinfo[2][index])
      );

      // workplaceinfo : 사업장 index list, 사업장 이름 list, 사업장 location list(사업장 주소)
      const workersinfo = await contract.methods
        .getEmployeeInfo(workplaceinfo[0][index])
        .call({ from: accounts[0] });

      // 사장 이름
      setName(decodeURI(personalinfo[1]));
      //
      setWorkers(workersinfo);
      //
      setWpinfo(temp);
      setReady(true);
    } catch (e) {
      console.log(e);
    }
  };

  // Test 데이터 설정중에는 !ready -> !loginready로 바꿔줍니다
  if (!ready) {
    return <div>메타마스크 로그인, web3, 초기정보 설정중 ...</div>;
  } else {
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
        </Routes>
      </div>
    );
  }
};

export default App;

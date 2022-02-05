import React, { Component, useEffect, useState } from "react";
import ERC20Contract from "./contracts/ERC20.json";
import LaborContract from "./contracts/LaborContract.json";
import getWeb3 from "./getWeb3";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import WorkerList from "./components/WorkerList";
import EnrollWorker from "./components/EnrollWorker";
import Settlement from "./components/Settlement";
import Payroll from "./components/Payroll";
import Test from "./components/Test";
import EnrollList from "./components/EnrollList";
//import { firestore } from "./components/firebase";

const App = () => {

  const [attendances, setAttendances] = useState([
    // string [] startDay;
    // int [] startTimeHour;
    // int [] startTimeMinute;
    // string [] endDay;
    // int [] endTimeHour;
    // int [] endTimeMinute;
    // title: "홍길동 결근",
    // start: "2022-01-06",
    // color: "#FF0000",
    // display: "list-item",
    {
      startDay: ["2022-01-06", "2022-01-07", "2022-01-08"],
      startTimeHour: [1, 2, 3],
      startTimeMinute: [1, 2, 3],
      endDay: ["1", "2", "3"],
      endTimeHour: [1, 2, 3],
      endTimeMinute: [1, 2, 3],
    },
    
  ]);

  const [web3, setWeb3] = useState();
  const [accounts, setAccounts] = useState();
  const [contract, setContract] = useState();
  const [tokencontract, setTokencontract] = useState();
  const [name, setName] = useState();
  const [workers, setWorkers] = useState();

  const [loginready, setLoginready] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() =>{
    loginSetting();
  }, []);

  useEffect(() =>{
    getName();
  }, [loginready]);

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
      
      // 출근 event 잡는 함수
      instance.events.Onwork().on("data", (event) => {
        let values = event.returnValues;
        console.log(values.name, values.classifyNum);
      }).on("error", console.error);

      // 퇴근 event 잡는 함수
      instance.events.Offwork().on("data", (event) => {
        let values = event.returnValues;
        console.log(values.name, values.classifyNum);
      }).on("error", console.error);
      
      // 이벤트 히스토리
      /*
      instance.getPastEvents("Onwork", { fromBlock: 0, toBlock: "latest" })
      .then((events) => {
        console.log(events);
      });

      instance.getPastEvents("Offwork", { fromBlock: 0, toBlock: "latest" })
      .then((events) => {
        console.log(events);
      });
      */
      

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.

      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
      setTokencontract(Tokeninstance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

    setLoginready(true);

  })

  const employerSetting = (async () => {
    const response = await contract.methods.getWorkplaces().call({ from: accounts[0] });
    console.log(response);
    setReady(true);
  })

  const getName = (async () => {
    try {
      const response = await contract.methods.getPersonInformation(accounts[0]).call({ from: accounts[0] });
      const response2 = await contract.methods.getEmployeeInfo(0).call({ from: accounts[0] });
      setName(decodeURI(response[1]));
      setWorkers(response2);
      setReady(true);
    } catch (e) {
      console.log(e);
    }
  })

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
              web3={web3}
              accounts={accounts}
              contract={contract}
              name={name}
              workers={workers}
            />
          }
        />{" "}
        <Route
          path="/WorkerList"
          element={
            <WorkerList
              web3={web3}
              accounts={accounts}
              contract={contract}
              name={name}
              workers={workers}
            />
          }
        />{" "}
        <Route
          path="/EnrollWorker"
          element={
            <EnrollWorker
              name={name}
            />
          }
        />{" "}
        <Route
          path="/EnrollList"
          element={
            <EnrollList
  
              attendances={attendances}
            />
          }
        />{" "}
        <Route
          path="/Settlement"
          element={
            <Settlement
              web3={web3}
              accounts={accounts}
              contract={contract}
              name={name}
              workers={workers}
            />
          }
        />{" "}
        <Route
          path="/Payroll"
          element={
            <Payroll
  
              attendances={attendances}
            />
          }
        />{" "}
        <Route
          path="/Test"
          element={
            <Test
              accounts={accounts}
              contract={contract}
            />
          }
        />{" "}
      </Routes>
    );

  }
};

export default App;
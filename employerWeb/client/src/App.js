import React, { Component } from "react";
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

class App extends Component {
  // state = { web3: null, accounts: null, contract: null, tokencontract: null };

  // componentDidMount = async () => {
  //   try {
  //     // Get network provider and web3 instance.
  //     const web3 = await getWeb3();

  //     // Use web3 to get the user's accounts.
  //     const accounts = await web3.eth.getAccounts();

  //     // laborContract abi 설정
  //     const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = LaborContract.networks[networkId];
  //     const instance = new web3.eth.Contract(
  //       LaborContract.abi,
  //       deployedNetwork && deployedNetwork.address,
  //     );

  //     // ERC20 abi 설정
  //     const TokenDeployNetwork = ERC20Contract.networks[networkId];
  //     const Tokeninstance = new web3.eth.Contract(
  //       ERC20Contract.abi,
  //       TokenDeployNetwork && TokenDeployNetwork.address,
  //     );

  //     // 출근 event 잡는 함수
  //     instance.events.Onwork().on("data", (event) => {
  //       let values = event.returnValues;
  //       console.log(values.name, values.classifyNum);
  //     }).on("error", console.error);

  //     // 퇴근 event 잡는 함수
  //     instance.events.Offwork().on("data", (event) => {
  //       let values = event.returnValues;
  //       console.log(values.name, values.classifyNum);
  //     }).on("error", console.error);

  //     // 이벤트 히스토리

  //     instance.getPastEvents("Onwork", { fromBlock: 0, toBlock: "latest" })
  //     .then((events) => {
  //       console.log(events);
  //     });

  //     instance.getPastEvents("Offwork", { fromBlock: 0, toBlock: "latest" })
  //     .then((events) => {
  //       console.log(events);
  //     });

  //     // Set web3, accounts, and contract to the state, and then proceed with an
  //     // example of interacting with the contract's methods.
  //     this.setState({ web3, accounts, contract: instance, tokencontract: Tokeninstance});
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`,
  //     );
  //     console.error(error);
  //   }
  // };

  // /*
  // let accountInterval = setInterval(function() {
  //       // 계정이 바뀌었는지 확인
  //       if (web3.eth.accounts[0] !== accounts) {
  //         accounts = web3.eth.accounts[0];
  //         // 새 계정에 대한 UI로 업데이트하기 위한 함수 호출
  //         location.reload();
  //       }
  //     }, 100);
  // */

  // //////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////

  // // 근로자 정보 업로드
  // uploadPersonalInfo0 = async () => {
  //   const { accounts, contract } = this.state;
  //   await contract.methods.uploadPersonalInfo(accounts[0], 0, encodeURI("이서윤"), 26, encodeURI("여")).send({ from: accounts[0] });
  //   console.log("uploadPersonalInfo0 complete");
  // };

  // // 사업주 정보 업로드
  // uploadPersonalInfo1 = async () => {
  //   const { accounts, contract } = this.state;
  //   await contract.methods.uploadPersonalInfo(accounts[0], 1, encodeURI("홍길동"), 50, encodeURI("여")).send({ from: accounts[0] });
  //   console.log("uploadPersonalInfo1 complete");
  // };

  // // 사람의 개인정보 보기
  // getPersonInformation = async () => {
  //   const { accounts, contract } = this.state;
  //   const response = await contract.methods.getPersonInformation(accounts[0]).call({ from: accounts[0] });
  //   console.log(response);
  //   console.log(decodeURI(response[1]));
  //   console.log(decodeURI(response[3]));
  // };

  // // 사업장 등록
  // uploadWorkplace = async () => {
  //   const { accounts, contract } = this.state;
  //   await contract.methods.uploadWorkplace(accounts[0], encodeURI("맥도날드"), encodeURI("서울특별시")).send({ from: accounts[0] });
  //   console.log("uploadWorkplace complete");
  // };

  // // 사업장 조회
  // getWorkplaces = async () => {
  //   const { accounts, contract } = this.state;
  //   const response = await contract.methods.getWorkplaces().call({ from: accounts[0] });
  //   console.log(response);
  // };

  // //////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////

  // // 근로계약서 업로드
  // uploadLaborContract = async () => {
  //   const { accounts, contract } = this.state;
  //   let items = [
  //     "2022/01/04 ~ 2022/03/31",
  //     encodeURI("접대"),
  //     "03:00 ~ 12:00",
  //     encodeURI("매주 화요일"),
  //     "9160",
  //     encodeURI("매월 10일"),
  //     encodeURI("없음")
  //   ];

  //   await contract.methods.uploadLaborContract(items, accounts[0], 0).send({ from: accounts[0] });
  //   console.log("uploadLaborContract complete");
  // };

  // // 근로자가 근로계약서 조회
  // getLaborContract0 = async () => {
  //   const { accounts, contract } = this.state;
  //   const response = await contract.methods.getLaborContract(0, accounts[0]).call({ from: accounts[0] });
  //   console.log(response);
  // };

  // // 사업주가 근로계약서 조회
  // getLaborContract1 = async () => {
  //   const { accounts, contract } = this.state;
  //   const response = await contract.methods.getLaborContract(0, "0x73fA89eDbc136AA1eC77a729D3409c760F631dcf").call({ from: accounts[0] });
  //   console.log(response);
  // };

  // //////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////

  // // 0 -> 출근 / 1 -> 퇴근
  // // 출퇴근 업로드 : 출근
  // uploadAttendance0 = async () => {
  //   const { accounts, contract } = this.state;
  //   await contract.methods.uploadAttendance(0, 0, "2022/01/08", 18, 0).send({ from: accounts[0] });
  //   console.log("uploadAttendance0 complete");
  // };

  // // 출퇴근 업로드 : 퇴근
  // uploadAttendance1 = async () => {
  //   const { accounts, contract } = this.state;
  //   await contract.methods.uploadAttendance(1, 0, "2022/01/08", 3, 45).send({ from: accounts[0] });
  //   console.log("uploadAttendance1 complete");
  // };

  // // 출근, 퇴근 날짜 조회
  // getCalAttendance = async () => {
  //   const { accounts, contract } = this.state;
  //   const response = await contract.methods.getCalAttendance(0, 0).call({ from: accounts[0] });
  //   console.log(response);
  // };

  // // 출석부 모두 조회
  // getAllAttendance = async () => {
  //   const { accounts, contract } = this.state;
  //   const response = await contract.methods.getAllAttendance(0, 1).call({ from: accounts[0] });
  //   console.log(response);
  // };

  // //////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////

  // // 급여 정산
  // getPayment = async () => {
  //   const { accounts, contract } = this.state;
  //   let wage = await contract.methods.getWage(0, 1).call({ from: accounts[0] });
  //   wage = parseInt(wage);

  //   const response = await contract.methods.getPayment(0, 1, 0, 2, wage).call({ from: accounts[0] });
  //   console.log(response);
  // };

  // //////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////

  // // 사업주의 사업장 근로자 정보 목록 조회
  // getEmployeeInfo = async () => {
  //   const { accounts, contract } = this.state;
  //   const response = await contract.methods.getEmployeeInfo(0).call({ from: accounts[0] });
  //   console.log(response);
  // };

  // // 사업주의 사업장의 근로자 수 조회
  // getNumOfEmployee = async () => {
  //   const { accounts, contract } = this.state;
  //   const response = await contract.methods.getNumOfEmployee(0).call({ from: accounts[0] });
  //   console.log(response);
  // };

  // // 근로자의 근무지에서의 index 조회
  // getIndexOfEmployee = async () => {
  //   const { accounts, contract } = this.state;
  //   const response = await contract.methods.getIndexOfEmployee(0, accounts[0]).call({ from: accounts[0] });
  //   console.log(response);
  // };

  // // 근로자의 근무 시간 조회
  // getWorkTime = async () => {
  //   const { accounts, contract } = this.state;
  //   const response = await contract.methods.getWorkTime(0, 1, 0, 2).call({ from: accounts[0] });
  //   console.log(response);
  // };

  // // 근로자의 근무 시간 조회
  // getWage = async () => {
  //   const { accounts, contract } = this.state;
  //   const response = await contract.methods.getWage(0, 1).call({ from: accounts[0] });
  //   console.log(response);
  // };

  // //////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////

  // // 자신에게 토큰 발행
  // mint = async () => {
  //   const { accounts, tokencontract } = this.state;
  //   await tokencontract.methods.mint(accounts[0], 2000000).send({ from: accounts[0] });
  //   console.log("mint complete");
  // };

  // // 토큰 잔고
  // balanceOf = async () => {
  //   const { accounts, tokencontract } = this.state;
  //   const response = await tokencontract.methods.balanceOf( accounts[0] ).call({ from: accounts[0] });
  //   console.log(response);
  // };

  // // 토큰 전송
  // transfer = async () => {
  //   const { accounts, tokencontract } = this.state;
  //   await tokencontract.methods.transfer("0x73fA89eDbc136AA1eC77a729D3409c760F631dcf", 100000).send({ from: accounts[0] });
  //   console.log("transfer complete");
  // };

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/WorkerList" element={<WorkerList />} />
        <Route path="/EnrollWorker" element={<EnrollWorker />} />
        <Route path="/Settlement" element={<Settlement />} />
        <Route path="/Payroll" element={<Payroll />} />
        {/* <h1>함수 실험실</h1>
                        <h4>정보 업로드 / 보기</h4>
                        <button onClick={this.uploadPersonalInfo0}>uploadPersonalInfo(근로자)</button>
                        <button onClick={this.uploadPersonalInfo1}>uploadPersonalInfo(사업주)</button>
                        <button onClick={this.getPersonInformation}>getPersonInformation</button>
                        <button onClick={this.uploadWorkplace}>uploadWorkplace</button>
                        <button onClick={this.getWorkplaces}>getWorkplaces</button>
                        <h4>근로계약서 업로드 / 조회</h4>
                        <button onClick={this.uploadLaborContract}>uploadLaborContract</button>
                        <button onClick={this.getLaborContract0}>getLaborContract(근로자)</button>
                        <button onClick={this.getLaborContract1}>getLaborContract(사업주)</button>
                        <h4>출퇴근 업로드 / 조회</h4>
                        <button onClick={this.uploadAttendance0}>uploadAttendance(출근)</button>
                        <button onClick={this.uploadAttendance1}>uploadAttendance(퇴근)</button>
                        <button onClick={this.getCalAttendance}>getCalAttendance</button>
                        <button onClick={this.getAllAttendance}>getAllAttendance</button>
                        <h4>급여 정산</h4>
                        <button onClick={this.getPayment}>getPayment</button>
                        <h4>기타 조회</h4>
                        <button onClick={this.getEmployeeInfo}>getEmployeeInfo</button>
                        <button onClick={this.getNumOfEmployee}>getNumOfEmployee</button>
                        <button onClick={this.getIndexOfEmployee}>getIndexOfEmployee</button>
                        <button onClick={this.getWorkTime}>getWorkTime</button>
                        <button onClick={this.getWage}>getWage</button>
                        <h4>토큰 함수</h4>
                        <button onClick={this.mint}>mint</button>
                        <button onClick={this.balanceOf}>balanceOf</button>
                        <button onClick={this.transfer}>transfer</button> */}{" "}
      </Routes>
    );
  }
}

export default App;

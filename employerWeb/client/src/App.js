import React, { Component } from "react";
import ERC20Contract from "./contracts/ERC20.json";
import LaborContract from "./contracts/LaborContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = LaborContract.networks[networkId];
      const instance = new web3.eth.Contract(
        LaborContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  // 근로자 정보 업로드
  uploadPersonalInfo0 = async () => {
    const { accounts, contract } = this.state;
    await contract.methods.uploadPersonalInfo(accounts[0], 0, encodeURI("이서윤"), 24, encodeURI("남")).send({ from: accounts[0] });
    console.log("uploadPersonalInfo0 complete");
  };

  // 사업주 정보 업로드
  uploadPersonalInfo1 = async () => {
    const { accounts, contract } = this.state;
    await contract.methods.uploadPersonalInfo(accounts[0], 1, encodeURI("홍길동"), 50, encodeURI("여")).send({ from: accounts[0] });
    console.log("uploadPersonalInfo1 complete");
  };

  // 사람의 개인정보 보기
  getPersonInformation = async () => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.getPersonInformation(accounts[0]).call({ from: accounts[0] });
    console.log(response);
    console.log(decodeURI(response[1]));
    console.log(decodeURI(response[3]));
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>함수 실험실</h1>
        <h4>개인정보 업로드</h4>
        <button onClick={this.uploadPersonalInfo0}>uploadPersonalInfo(근로자)</button>
        <button onClick={this.uploadPersonalInfo1}>uploadPersonalInfo(사업주)</button>
        <button onClick={this.getPersonInformation}>getPersonInformation</button>
      </div>
    );
  }
}

export default App;

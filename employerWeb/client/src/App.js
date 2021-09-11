import React, { Component } from "react";
import ERC20Contract from "./contracts/ERC20.json";
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
      const deployedNetwork = ERC20Contract.networks[networkId];
      const instance = new web3.eth.Contract(
        ERC20Contract.abi,
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

  mint = async () => {
    const { accounts, contract } = this.state;
    await contract.methods.mint(accounts[0], 1000000).send({ from: accounts[0] });
    console.log("mint complete");
  };

  balance = async () => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.balanceOf(accounts[0]).call();
    console.log("blance : ", response);
  }

  transfer = async () => {
    const { accounts, contract } = this.state;
    await contract.methods.transfer("0x1d9B0E0badA1a8e5Ab3c2045ba6BDE301F15Df20", 500000).send({ from: accounts[0] });
    console.log("transfer complete");
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <button onClick={this.mint}>mint</button>
        <button onClick={this.balance}>balance</button>
        <button onClick={this.transfer}>transfer</button>
      </div>
    );
  }
}

export default App;

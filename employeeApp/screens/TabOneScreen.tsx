import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import SimpleStorageContract from "../contracts/SimpleStorage.json";

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";
import { makeLabortxobj, provider, contract } from "../transaction/Transaction";

// 내 근무지
/*
const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}*/

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  const onWork = React.useCallback(async () => {

    let abidata = new ethers.utils
    .Interface(["function uploadAttendance(uint8 classifyNum, uint workPlaceInfoIndex, string calldata day, int timeHour, int timeMinute)"])
    .encodeFunctionData("uploadAttendance", [0, 0, "2022/01/11", 18, 0]);
    let txObj = await makeLabortxobj(connector.accounts[0], abidata, 50000);

    try {
      await connector.sendTransaction(txObj)
      .then((result) => {
        console.log("tx hash:", result);
        console.log(`https://ropsten.etherscan.io/tx/${result}`)
      });
    } catch (e) {
      console.error(e);
    };

  }, [connector]);
  
  const OffWork = React.useCallback(async () => {

    let abidata = new ethers.utils
    .Interface(["function uploadAttendance(uint8 classifyNum, uint workPlaceInfoIndex, string calldata day, int timeHour, int timeMinute)"])
    .encodeFunctionData("uploadAttendance", [1, 0, "2022/01/11", 20, 0]);
    let txObj = await makeLabortxobj(connector.accounts[0], abidata, 50000);

    try {
      await connector.sendTransaction(txObj)
      .then((result) => {
        console.log("tx hash:", result);
        console.log(`https://ropsten.etherscan.io/tx/${result}`)
      });
    } catch (e) {
      console.error(e);
    };

  }, [connector]);

  const uploadPersonalInfo = React.useCallback(async () => {

    let abidata = new ethers.utils
    .Interface(["function uploadPersonalInfo(address person, uint8 identiNumber, string calldata name, uint age, string calldata gender)"])
    .encodeFunctionData("uploadPersonalInfo", [connector.accounts[0], 0, encodeURI("이서윤"), 25, encodeURI("남")]);
    let txObj = await makeLabortxobj(connector.accounts[0], abidata, 50000);

    try {
      await connector.sendTransaction(txObj)
      .then((result) => {
        console.log("tx hash:", result);
        console.log(`https://ropsten.etherscan.io/tx/${result}`)
      });
    } catch (e) {
      console.error(e);
    };

  }, [connector]);



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {!!connector.connected && (
        <>
          <Text>{connector.accounts[0]}</Text>
          <TouchableOpacity onPress={killSession} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Log out</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onWork} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>출근</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={OffWork} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>퇴근</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={uploadPersonalInfo} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>개인정보 업로드</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonStyle: {
    backgroundColor: "#3399FF",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#3399FF",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "600",
  },
});

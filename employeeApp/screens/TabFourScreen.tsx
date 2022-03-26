import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { styles } from '../css/styles';
import { Text, View } from '../components/Themed';

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { makeLabortxobj, infuraProvider, laborContract } from "../connectETH/Transaction";
//import { connectWallet } from "../connectETH/connectWallet";

// 프로필

const shortenAddress = (address: string) => {
  return `${address.slice(0, 10)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}

export default function TabFourScreen() {

  const [personalinfo, setPersonalinfo] = useState<string[]>([]);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (connector.connected) {
      getPersonInformation();
    }
  }, []);

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
}, [connector]);

  // wallet과 연결 종료하기
  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  // 개인정보 불러오기
  const getPersonInformation = (async() => {
    let result = await laborContract.getPersonInformation(connector.accounts[0], { from : connector.accounts[0] });
    console.log(result);

    setPersonalinfo([
      decodeURI(result[1]),
      ethers.utils.formatUnits(result[2], 0),
      decodeURI(result[3]),
      result[4]
    ])
    setReady(true);
  })

  // 개인정보 업로드
  const uploadPersonalInfo = (async () => {

      let abidata = new ethers.utils
      .Interface(["function uploadPersonalInfo(address person, uint8 identiNumber, string calldata name, uint age, string calldata gender)"])
      .encodeFunctionData("uploadPersonalInfo", [connector.accounts[0], 0, encodeURI("이서윤"), 24, encodeURI("남")]);
      let txObj = await makeLabortxobj(connector.accounts[0], abidata, 100000);
  
      try {
        await connector.sendTransaction(txObj)
        .then((result) => {
          console.log("tx hash:", result);
          console.log(`https://ropsten.etherscan.io/tx/${result}`)
        });
      } catch (e) {
        console.error(e);
      };
  
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Four</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {connector.connected && !ready && (
        <>
          <TouchableOpacity onPress={uploadPersonalInfo} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>개인정보 업로드</Text>
          </TouchableOpacity>
          <Text>잠시만 기다려주세요...</Text>
        </>
      )}
      {(connector.connected && ready) && (
        <>
          <Text>{personalinfo[0]}</Text>
          <Text>Address : {shortenAddress(connector.accounts[0])}</Text>
          <Text>성별 : {personalinfo[1]}</Text>
          <Text>나이 : {personalinfo[2]}</Text>
          <TouchableOpacity onPress={killSession} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Logout</Text>
          </TouchableOpacity>
          <Text>경력 : {personalinfo[3]}</Text>
        </>
      )}
    </View>
  );
}

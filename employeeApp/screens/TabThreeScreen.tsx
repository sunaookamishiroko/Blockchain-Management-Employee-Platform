import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';

import { styles } from '../css/styles';
import { Text, View } from '../components/Themed';

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { makeLabortxobj, infuraProvider, laborContract } from "../connectETH/Transaction";
//import { connectWallet } from "../connectETH/connectWallet";

export default function TabThreeScreen() {

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
      decodeURI(result[3])
    ])
    setReady(true);
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Three</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {connector.connected && !ready && (
        <>
          <Text>잠시만 기다려주세요...</Text>
        </>
      )}
      {(connector.connected && ready) && (
        <>
          <Text>ㅎㅇ요</Text>
        </>
      )}
    </View>
  );
}

import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { makeLabortxobj, infuraProvider, laborContract } from "../transaction/Transaction";

// 프로필

const shortenAddress = (address: string) => {
  return `${address.slice(0, 10)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}

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

  // wallet과 연결함
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
  });

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
          <Text>{personalinfo[0]}</Text>
          <Text>Address : {shortenAddress(connector.accounts[0])}</Text>
          <Text>성별 : {personalinfo[1]}</Text>
          <Text>나이 : {personalinfo[2]}</Text>
          <TouchableOpacity onPress={killSession} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Logout</Text>
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

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { makeLabortxobj, infuraProvider, laborContract } from "../transaction/Transaction";

// 근로계약서 알림 모달창

export default function NotificationScreen() {
  
  const connector = useWalletConnect();

  const uploadLaborContract = React.useCallback(async () => {
    let items = [
      "2022/01/04 ~ 2022/03/31",
      encodeURI("접대"),
      "03:00 ~ 12:00",
      encodeURI("매주 화요일"),
      "9160",
      encodeURI("매월 10일"),
      encodeURI("없음")
    ];

    let abidata = new ethers.utils
    .Interface(["function uploadLaborContract(string [] calldata laborContractItems, address employeeAddress, uint workplaceInfoIndex)"])
    .encodeFunctionData("uploadLaborContract", [items, connector.accounts[0], 1]);
    let txObj = await makeLabortxobj(connector.accounts[0], abidata, 500000);

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
      {!connector.connected && (
        <Text style={styles.buttonTextStyle}>로그인 해주세요</Text>
      )}
      {connector.connected && (
        <>
        <Text style={styles.title}>근로계약서</Text>
        <TouchableOpacity onPress={uploadLaborContract} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>근로계약서 업로드</Text>
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
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { styles } from '../css/styles';
import { RootTabScreenProps } from '../types';

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { laborContract } from "../connectETH/Transaction";
//import { connectWallet } from "../connectETH/connectWallet";

// 근무지 정보

export default function TabTwoScreen({navigation} : RootTabScreenProps<'TabTwo'>) {

  const [ready, setReady] = useState<boolean>(false);
  const [callresult, setCallresult] = useState<object[]>([]);
  
  useEffect(() => {
    if (connector.connected) {
      getWorkplace();
    }
  }, []);

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  // 근무지 불러오기
  const getWorkplace = (async() => {
    let result = await laborContract.getWorkplaces({ from : connector.accounts[0] });

    if (result[0].length === 0) {
      setCallresult(result);
      setReady(null);
    } else {
      let temp = []

      for (let x = 0; x < result[0].length; x++) {
        temp.push({
          wpindex: ethers.utils.formatUnits(result[0][x], 0),
          wpname: decodeURI(result[1][x]),
          wplocation: decodeURI(result[2][x])
        })
      }
      setCallresult(temp);
      setReady(true);
    }

    
  })

  // 렌더링 하기 위해 배치작업
  const makeJsx = () => {
    let workplaceInfo = [];

    for (let x = 0 ; x < callresult.length; x++) {
      workplaceInfo.push(
        <View style={styles.container} key={x}>
            <Text>{callresult[x].wpindex}</Text>
            <Text>{callresult[x].wpname}</Text>
            <Text>{callresult[x].wplocation}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('LaborContractViewScreen', { index : callresult[x].wpindex, classify : 0 })}>
                <Text style={styles.buttonTextStyle}>근로계약서</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('CheckAttendancePayScreen', { index : callresult[x].wpindex })}>
                <Text style={styles.buttonTextStyle}>근태 / 급여</Text>
              </TouchableOpacity>
            </View>
        </View>
      );
    }
    return workplaceInfo;
  }

  return (
    <View style={styles.container}>
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {connector.connected && ready == false && (
        <>
          <Text>잠시만 기다려주세요...</Text>
        </>
      )}
      {connector.connected && ready == null && (
        <>
          <Text>근무지가 존재하지 않습니다.</Text>
        </>
      )}
      {(connector.connected && ready) && (
        <>
          {makeJsx()}
        </>
      )}
    </View>
  );
}
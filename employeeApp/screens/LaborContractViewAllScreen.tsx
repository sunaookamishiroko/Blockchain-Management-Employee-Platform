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

// 모든 근로 계약서 정보
export default function LaborContractViewAllScreen({navigation} : RootTabScreenProps<'LaborContractViewAllScreen'>) {

  const [ready, setReady] = useState<boolean>(false);
  const [callresult, setCallresult] = useState<object[]>();
  
  useEffect(() => {
    getAllLaborContract();
  }, []);

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  // 근무지 불러오기
  const getAllLaborContract = (async() => {
    let result = await laborContract.getAllLaborContract(connector.accounts[0], { from : connector.accounts[0] });

    let temp = [];

    for(let x = 0 ; x < result.length ; x++) {
      let contract = await laborContract.getLaborContract2(ethers.utils.formatUnits(result[x], 0), { from : connector.accounts[0] });
      let wpinfo = await laborContract.getWorkplcesInfo(ethers.utils.formatUnits(contract[0], 0), { from : connector.accounts[0] });

      temp.push({
          wpname: decodeURI(wpinfo[0]), 
          wplocation: decodeURI(wpinfo[1]), 
          contractindex: ethers.utils.formatUnits(result[x], 0) 
      });
    }

    setCallresult(temp);
    setReady(true);
  })

  // 렌더링 하기 위해 배치작업
  const makeJsx = () => {
    let workplaceInfo = [];

    for (let x = 0 ; x < callresult.length; x++) {
      workplaceInfo.push(
        <View key={x}>
            <Text>{callresult[x].wpname}</Text>
            <Text>{callresult[x].wplocation}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('LaborContractViewScreen', { index : callresult[x].contractindex, classify : 1})}>
                <Text style={styles.buttonTextStyle}>자세히 보기</Text>
              </TouchableOpacity>
            </View>
        </View>
      );
    }

    return workplaceInfo;
  }

  return (
    <View style={styles.container}>
      {connector.connected && ready === false && (
        <>
          <Text>잠시만 기다려주세요...</Text>
        </>
      )}
      {connector.connected && ready === null && (
        <>
          <Text>근로계약서가 존재하지 않습니다.</Text>
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
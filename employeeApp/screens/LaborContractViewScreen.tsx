import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { styles } from '../css/styles';
import { RootTabScreenProps } from '../types';
import { PROVIDER_APIKEY, CONTRACT_ADDRESS1, CONTRACT_ADDRESS2} from "@env";

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { makeLabortxobj, infuraProvider, laborContract } from "../connectETH/Transaction";

// 내 근무지

export default function LaborContractViewScreen({ route }) {

  const [ready, setReady] = useState<boolean>(false);
  const [contractdata, setContractdata] = useState<any[]>([]);

  useEffect(() => {
    getLaborContract();
  }, []);

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  // wallet과 연결함
  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  // 근로계약서를 가져옴
  const getLaborContract = (async() => {

    // 근무지 정보에서 조회하는 경우
    if (route.params.classify == 0) {

      let result = await laborContract.getLaborContract(
        route.params.index, 
        connector.accounts[0], 
        { from : connector.accounts[0] }
        );
  
      console.log(result);
      
      let temp = [];
  
      temp.push(ethers.utils.formatUnits(result[0], 0))
      temp.push(result[1])
      temp.push(decodeURI(result[2]))
      temp.push(result[3])
      temp.push(decodeURI(result[4]))
      temp.push(result[5])
      temp.push(decodeURI(result[6]))
      temp.push(decodeURI(result[7]))
      
      setContractdata(temp);
      setReady(true);

    } 
    // 모든 계약서 조회에서 조회하는 경우
    else {
      
      let result = await laborContract.getLaborContract2(
        route.params.index,
        { from : connector.accounts[0] }
        );
  
      console.log(result);
      
      let temp = [];
  
      temp.push(ethers.utils.formatUnits(result[0], 0))
      temp.push(result[1])
      temp.push(decodeURI(result[2]))
      temp.push(result[3])
      temp.push(decodeURI(result[4]))
      temp.push(result[5])
      temp.push(decodeURI(result[6]))
      temp.push(decodeURI(result[7]))
      
      setContractdata(temp);
      setReady(true);
    }
    
  })

  return (
    <View style={styles.container}>
      {!ready && (
        <>
          <Text style={styles.title}>{route.params.index}</Text>
          <Text style={styles.title}>잠시만 기다려주세요..</Text>
        </>
      )}
      {ready && (
        <>
          <Text style={styles.title}>{contractdata[0]}</Text>
          <Text style={styles.title}>{contractdata[1]}</Text>
          <Text style={styles.title}>{contractdata[2]}</Text>
          <Text style={styles.title}>{contractdata[3]}</Text>
          <Text style={styles.title}>{contractdata[4]}</Text>
          <Text style={styles.title}>{contractdata[5]}</Text>
          <Text style={styles.title}>{contractdata[6]}</Text>
          <Text style={styles.title}>{contractdata[7]}</Text>
        </>
      )} 
    </View>
  );
}
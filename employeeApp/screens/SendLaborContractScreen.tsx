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

export default function SendLaborContractScreen({ navigation, route }: RootTabScreenProps<'NotificationModal'>) {

  const [issendtx, setIssendtx] = useState<Boolean | null>(null);
  const [answer, setAnswer] = useState<Boolean | null>(null);

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  const uploadLaborContract = async () => {
    setAnswer(true);

    let temp = [];

    temp.push(route.params.laborcontract.period);
    temp.push(route.params.laborcontract.duties);
    temp.push(route.params.laborcontract.workingtime);
    temp.push(route.params.laborcontract.workingdays);
    temp.push(route.params.laborcontract.wage);
    temp.push(route.params.laborcontract.wageday);
    temp.push(route.params.laborcontract.comment);

    let abidata = new ethers.utils
    .Interface(["function uploadLaborContract(string [] calldata laborContractItems, string calldata stday, address employeeAddress, uint wpindex)"])
    .encodeFunctionData("uploadLaborContract", [temp, "2022-04-16", connector.accounts[0], route.params.laborcontract.workplaceindex]);
    let txObj = await makeLabortxobj(connector.accounts[0], abidata, 1000000);

    try {
      await connector.sendTransaction(txObj)
      .then((result) => {
        console.log("tx hash:", result);
        console.log(`https://ropsten.etherscan.io/tx/${result}`)
        setIssendtx(true);
      });
    } catch (e) {
      console.error(e);
    };

  };

  const setanswer = () => { 
    setAnswer(false); 
    
    
  }

  return (
    <View style={styles.container}>
      {issendtx == null && answer == null && (
        <>
          <Text style={styles.title}>{route.params.laborcontract.wpname}</Text>
          <Text style={styles.title}>{route.params.laborcontract.period}</Text>
          <Text style={styles.title}>{route.params.laborcontract.duties}</Text>
          <Text style={styles.title}>{route.params.laborcontract.workingtime}</Text>
          <Text style={styles.title}>{route.params.laborcontract.workingdays}</Text>
          <Text style={styles.title}>{route.params.laborcontract.wage}</Text>
          <Text style={styles.title}>{route.params.laborcontract.wageday}</Text>
          <Text style={styles.title}>{route.params.laborcontract.comment}</Text>
          <Text>위 근로계약서의 모든 내용을 업로드하는데 동의하시겠습니까?</Text>
          <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonStyle} onPress = {uploadLaborContract}>
                <Text style={styles.buttonTextStyle}>예</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonStyle} onPress = {setanswer}>
                <Text style={styles.buttonTextStyle}>아니오</Text>
              </TouchableOpacity>
          </View>
        </>
      )}
      {!issendtx && answer == false &&(
        <Text>트랜잭션 전송에 실패했습니다.</Text>
      )}
      {issendtx && answer == true &&(
        <Text>근로계약이 완료되었습니다.</Text>
      )} 
      {issendtx == null && answer == false &&(
        <Text>근로계약서가 반려되었습니다.</Text>
      )} 
    </View>
  );
}
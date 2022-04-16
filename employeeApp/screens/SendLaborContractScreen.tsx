import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { styles } from '../css/styles';
import { RootTabScreenProps } from '../types';
import * as WebBrowser from 'expo-web-browser';

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { makeLabortxobj } from "../connectETH/Transaction";

import { ENDPOINT } from "@env";

import axios from "axios";

// 내 근무지

export default function SendLaborContractScreen({ navigation, route }: RootTabScreenProps<'NotificationModal'>) {

  const [issendtx, setIssendtx] = useState<Boolean | null>(null);
  const [answer, setAnswer] = useState<Boolean | null>(null);
  const [txhash, setTxhash] = useState();

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();


  // 근로계약서 컨트랙트에 올리기 위해 트랜잭션 보내기
  const uploadLaborContract = async () => {
    setAnswer(true);

    let temp = [];

    // 트랜잭션 전송을 위해 근로계약서 배열에 넣기
    temp.push(route.params.laborcontract.period);
    temp.push(route.params.laborcontract.duties);
    temp.push(route.params.laborcontract.workingtime);
    temp.push(route.params.laborcontract.workingdays);
    temp.push(route.params.laborcontract.wage);
    temp.push(route.params.laborcontract.wageday);
    temp.push(route.params.laborcontract.comment);

    // abi data 만든 후 raw transaction 만들기
    let abidata = new ethers.utils
    .Interface(["function uploadLaborContract(string [] calldata laborContractItems, string calldata stday, address employeeAddress, uint wpindex)"])
    .encodeFunctionData("uploadLaborContract", [temp, "2022-04-16", connector.accounts[0], route.params.laborcontract.workplaceindex]);
    let txObj = await makeLabortxobj(connector.accounts[0], abidata, 1000000);

    try {
      // 트랜잭션 보내기
      await connector.sendTransaction(txObj)
      .then((result) => {
        setTxhash(result);
        console.log(`https://ropsten.etherscan.io/tx/${result}`)
      });

      // db에서 근로계약서 삭제하기
      let body = {
        "address" : connector.accounts[0],
        "workplaceindex" : route.params.laborcontract.workplaceindex
      }

      await axios.post(
        `${ENDPOINT}deletecontract`,
        body
      );

      setIssendtx(true);

    } catch (e) {
      console.error(e);
    };

  };

  // 근로계약서 반려하여 삭제
  const deleteLaborContract = async () => { 
    try {
      let body = {
        "address" : connector.accounts[0],
        "workplaceindex" : route.params.laborcontract.workplaceindex
      }

      await axios.post(
        `${ENDPOINT}deletecontract`,
        body
      );

      setAnswer(false); 
      
    } catch(e) {
      console.log(e);
    }
  }

  // 이더스캔 열기
  const _handlePressButtonAsync = async () => {
    await WebBrowser.openBrowserAsync(`https://ropsten.etherscan.io/tx/${txhash}`);
  };


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
              <TouchableOpacity style={styles.buttonStyle} onPress = {deleteLaborContract}>
                <Text style={styles.buttonTextStyle}>아니오</Text>
              </TouchableOpacity>
          </View>
        </>
      )}
      {issendtx == false && answer == false &&(
        <Text>트랜잭션 전송에 실패했습니다.</Text>
      )}
      {issendtx && answer == true &&(
        <>
          <Text>근로계약이 완료되었습니다.</Text>
          <TouchableOpacity style={styles.buttonStyle} onPress={_handlePressButtonAsync}>
            <Text style={styles.buttonTextStyle}>etherscan</Text>
          </TouchableOpacity>
        </>
      )} 
      {issendtx == null && answer == false &&(
        <Text>근로계약서가 반려되었습니다.</Text>
      )} 
    </View>
  );
}
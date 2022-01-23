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

export default function LaborContractSendScreen({ navigation, route }: RootTabScreenProps<'NotificationModal'>) {

  const [ready, setReady] = useState<boolean>(false);
  const [contractdata, setContractdata] = useState<any[]>([]);
  const [issendtx, setIssendtx] = useState<Boolean | null>(null);
  const [answer, setAnswer] = useState<Boolean | null>(null);

  useEffect(() => {
    getLaborContract();
  }, []);

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  // wallet과 연결함
  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const getLaborContract = async () => {
    setContractdata([
      "2022/01/04 ~ 2022/03/31",
      encodeURI("접대"),
      "03:00 ~ 12:00",
      encodeURI("매주 화요일"),
      "9160",
      encodeURI("매월 10일"),
      encodeURI("없음")
    ]);
    setReady(true);
  }

  const uploadLaborContract = async () => {
    setAnswer(true);

    let abidata = new ethers.utils
    .Interface(["function uploadLaborContract(string [] calldata laborContractItems, address employeeAddress, uint workplaceInfoIndex)"])
    .encodeFunctionData("uploadLaborContract", [contractdata, connector.accounts[0], 1]);
    let txObj = await makeLabortxobj(connector.accounts[0], abidata, 500000);

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

  const setanswer = () => { setAnswer(false); }

  return (
    <View style={styles.container}>
      {!ready && issendtx == null && (
        <>
          <Text style={styles.title}>잠시만 기다려주세요..</Text>
        </>
      )}
      {ready && issendtx == null && answer == null && (
        <>
          <Text style={styles.title}>{contractdata[0]}</Text>
          <Text style={styles.title}>{contractdata[1]}</Text>
          <Text style={styles.title}>{contractdata[2]}</Text>
          <Text style={styles.title}>{contractdata[3]}</Text>
          <Text style={styles.title}>{contractdata[4]}</Text>
          <Text style={styles.title}>{contractdata[5]}</Text>
          <Text style={styles.title}>{contractdata[6]}</Text>
          <Text style={styles.title}>{contractdata[7]}</Text>
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
      {ready && !issendtx && answer &&(
        <Text>트랜잭션 전송에 실패했습니다.</Text>
      )}
      {ready && issendtx && answer &&(
        <Text>근로계약이 완료되었습니다.</Text>
      )} 
      {ready && issendtx == null && answer == false &&(
        <Text>근로계약서가 반려되었습니다.</Text>
      )} 
    </View>
  );
}
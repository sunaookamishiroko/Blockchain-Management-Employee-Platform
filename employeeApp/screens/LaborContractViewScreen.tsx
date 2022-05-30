import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { styles } from "../css/styles";

import { useWalletConnect } from "@walletconnect/react-native-dapp";

import { laborContract } from "../connectETH/Transaction";
import styled from "styled-components/native";

// 내 근무지
export default function LaborContractViewScreen({ route }) {
  const [ready, setReady] = useState<boolean>(false);
  const [contractdata, setContractdata] = useState<object>();

  useEffect(() => {
    getLaborContract();
  }, []);

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  // 근로계약서를 가져옴
  const getLaborContract = async () => {
    // 근무지 정보에서 조회하는 경우
    if (route.params.classify == 0) {
      let result = await laborContract.getLaborContract(
        route.params.index,
        connector.accounts[0],
        { from: connector.accounts[0] }
      );

      setContractdata({
        period: result[1],
        duties: decodeURI(result[2]),
        workingTime: result[3],
        workingDays: decodeURI(result[4]),
        wage: result[5],
        wageday: decodeURI(result[6]),
        comment: decodeURI(result[7]),
      });

      setReady(true);
    }
    // 모든 계약서 조회에서 조회하는 경우
    else {
      let result = await laborContract.getLaborContract2(route.params.index, {
        from: connector.accounts[0],
      });

      setContractdata({
        period: result[1],
        duties: decodeURI(result[2]),
        workingTime: result[3],
        workingDays: decodeURI(result[4]),
        wage: result[5],
        wageday: decodeURI(result[6]),
        comment: decodeURI(result[7]),
      });

      setReady(true);
      setReady(true);
    }
  };

  const StyeldLaborContractViewScreen = styled.View`
    padding: 20px;
  `;

  return (
    <View style={styles.container}>
      {!ready && <Text style={styles.title}>잠시만 기다려주세요..</Text>}
      {ready && (
        <StyeldLaborContractViewScreen>
          <Text style={{ marginBottom: 50 }}>근로계약서</Text>
          <Text>[ 계약 조건 ]</Text>
          <Text>계약 기간 : {contractdata.period}</Text>
          <Text>업무 내용 : {contractdata.duties}</Text>
          <Text>업무 시간 : {contractdata.workingTime}</Text>
          <Text>업무 요일 : {contractdata.workingDays}</Text>
          <Text>시급 : {contractdata.wage} 원</Text>
          <Text>급여 지급일 : {contractdata.wageday}</Text>
          <Text>기타 : {contractdata.comment}</Text>
        </StyeldLaborContractViewScreen>
      )}
    </View>
  );
}

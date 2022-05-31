import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { styles } from "../css/styles";
import { RootTabScreenProps } from "../types";
import * as WebBrowser from "expo-web-browser";

import { useWalletConnect } from "@walletconnect/react-native-dapp";

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";

import { makeLabortxobj } from "../connectETH/Transaction";

import { ENDPOINT } from "@env";

import axios from "axios";
import styled, { css } from "styled-components/native";

// 내 근무지
export default function SendLaborContractScreen({
  navigation,
  route,
}: RootTabScreenProps<"NotificationModal">) {
  const [issendtx, setIssendtx] = useState<Boolean | null>(null);
  const [answer, setAnswer] = useState<Boolean | null>(null);
  const [txhash, setTxhash] = useState<string>();

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  // 근로계약서 컨트랙트에 올리기 위해 트랜잭션 보내기
  const uploadLaborContract = async () => {
    setAnswer(true);

    // 트랜잭션 전송을 위해 근로계약서 배열에 넣기
    const temp = [
      route.params.laborcontract.period,
      route.params.laborcontract.duties,
      route.params.laborcontract.workingtime,
      route.params.laborcontract.workingdays,
      route.params.laborcontract.wage,
      route.params.laborcontract.wageday,
      route.params.laborcontract.comment,
    ];

    // abi data 만든 후 raw transaction 만들기
    const abidata = new ethers.utils.Interface([
      "function uploadLaborContract(string [] calldata laborContractItems, string calldata stday, address employeeAddress, uint wpindex)",
    ]).encodeFunctionData("uploadLaborContract", [
      temp,
      "2022-04-28",
      connector.accounts[0],
      route.params.laborcontract.workplaceindex,
    ]);

    const txObj = await makeLabortxobj(connector.accounts[0], abidata, 1000000);

    try {
      // 트랜잭션 보내기
      await connector.sendTransaction(txObj).then((result) => {
        setTxhash(result);
        console.log(`https://ropsten.etherscan.io/tx/${result}`);
      });

      // db에서 근로계약서 삭제하기
      await deleteLaborContract();
      setIssendtx(true);
    } catch (e) {
      console.error(e);
    }
  };

  // 근로계약서 삭제
  const deleteLaborContract = async () => {
    const body = {
      address: connector.accounts[0],
      workplaceindex: route.params.laborcontract.workplaceindex,
    };
    try {
      await axios.post(`${ENDPOINT}deletecontract`, body);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  // 근로계약서 반려
  const refuseLaborContract = async () => {
    await deleteLaborContract();
    setAnswer(false);
  };

  // 이더스캔 열기
  const etherscan = async () => {
    await WebBrowser.openBrowserAsync(
      `https://ropsten.etherscan.io/tx/${txhash}`
    );
  };

  const StyledContainer = styled.View`
    border-radius: 30;
    background-color: white;
    padding-top: 20;
    padding-left: 10;
    padding-right: 10;
    padding-bottom: 20;
    margin-bottom: 30;
  `;

  const StyledButton = styled.TouchableOpacity`
    background-color: #1c89e9;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20;
    height: 60;
    margin-bottom: 10;
    ${(props) =>
      props.white &&
      css`
        background-color: white;
      `}
  `;

  const StyledButtonText = styled.Text`
    font-size: 20;
    font-weight: bold;
    color: white;

    ${(props) =>
      props.white &&
      css`
        color: #999999;
      `}
  `;

  return (
    <ScrollView
      style={(styles.container, { backgroundColor: "#F1F1F1", padding: 10 })}
    >
      {issendtx === null && answer === null && (
        <>
          <StyledContainer>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              <Text style={{ color: "#1C89E9" }}>
                {route.params.laborcontract.wpname}
              </Text>{" "}
              사장님 으로부터
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              다음의 <Text style={{ color: "#1C89E9" }}>근로 계약서</Text>가
              도착했습니다.
            </Text>
          </StyledContainer>
          <StyledContainer>
            <Text style={styles.title}>근로계약서</Text>
            <Text>지점 : {route.params.laborcontract.wpname}</Text>
            <Text>계약 기간 : {route.params.laborcontract.period}</Text>
            <Text>업무 내용 : {route.params.laborcontract.duties}</Text>
            <Text>근무 시간 : {route.params.laborcontract.workingtime}</Text>
            <Text>근무 요일 : {route.params.laborcontract.workingdays}</Text>
            <Text>시급 : {route.params.laborcontract.wage}</Text>
            <Text>급여 지급일 : {route.params.laborcontract.wageday}</Text>
            <Text>기타 : {route.params.laborcontract.comment}</Text>
          </StyledContainer>

          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#1C89E9",
              marginBottom: 25,
            }}
          >
            계약서에 서명하시겠습니까?
          </Text>

          <View
            style={{
              backgroundColor: "transparent",
              display: "flex",
            }}
          >
            <StyledButton onPress={uploadLaborContract}>
              <StyledButtonText>예</StyledButtonText>
            </StyledButton>
            <StyledButton white onPress={refuseLaborContract}>
              <StyledButtonText white>아니오</StyledButtonText>
            </StyledButton>
          </View>
        </>
      )}
      {issendtx === false && answer === false && (
        <Text>트랜잭션 전송에 실패했습니다.</Text>
      )}
      {issendtx && answer === true && (
        <>
          <Text>근로계약이 완료되었습니다.</Text>
          <TouchableOpacity style={styles.etherscanStyle} onPress={etherscan}>
            <Text style={styles.buttonTextStyle}>etherscan</Text>
          </TouchableOpacity>
        </>
      )}
      {issendtx === null && answer === false && (
        <Text>근로계약서가 반려되었습니다.</Text>
      )}
    </ScrollView>
  );
}

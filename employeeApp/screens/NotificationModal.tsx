import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";

import { RootTabScreenProps } from "../types";
import { styles } from "../css/styles";
import { Text, View } from "../components/Themed";

import { useWalletConnect } from "@walletconnect/react-native-dapp";

import { ENDPOINT } from "@env";

import axios from "axios";
import styled from "styled-components";

// 근로계약서 알림 모달창
export default function NotificationModal({
  navigation,
}: RootTabScreenProps<"NotificationModal">) {
  const [laborcontract, setLaborcontract] = useState<object[]>();
  const [ready, setReady] = useState<boolean | null>(null);

  const connector = useWalletConnect();

  useEffect(() => {
    if (connector.connected) {
      getContract();
    }
  }, []);

  // 근로계약서 요청 가져오기
  const getContract = async () => {
    try {
      const response = await axios.get(
        `${ENDPOINT}contract?address=${connector.accounts[0]}`
      );

      if (response.data.length == 0) {
        setReady(false);
      } else {
        setLaborcontract(response.data);
        setReady(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // jsx 컴포넌트 만들기
  const makeJsx = () => {
    let temp = [];

    for (let x = 0; x < laborcontract.length; x++) {
      temp.push(
        <StyledNotificationItem key={x}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SendLaborContractScreen", {
                laborcontract: laborcontract[x],
              })
            }
          >
            <Text style={{ fontSize: 18 }}>
              {laborcontract[x].wpemployer} 사장님의{" "}
              {laborcontract[x].wpname}에서 근로계약서 확인 요청이
              들어왔습니다!
            </Text>
          </TouchableOpacity>
          <StyledLine />
        </StyledNotificationItem>
      );
    }

    return temp;
  };

  const StyledNotificationItem = styled.View`
    background-color: transparent;
    padding-top: 10;
    padding-bottom: 10;
    padding-left: 10;
    padding-right: 10;
  `;

  const StyledLine = styled.View`
    padding-left: 10;
    padding-right: 10;
    background-color: #f1f1f1;
    height: 2;
    margin-top: 10;
    margin-bottom: 10;
  `;

  return (
    <View style={styles.notificatioonContainer}>
      {!connector.connected && (
        <Text style={styles.buttonTextStyle}>로그인 해주세요</Text>
      )}
      {connector.connected && ready === null && (
        <Text>잠시만 기다려주세요...</Text>
      )}
      {connector.connected && ready === false && (
        <Text>근로계약서 요청이 없습니다!</Text>
      )}
      {connector.connected && ready && <>{makeJsx()}</>}
    </View>
  );
}

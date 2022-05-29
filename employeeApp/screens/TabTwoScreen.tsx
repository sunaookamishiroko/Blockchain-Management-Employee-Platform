import React, { useState, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { styles } from "../css/styles";
import { RootTabScreenProps } from "../types";

import { useWalletConnect } from "@walletconnect/react-native-dapp";

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";

import { laborContract } from "../connectETH/Transaction";
import styled from "styled-components/native";

// 근무지 정보
export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  const [ready, setReady] = useState<boolean | null>(false);
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
  const getWorkplace = async () => {
    let result = await laborContract.getWorkplaces({
      from: connector.accounts[0],
    });

    if (result[0].length === 0) {
      setCallresult(result);
      setReady(null);
    } else {
      let temp = [];

      for (let x = 0; x < result[0].length; x++) {
        temp.push({
          wpindex: ethers.utils.formatUnits(result[0][x], 0),
          wpname: decodeURI(result[1][x]),
          wplocation: decodeURI(result[2][x]),
        });
      }
      setCallresult(temp);
      setReady(true);
    }
  };

  const StyledTabTwoScreen = styled.View`
    background-color: #1c89e9;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-left: 20%;
    padding-right: 20%;
    padding-bottom: 20;
  `;

  const StyledWorkSpaceCard = styled.View`
    width: 380;
    height: 200;
    border-radius: 20;
    background-color: white;
    padding: 20px;
  `;

  const StyledAttendance = styled.TouchableOpacity`
    background-color: #3399ff;
    border-width: 0;
    color: #ffffff;
    border-color: #3399ff;
    height: 50;
    align-items: center;
    border-radius: 30;
    margin-top: 20;
    justify-content: center;
    width: 130;
    margin-right: 20;
    margin-left: 20;

    background-color: ${(props) =>
      props.gray === undefined ? `#3399ff` : `#f1f1f1`};
  `;

  const StyledButtonText = styled.Text`
    font-size: 12;
    font-weight: bold;

    color: ${(props) => (props.gray === undefined ? `#FFFFFF` : `#999999`)};
  `;
  const StyledImage = styled.Image`
    width: 100;
    height: 100;
    margin-right: 20;
  `;

  const StyledRow = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
  `;

  const StyledCol = styled.View`
    display: flex;
    flex-direction: column;
  `;

  // 렌더링 하기 위해 배치작업
  const makeJsx = () => {
    let workplaceInfo = [];

    for (let x = 0; x < callresult.length; x++) {
      workplaceInfo.push(
        <StyledWorkSpaceCard key={x}>
          <StyledRow>
            <StyledImage source={require("../assets/images/cu-icon.png")} />
            <StyledCol>
              <Text>{callresult[x].wpname}</Text>
              <Text style={{ width: 200, fontSize: 8 }}>
                {callresult[x].wplocation}
              </Text>
            </StyledCol>
          </StyledRow>
          <StyledRow style={{ justifyContent: "center" }}>
            <StyledAttendance
              onPress={() =>
                navigation.navigate("CheckAttendancePayScreen", {
                  index: callresult[x].wpindex,
                })
              }
            >
              <StyledButtonText>근태 / 급여</StyledButtonText>
            </StyledAttendance>
            <StyledAttendance
              gray
              onPress={() =>
                navigation.navigate("LaborContractViewScreen", {
                  index: callresult[x].wpindex,
                  classify: 0,
                })
              }
            >
              <StyledButtonText gray>근로계약서</StyledButtonText>
            </StyledAttendance>
          </StyledRow>
        </StyledWorkSpaceCard>
      );
    }
    return workplaceInfo;
  };

  return (
    <StyledTabTwoScreen>
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {connector.connected && ready === false && (
        <>
          <Text>잠시만 기다려주세요...</Text>
        </>
      )}
      {connector.connected && ready === null && (
        <>
          <Text>근무지가 존재하지 않습니다.</Text>
        </>
      )}
      {connector.connected && ready && <>{makeJsx()}</>}
    </StyledTabTwoScreen>
  );
}

import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { styles } from "../css/styles";
import { RootTabScreenProps } from "../types";

import { useWalletConnect } from "@walletconnect/react-native-dapp";

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";

import { laborContract } from "../connectETH/Transaction";
import styled from "styled-components";

// 모든 근로 계약서 정보
export default function LaborContractViewAllScreen({
  navigation,
}: RootTabScreenProps<"LaborContractViewAllScreen">) {
  const [ready, setReady] = useState<boolean | null>(false);
  const [callresult, setCallresult] = useState<object[]>();

  useEffect(() => {
    getAllLaborContract();
  }, []);

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  // 근무지 불러오기
  const getAllLaborContract = async () => {
    let result = await laborContract.getAllLaborContract(
      connector.accounts[0],
      { from: connector.accounts[0] }
    );

    let temp = [];

    if (result.length === 0) {
      setCallresult(temp);
      setReady(null);
    } else {
      for (let x = 0; x < result.length; x++) {
        let contract = await laborContract.getLaborContract2(
          ethers.utils.formatUnits(result[x], 0),
          { from: connector.accounts[0] }
        );
        let wpinfo = await laborContract.getWorkplcesInfo(
          ethers.utils.formatUnits(contract[0], 0),
          { from: connector.accounts[0] }
        );

        temp.push({
          wpname: decodeURI(wpinfo[0]),
          wplocation: decodeURI(wpinfo[1]),
          contractindex: ethers.utils.formatUnits(result[x], 0),
        });
      }

      setCallresult(temp);
      setReady(true);
    }
  };

  // 렌더링 하기 위해 배치작업
  const makeJsx = () => {
    let workplaceInfo = [];

    for (let x = 0; x < callresult.length; x++) {
      workplaceInfo.push(
        <CareerView key={x}>
          <View
            style={{
              backgroundColor: "transparent",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StyledImage source={require("../assets/images/profile.png")} />
            <View style={{ backgroundColor: "transparent" }}>
              <CareerText>{callresult[x].wpname}</CareerText>
              <CareerText>{callresult[x].wplocation}</CareerText>
            </View>
          </View>

          <StyledButton
            onPress={() =>
              navigation.navigate("LaborContractViewScreen", {
                index: callresult[x].contractindex,
                classify: 1,
              })
            }
          >
            <StyledButtonText style={styles.buttonTextStyle}>
              자세히 보기
            </StyledButtonText>
          </StyledButton>
        </CareerView>
      );
    }

    return workplaceInfo;
  };

  const CareerView = styled.View`
    background-color: ${(props) =>
      props.value % 2 == 1 ? "#1C89E9" : "#F1F1F1"};
    border-radius: 30;
    margin-bottom: 3%;
    padding: 4%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const CareerText = styled.Text`
    color: ${(props) => (props.value % 2 == 1 ? "#FFFFFF" : "#000000")};
    font-size: ${(props) => (props.fontSize ? props.fontSize : "12")};
  `;

  const StyledImage = styled.Image`
    width: 60;
    height: 60;
    margin-right: 20;
  `;

  const StyledButton = styled.TouchableOpacity`
    background-color: #1c89e9;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20;
    height: 60;
    ${(props) =>
      props.logout &&
      css`
        background-color: #fc7070;
      `}
  `;

  const StyledButtonText = styled.Text`
    font-size: 20;
    font-weight: bold;
    color: white;
  `;

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
      {connector.connected && ready && <>{makeJsx()}</>}
    </View>
  );
}

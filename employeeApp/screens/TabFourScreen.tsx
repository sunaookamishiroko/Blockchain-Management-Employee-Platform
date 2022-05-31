import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";

import { styles } from "../css/styles";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

import { useWalletConnect } from "@walletconnect/react-native-dapp";

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";

import {
  makeLabortxobj,
  laborContract,
  ERC20Contract,
} from "../connectETH/Transaction";
import styled, { css } from "styled-components";

// 프로필
const shortenAddress = (address: string) => {
  return `${address.slice(0, 10)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
};

export default function TabFourScreen({
  navigation,
}: RootTabScreenProps<"TabFour">) {
  const [personalinfo, setPersonalinfo] = useState<object>();
  const [wpinfo, setWpinfo] = useState<object[]>();
  const [money, setMoney] = useState<number>(0);
  const [ready, setReady] = useState<boolean | null>(false);

  useEffect(() => {
    if (connector.connected) {
      getPersonInformation();
    }
  }, []);

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  // wallet과 연결 종료하기
  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  // 개인정보 불러오기
  const getPersonInformation = async () => {
    let result = await laborContract.getPersonInformation(
      connector.accounts[0],
      { from: connector.accounts[0] }
    );
    let result2 = await ERC20Contract.balanceOf(connector.accounts[0], {
      from: connector.accounts[0],
    });

    let temp = [];

    for (let x = 0; x < result[4][1].length; x++) {
      let result3 = await laborContract.getWorkplcesInfo(
        ethers.utils.formatUnits(result[4][0][x], 0),
        { from: connector.accounts[0] }
      );
      temp.push({
        wpname: decodeURI(result3[0]),
        wplocation: decodeURI(result3[1]),
      });
    }

    if (result[1] === 0) {
      setReady(null);
    } else {
      setPersonalinfo({
        name: decodeURI(result[1]),
        age: ethers.utils.formatUnits(result[2], 0),
        gender: decodeURI(result[3]),
        money: ethers.utils.formatUnits(result2, 0),
        career: result[4],
      });
      setWpinfo(temp);
      setReady(true);
    }
  };

  // 개인정보 업로드
  const uploadPersonalInfo = async () => {
    let abidata = new ethers.utils.Interface([
      "function uploadPersonalInfo(address person, uint8 identiNumber, string calldata name, uint age, string calldata gender)",
    ]).encodeFunctionData("uploadPersonalInfo", [
      connector.accounts[0],
      0,
      encodeURI("이서윤"),
      24,
      encodeURI("남"),
    ]);
    let txObj = await makeLabortxobj(connector.accounts[0], abidata, 100000);

    try {
      await connector.sendTransaction(txObj).then((result) => {
        console.log("tx hash:", result);
        console.log(`https://ropsten.etherscan.io/tx/${result}`);
      });
    } catch (e) {
      console.error(e);
    }
  };

  // 경력 jsx 컴포넌트 만들기
  const makeJsx = () => {
    let workplaceInfo = [];
    for (let x = 0; x < personalinfo.career[0].length; x++) {
      if (personalinfo.career[2][x] === "0") {
        workplaceInfo.push(
          <CareerView key={x} value={x}>
            <StyledImage source={require("../assets/images/cu-icon.png")} />
            <View style={{ display: "flex", backgroundColor: "transparent" }}>
              <CareerText value={x} fontSize={20}>
                {wpinfo[x].wpname}
              </CareerText>
              <CareerText value={x}>
                {personalinfo.career[1][x]} ~ 근무중
              </CareerText>
            </View>
          </CareerView>
        );
      } else {
        workplaceInfo.push(
          <CareerView key={x} value={x}>
            <StyledImage source={require("../assets/images/cu-icon.png")} />
            <View style={{ display: "flex", backgroundColor: "transparent" }}>
              <CareerText value={x} fontSize={20}>
                {wpinfo[x].wpname}
              </CareerText>
              <CareerText value={x}>
                {personalinfo.career[1][x]} ~ {personalinfo.career[2][x]}
              </CareerText>
            </View>
          </CareerView>
        );
      }
    }

    return workplaceInfo;
  };

  const handleSubmit = async () => {
    console.log(money);
  };

  const StyledScreen = styled.ScrollView`
    background-color: white;
    display: flex;
    flex: 1;
    padding-left: 20;
    padding-right: 20;
    padding-top: 20;
    padding-bottom: 20;
  `;

  const StyledImage = styled.Image`
    width: 60;
    height: 60;
    margin-right: 20;
  `;

  const FirstProfileView = styled.View`
    background-color: #f1f1f1;
    border-radius: 30;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4%;
    margin-bottom: 10%;
  `;

  const SecondProfileView = styled.View`
    background-color: #f1f1f1;
    border-radius: 30;
    display: flex;
    flex-direction: column;
    padding: 4%;
    margin-bottom: 10%;
    margin-top: 10%;
  `;

  const CareerView = styled.View`
    background-color: ${(props) =>
      props.value % 2 == 1 ? "#1C89E9" : "#F1F1F1"};
    border-radius: 30;
    margin-bottom: 3%;
    padding: 4%;
    display: flex;
    flex-direction: row;
    align-items: center;
  `;

  const CareerText = styled.Text`
    color: ${(props) => (props.value % 2 == 1 ? "#FFFFFF" : "#000000")};
    font-size: ${(props) => (props.fontSize ? props.fontSize : "12")};
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
    <StyledScreen>
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
          <TouchableOpacity
            onPress={uploadPersonalInfo}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonTextStyle}>개인정보 업로드</Text>
          </TouchableOpacity>
          <Text>개인 정보가 없습니다.</Text>
          <TouchableOpacity onPress={killSession} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
      {connector.connected && ready && (
        <>
          <FirstProfileView>
            <StyledImage source={require("../assets/images/profile.png")} />
            <Text>{personalinfo.name}</Text>
          </FirstProfileView>

          <Text style={{ fontWeight: "bold", fontSize: 18 }}>기본 정보</Text>

          <SecondProfileView>
            <Text>이름 : {personalinfo.name}</Text>
            <Text>Address : {shortenAddress(connector.accounts[0])}</Text>
            <Text>나이 : {personalinfo.age}</Text>
            <Text>성별 : {personalinfo.gender}</Text>
          </SecondProfileView>

          <Text style={{ fontWeight: "bold", fontSize: 18 }}>토큰 교환</Text>

          <SecondProfileView>
            <Text>내 잔액 : {personalinfo.money}</Text>

            <Text>교환할 돈 : {money}원</Text>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              step={1000}
              maximumValue={parseInt(personalinfo.money)}
              onValueChange={(value) => {
                setMoney(value);
              }}
            />
            <StyledButton onPress={handleSubmit}>
              <StyledButtonText fontSize={14}>교환하기</StyledButtonText>
            </StyledButton>
          </SecondProfileView>

          <StyledButton
            onPress={() => navigation.navigate("LaborContractViewAllScreen")}
          >
            <StyledButtonText>근로계약서 모두 보기</StyledButtonText>
          </StyledButton>

          <Text
            style={{ fontWeight: "bold", fontSize: 18, marginVertical: "8%" }}
          >
            경력
          </Text>

          {makeJsx()}

          <StyledButton logout onPress={killSession}>
            <StyledButtonText>Logout</StyledButtonText>
          </StyledButton>
        </>
      )}
    </StyledScreen>
  );
}

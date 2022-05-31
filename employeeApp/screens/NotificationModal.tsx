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
      // TODO 배포 시 주석 해제할 것
      //getContract();

      // TOOD 배포 시 코드 제거할 것
      setReady(true);
    }
  }, []);

  // 근로계약서 요청 가져오기
  const getContract = async () => {
    try {
      const response = await axios.get(
        `${ENDPOINT}getcontract?address=${connector.accounts[0]}`
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

    /*
              <Text style={styles.title}>{route.params.laborcontract.wpname}</Text>
          <Text style={styles.title}>{route.params.laborcontract.period}</Text>
          <Text style={styles.title}>{route.params.laborcontract.duties}</Text>
          <Text style={styles.title}>{route.params.laborcontract.workingtime}</Text>
          <Text style={styles.title}>{route.params.laborcontract.workingdays}</Text>
          <Text style={styles.title}>{route.params.laborcontract.wage}</Text>
          <Text style={styles.title}>{route.params.laborcontract.wageday}</Text>
          <Text style={styles.title}>{route.params.laborcontract.comment}</Text>
    */

    // TODO laborContract 하드코딩 데이터, 배포시 지울 것
    let hardLaborContract = [
      {
        address: "0x8F22cbB2Fe066d8671c9C09bfF005F0507e1627e",
        wpname: "GS25 한국공학대점",
        wpemployer: "홍길동",
        employeename: "이서윤",
        workplaceindex: 1,
        period: "2022-04-28~2022-06-30",
        duties: "서빙 재고정리",
        workingtime: "12:00-19:00",
        workingdays: "목금",
        wage: "9160",
        wageday: "매달 31일",
        comment: "없음",
      },
    ];

    // TODO 배포시 아래와 같이 바꿀 것
    // hardLaborContract -> laborContract
    for (let x = 0; x < hardLaborContract.length; x++) {
      temp.push(
        <StyledNotificationItem key={x}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SendLaborContractScreen", {
                laborcontract: hardLaborContract[x],
              })
            }
          >
            <Text style={{ fontSize: 18 }}>
              {hardLaborContract[x].wpemployer} 사장님의{" "}
              {hardLaborContract[x].wpname}에서 근로계약서 확인 요청이
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

  const StyledNotificationComponent = styled.View``;

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

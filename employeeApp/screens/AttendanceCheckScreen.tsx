import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { Text, View } from '../components/Themed';
import { styles } from '../css/styles';
import { RootTabScreenProps } from '../types';
import { PROVIDER_APIKEY, CONTRACT_ADDRESS1, CONTRACT_ADDRESS2} from "@env";

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { makeLabortxobj, infuraProvider, laborContract } from "../transaction/Transaction";

// 출근 퇴근하기

export default function AttendanceCheckScreen({ navigation, route }: RootTabScreenProps<'AttendanceCheckScreen'>) {
  
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [scandata, setScandata] = useState<any>();

  const [txhash, setTxhash] = useState<any>();
  const [issendtx, setIssendtx] = useState<null | boolean>(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  // 현재 시간과 날짜를 불러옴
  const getTime = () => {
    let time = new Date();

    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();

    let hour = time.getHours();
    let min = time.getMinutes();

    console.log([
      year+"-"+(("0"+month.toString()).slice(-2))+"-"+(("0"+day.toString()).slice(-2)),
      hour,
      min
    ]);

    return([
      year+"-"+(("0"+month.toString()).slice(-2))+"-"+(("0"+day.toString()).slice(-2)),
      hour,
      min
    ]);
  }

  // 출근하기
  const onWork = async () => {

    let timedata = getTime();

    let abidata = new ethers.utils
    .Interface(["function uploadAttendance(uint8 classifyNum, uint workPlaceInfoIndex, string calldata day, int timeHour, int timeMinute)"])
    .encodeFunctionData("uploadAttendance", [0, 0, "2022-01-13", 18, 0]);
    let txObj = await makeLabortxobj(connector.accounts[0], abidata, 200000);

    try {
      await connector.sendTransaction(txObj)
      .then((result) => {
        console.log("tx hash:", result);
        console.log(`https://ropsten.etherscan.io/tx/${result}`)
        setTxhash(result);
        return true;
      });
    } catch (e) {
      console.error(e);
      return false;
    };

  };

  // 퇴근하기
  const offWork = async () => {

    let timedata = getTime();

    let abidata = new ethers.utils
    .Interface(["function uploadAttendance(uint8 classifyNum, uint workPlaceInfoIndex, string calldata day, int timeHour, int timeMinute)"])
    .encodeFunctionData("uploadAttendance", [1, 0, "2022-01-12", 20, 0]);
    let txObj = await makeLabortxobj(connector.accounts[0], abidata, 200000);

    try {
      await connector.sendTransaction(txObj)
      .then((result) => {
        console.log("tx hash:", result);
        console.log(`https://ropsten.etherscan.io/tx/${result}`)
        setTxhash(result);
        return true;
      });
    } catch (e) {
      console.error(e);
      return false;
    };

  };

  // qr코드 스캔 후 출근퇴근에 따라 분류
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setScandata(data);

    let isSuccess;
    
    if ( route.params.num == 0 ) {

      isSuccess = await onWork();
      if (isSuccess) setIssendtx(true);
      else setIssendtx(false);

    } else if ( route.params.num == 1 ) {

      isSuccess = await offWork();
      if (isSuccess) setIssendtx(true);
      else setIssendtx(false);

    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!scanned && (
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        />
      )}
      {scanned && issendtx == null &&(
        <Text style={styles.title}>잠시만 기다려주세요...</Text>
      )}
      {scanned && issendtx == false &&(
        <Text style={styles.title}>트랜잭션 전송에 실패했습니다.</Text>
      )}
      {scanned && route.params.num == 0 && issendtx &&(
        <>
          <Text style={styles.title}>출근 결과창</Text>
          <TouchableOpacity onPress={getTime} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>시간</Text>
          </TouchableOpacity>
          <Text></Text>
          <Text>{scandata}</Text>
          <Text>{txhash}</Text>
          <Text>{route.params.index}</Text>
        </>
      )}
      {scanned && route.params.num == 1 && issendtx &&(
        <>
          <Text style={styles.title}>퇴근 결과창</Text>
          <TouchableOpacity onPress={getTime} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>시간</Text>
          </TouchableOpacity>
          <Text>{scandata}</Text>
          <Text>{txhash}</Text>
          <Text>{route.params.index}</Text>
        </>
      )}
      </View>
  );
}

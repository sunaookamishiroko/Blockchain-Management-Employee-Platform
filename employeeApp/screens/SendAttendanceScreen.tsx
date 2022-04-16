import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { Text, View } from '../components/Themed';
import { styles } from '../css/styles';
import { RootTabScreenProps } from '../types';
import { PROVIDER_APIKEY, CONTRACT_ADDRESS1, CONTRACT_ADDRESS2} from "@env";
import * as WebBrowser from 'expo-web-browser';

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { makeLabortxobj, infuraProvider, laborContract } from "../connectETH/Transaction";

import { ENDPOINT } from "@env";

import axios from "axios";

// 출근 퇴근하기

export default function SendAttendanceScreen({ navigation, route }: RootTabScreenProps<'AttendanceCheckScreen'>) {
  
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [scandata, setScandata] = useState<any>();
  const [isright, setIsrigt] = useState(null);

  const [txhash, setTxhash] = useState<any>();
  const [issendtx, setIssendtx] = useState<null | boolean>(null);

  const [time, setTime] = useState<any[]>([]);

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

    let temp = [
      year+"-"+(("0"+month.toString()).slice(-2))+"-"+(("0"+day.toString()).slice(-2)),
      hour,
      min
    ];

    console.log(temp);
    setTime(temp);

    return (temp);
  }

  // 출/퇴근하기
  const uploadWork = async () => {

    let timedata = getTime();

    let abidata = new ethers.utils
    .Interface(["function uploadAttendance(uint8 classifyNum, uint workPlaceInfoIndex, string calldata day, int timeHour, int timeMinute)"])
    .encodeFunctionData("uploadAttendance", [route.params.num, route.params.index, "2022-04-03", 8, 5]);
    let txObj = await makeLabortxobj(connector.accounts[0], abidata, 200000);

    try {
      await connector.sendTransaction(txObj)
      .then((result) => {
        console.log("tx hash:", result);
        console.log(`https://ropsten.etherscan.io/tx/${result}`)
        setTxhash(result);
        setIssendtx(true);
      });
    } catch (e) {
      console.error(e);
      setIssendtx(false);
    };

  };

  const _handlePressButtonAsync = async () => {
    await WebBrowser.openBrowserAsync(`https://ropsten.etherscan.io/tx/${txhash}`);
  };

  // qr코드 스캔 후 출근퇴근에 따라 분류
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setScandata(data);

    try {
      const response = await axios.get(
        `${ENDPOINT}getqrcode?workplaceindex=${route.params.index}&date=2022-04-16`
      );

      if (response.data[0].randomnum == data) uploadWork();
      else setIsrigt(false);
    } catch(e) {
      console.log(e);
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
      {scanned && isright == false &&(
        <>
          <Text style={styles.title}>해당 QR코드가 근로지의 QR코드와 일치하지 않습니다.</Text>
          <Text>{scandata}</Text>
        </>
      )}
      {scanned && issendtx == null && isright != false &&(
        <Text style={styles.title}>잠시만 기다려주세요...</Text>
      )}
      {scanned && issendtx == false &&(
        <Text style={styles.title}>트랜잭션 전송에 실패했습니다.</Text>
      )}
      {scanned && route.params.num == 0 && issendtx &&(
        <>
          <Text>{time[0]} {time[1]}:{time[2]}</Text>
          <Text style={styles.title}>출근을 완료했습니다.</Text>
          <TouchableOpacity style={styles.buttonStyle} onPress={_handlePressButtonAsync}>
            <Text style={styles.buttonTextStyle}>etherscan</Text>
          </TouchableOpacity>
          <Text>{scandata}</Text>
          <Text>{route.params.index}</Text>
        </>
      )}
      {scanned && route.params.num == 1 && issendtx &&(
        <>
          <Text>{time[0]} {time[1]}:{time[2]}</Text>
          <Text style={styles.title}>퇴근을 완료했습니다.</Text>
          <TouchableOpacity style={styles.buttonStyle} onPress={_handlePressButtonAsync}>
            <Text style={styles.buttonTextStyle}>etherscan</Text>
          </TouchableOpacity>
          <Text>{scandata}</Text>
          <Text>{route.params.index}</Text>
        </>
      )}
      </View>
  );
}

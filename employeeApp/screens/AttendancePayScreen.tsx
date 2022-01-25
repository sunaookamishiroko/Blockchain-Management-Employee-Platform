import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import { Text, View } from '../components/Themed';
import { styles } from '../css/styles';
import { RootTabScreenProps } from '../types';
import { PROVIDER_APIKEY, CONTRACT_ADDRESS1, CONTRACT_ADDRESS2} from "@env";

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { makeLabortxobj, infuraProvider, laborContract } from "../connectETH/Transaction";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

// 근태 / 급여 조회

export default function AttendancePayScreen({ navigation, route }: RootTabScreenProps<'AttendancePayScreen'>) {

  const [ready, setReady] = useState<boolean>(false);
  const [caldata, setCaldata] = useState<any>();
  const [wage, setWage] = useState<any>();

  useEffect(() => {
    getAttendance();
  }, []);

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  // wallet과 연결함
  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  // 출퇴근 날짜 가져오기
  const getAttendance = (async() => {
    let result = await laborContract.getIndexOfEmployee(
      route.params.index, 
      connector.accounts[0], 
      { from : connector.accounts[0] }
    );

    const employeeindex = ethers.utils.formatUnits(result, 0);

    result = await laborContract.getCalAttendance(
      route.params.index, 
      employeeindex, 
      { from : connector.accounts[0] }
    );

    let hourwage = await laborContract.getWage(route.params.index, employeeindex);
    hourwage = parseInt(ethers.utils.formatUnits(hourwage, 0));

    await renderItem(result, employeeindex, hourwage);
    setReady(true);
  })

  // 봉급을 비롯해서 계산하기
  const renderItem = (async (data, employeeindex, hourwage) => {

    console.log(data, employeeindex, hourwage);
    let dates = {};

    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;

    let stringmatch = year+"-"+(("0"+month.toString()).slice(-2));

    let stflag = 0, edflag = 0;
    let startIndex, endIndex;

    for (let x = 0 ; x < data[1].length ; x++) {
      if (data[1][x].search(stringmatch) != -1) {
        if (stflag == 0) {
          startIndex = x;
          stflag = 1;
        }
      } else {
        if (stflag == 0) continue;
        else {
          endIndex = x;
          edflag = 1;
          break;
        }
      }
    }

    if (edflag == 0) endIndex = data[1].length -1;

    console.log(startIndex, endIndex)

    let wage = await laborContract.getPayment(
      route.params.index, employeeindex, startIndex, endIndex, hourwage
    );

    setWage(ethers.utils.formatUnits(wage, 0));

    if (data[0].length == data[1].length) {
      for(let x = 0 ; x < data[0].length ; x++) {
        dates[data[0][x]] = {marked: true, dotColor: 'blue'}
      }
    } else {
      for(let x = 0 ; x < data[0].length - 1; x++) {
        dates[data[0][x]] = {marked: true, dotColor: 'blue'}
      }
      dates[data[0][data[0].length -1]] = {marked: true, dotColor: 'red'}
    }
    
    setCaldata(dates);

  })

  return (
    <View style={styles.container}>
      {!ready && (
        <Text>잠시만 기다려주세요...</Text>
      )}
      {ready && (
        <>
          <Calendar
          style={{
            width: ITEM_WIDTH,
          }}
          markedDates = {caldata}/>
          <Text>이번 달 월급 : {wage}</Text>
        </>
      )}
    </View>
  );
}
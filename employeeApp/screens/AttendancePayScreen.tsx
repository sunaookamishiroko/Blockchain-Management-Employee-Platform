import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';

import { Text, View } from '../components/Themed';
import { styles } from '../css/styles';
import { RootTabScreenProps } from '../types';

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { laborContract } from "../connectETH/Transaction";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

// 근태 / 급여 조회

export default function AttendancePayScreen({ navigation, route }: RootTabScreenProps<'AttendancePayScreen'>) {

  const [calready, setCalready] = useState<null | boolean>(false);
  const [wageready, setWageready] = useState<boolean>(false);

  const [allcaldata, setAllcaldata] = useState<any[]>();
  const [caldata, setCaldata] = useState<any>();
  const [wage, setWage] = useState<string []>([]);
  const [employeeindex, setEmployeeIndex] = useState<string>();

  const [selectdate, setSelectdate] = useState<string>("");


  useEffect(() => {
    renderCal();
  }, []);

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  // 렌더를 위한 계산
  const renderCal = (async () => {

    // yyyy-mm으로 string 만들어 state에 저장
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;

    setSelectdate(year+"-"+(("0"+month.toString()).slice(-2))); 

    let result = await laborContract.getIndexOfEmployee(
      route.params.index, 
      connector.accounts[0], 
      { from : connector.accounts[0] }
    );

    const index = ethers.utils.formatUnits(result, 0);

    result = await laborContract.getCalAttendance(
      route.params.index, 
      index, 
      { from : connector.accounts[0] }
    );
    console.log(result);

    setAllcaldata(result => {
      let dates = {};

    if (result[0].length == result[1].length) {
      for(let x = 0 ; x < result[0].length ; x++) {
        dates[result[0][x]] = {marked: true, dotColor: 'blue'}
      }
    } else {
      for(let x = 0 ; x < result[0].length - 1; x++) {
        dates[result[0][x]] = {marked: true, dotColor: 'blue'}
      }
      dates[result[0][result[1].length]] = {marked: true, dotColor: 'red'}
    }

    setCaldata(dates);
    setCalready(true);
    renderWage(allcaldata, index);
    

    })
  })

  const renderWage = (async(data, employeeindex) => {
    // 월급 설정
    let wagetemp = [];

    
    // 패턴 매칭
    let indexarr = patternMatching(data);
    let startIndex = indexarr[0];
    let endIndex = indexarr[1];

    let hourwage = await laborContract.getWage(route.params.index, employeeindex);
    hourwage = parseInt(ethers.utils.formatUnits(hourwage, 0));

    let wage = await laborContract.getPayment(
      route.params.index, employeeindex, startIndex, endIndex, hourwage
    );

    wagetemp.push(hourwage, ethers.utils.formatUnits(wage, 0));

    setWage(wagetemp);
    setWageready(true);
  })

  // 출퇴근 날짜 가져오기
  const getAttendance = (async() => {

    let result = await laborContract.getIndexOfEmployee(
      route.params.index, 
      connector.accounts[0], 
      { from : connector.accounts[0] }
    );

    const index = ethers.utils.formatUnits(result, 0);

    result = await laborContract.getCalAttendance(
      route.params.index, 
      index, 
      { from : connector.accounts[0] }
    );
    
    setAllcaldata(result);
    setEmployeeIndex(index);
    console.log(allcaldata);
    console.log(employeeindex);
  })

  // 패턴 매칭
  const patternMatching = (data) => {

    let stflag = 0, edflag = 0;
    let startIndex = -1, endIndex = -1;

    for (let x = 0 ; x < data[1].length ; x++) {
      if (data[1][x].search(selectdate) != -1) {
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
          
    return ([startIndex, endIndex]);
  }

  return (
    <View style={styles.container}>
      {!calready && !wageready && (
        <Text>잠시만 기다려주세요...</Text>
      )}
      {calready == null && wageready == null &&(
        <>
          <Text>{selectdate}</Text>
          <Text>선택한 년/월의 데이터가 존재하지않습니다</Text>
        </>
      )}
      {calready && (
        <>
          <Calendar
          style={{
            width: ITEM_WIDTH,
          }}
          onMonthChange={obj => {
            console.log('month changed', obj);
            setSelectdate(obj.year+"-"+(("0"+obj.month.toString()).slice(-2))); 
            setWageready(false);
            renderCal();
          }}
          markedDates = {caldata}/>
          <Text>{selectdate}</Text>
          {!wageready && (
            <Text>월급을 계산중입니다...</Text>
          )}
          {wageready && (
            <>
            <Text>시급 : {wage[0]}</Text>
            <Text>이번 달 월급 : {wage[1]}</Text>
            </>
          )}
        </>
      )}
    </View>
  );
}
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Dimensions, ScrollView } from 'react-native';
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
  const [wageready, setWageready] = useState<null | boolean>(false);

  const [allcaldata, setAllcaldata] = useState<any[]>([]);
  const [caldata, setCaldata] = useState<any>();
  const [wage, setWage] = useState<string []>([]);
  const [stedindex, setStedindex] = useState<any []>([]);

  const [selectdate, setSelectdate] = useState<string>("");

  useEffect(() => {
    renderCal();
  }, []);


  useEffect(() => {
    renderWage();
  }, [allcaldata, selectdate]);

  useEffect(() => {
    makeDateCard();
  }, [selectdate]);

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  // 렌더를 위한 계산
  const renderCal = (async () => {

    // yyyy-mm으로 string 만들어 state에 저장
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1; 

    let result = await laborContract.getIndexOfEmployee(
      route.params.index, 
      connector.accounts[0], 
      { from : connector.accounts[0] }
    );


    const index = ethers.utils.formatUnits(result, 0);

    result = await laborContract.getAllAttendance(
      route.params.index, 
      index, 
      { from : connector.accounts[0] }
    );

    console.log(result);

    if (result[0].length == 0) {
      setCalready(null);
      setWageready(null);
    } else {
      let dates = {};

      if (result[0].length == result[3].length) {
        for(let x = 0 ; x < result[0].length ; x++) {
          dates[result[0][x]] = {marked: true, dotColor: 'blue'}
        }
      } else {
        for(let x = 0 ; x < result[0].length - 1; x++) {
          dates[result[0][x]] = {marked: true, dotColor: 'blue'}
        }
        dates[result[0][result[3].length]] = {marked: true, dotColor: 'red'}
      }

      setAllcaldata(result);
      setSelectdate(year+"-"+(("0"+month.toString()).slice(-2)));

      setCaldata(dates);
      setCalready(true);
    }
  })

  const renderWage = (async() => {

    // 월급 설정
    let wagetemp = [];
    // 패턴 매칭
    let indexarr = await patternMatching(allcaldata);
    
    let startIndex = indexarr[0];
    let endIndex = indexarr[1];

    setStedindex(indexarr);

    if (startIndex != -1) {
      let employeeindex = await laborContract.getIndexOfEmployee(
        route.params.index, 
        connector.accounts[0], 
        { from : connector.accounts[0] }
      );
  
      employeeindex = ethers.utils.formatUnits(employeeindex, 0);
  
      let hourwage = await laborContract.getWage(route.params.index, employeeindex);
      hourwage = parseInt(ethers.utils.formatUnits(hourwage, 0));
  
      let wage = await laborContract.getPayment(
        route.params.index, employeeindex, startIndex, endIndex, hourwage
      );

      let allworktime = await laborContract.getWorkTime(
        route.params.index, employeeindex, startIndex, endIndex
      );
  
      wagetemp.push(
        hourwage, 
        ethers.utils.formatUnits(wage, 0),
        ethers.utils.formatUnits(allworktime[0], 0),
        ethers.utils.formatUnits(allworktime[1], 0)
        );
      
      setWage(wagetemp);
      setWageready(true);
    } else {
      setWageready(null);
    }
  })

  // 패턴 매칭
  const patternMatching = (async(data) => {

    let stflag = 0, edflag = 0;
    let startIndex = -1, endIndex = -1;
    
    for (let x = 0 ; x < data[3].length ; x++) {
      if (data[3][x].search(selectdate) != -1) {
        if (stflag == 0) {
          startIndex = x;
          stflag = 1;
        }
      } else {
        if (stflag == 0) continue;
        else {
          endIndex = x - 1;
          edflag = 1;
          break;
        }
      }
    }

    if (startIndex != -1 && edflag == 0) endIndex = data[3].length -1;
    return ([startIndex, endIndex]);
  })


  const makeDateCard = () => {
    let temp = [];
    
    if (stedindex[0] == -1) {
      return;
    } else {

      let sthour, stmin, edhour, edmin;
      let allhour, allmin;

      for (let x = stedindex[0] ; x <= stedindex[1] ; x++) {

        sthour = ethers.utils.formatUnits(allcaldata[1][x], 0);
        stmin = ethers.utils.formatUnits(allcaldata[2][x], 0);
        edhour = ethers.utils.formatUnits(allcaldata[4][x], 0);
        edmin = ethers.utils.formatUnits(allcaldata[5][x], 0);
        
        allhour = parseInt(edhour) - parseInt(sthour);
        allmin = parseInt(edmin) - parseInt(stmin);

        if (allhour < 0) allhour *= -1
        if (allmin < 0) allmin *= -1

        temp.push(
          <View key={x}>
              <Text>{allcaldata[0][x]} 출근</Text>
              <Text>
                {sthour} : {stmin} ~ {edhour} : {edmin} 총 {allhour}시간 {allmin}분
              </Text>
          </View>
        );
      }
      return temp;

    }

  }

  return (
    <ScrollView>
      <View style={styles.container}>
      {calready == false && wageready == false && (
        <Text>잠시만 기다려주세요...</Text>
      )}
      {calready == null && wageready == null &&(
        <>
          <Text>{selectdate}</Text>
          <Text>출퇴근 데이터가 존재하지 않습니다</Text>
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
            setWageready(false);
            setSelectdate(obj.year+"-"+(("0"+obj.month.toString()).slice(-2))); 
          }}
          markedDates = {caldata}
          onDayPress={day => {
            console.log('selected day', day);
          }}
          
          />
          <View>
            <Text></Text>
          </View>
          <View>
            <Text>{selectdate}</Text>
            {wageready == false && (
              <Text>급여를 계산중입니다...</Text>
            )}
            {wageready == null && (
              <Text>해당 월의 근무시간 데이터가 존재하지 않습니다</Text>
            )}
            {wageready && (
              <>
              <Text>시급 : {wage[0]}</Text>
              <Text>총 {wage[2]}시간 {wage[3]}분 근무</Text>
              <Text>이번 달 급여 : {wage[1]}</Text>
              </>
            )}
          </View>
          {makeDateCard()}
        </>
      )}
    </View>

    </ScrollView>
  );
}
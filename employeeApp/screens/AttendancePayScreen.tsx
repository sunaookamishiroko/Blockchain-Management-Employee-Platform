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
import { makeLabortxobj, infuraProvider, laborContract } from "../transaction/Transaction";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

// 근태 / 급여 조회

export default function AttendancePayScreen({ navigation, route }: RootTabScreenProps<'AttendancePayScreen'>) {

  const [ready, setReady] = useState<boolean>(false);
  const [caldata, setCaldata] = useState<any[]>([]);

  useEffect(() => {
    getAttendance();
  }, []);

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  // wallet과 연결함
  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

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

    setCaldata(result);

  })

  return (
    <View style={styles.container}>
      <Calendar
        style={{
          width: ITEM_WIDTH,
        }}
        markedDates = {{
          '2022-01-01' : {marked: true, dotColor: 'red'},

        }}/>
      <Text style={styles.title}>{caldata[0]}</Text>
      <Text style={styles.title}>{caldata[1]}</Text>
    </View>
  );
}
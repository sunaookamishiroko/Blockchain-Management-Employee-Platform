import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { RootTabScreenProps } from '../types';
import { styles } from '../css/styles';
import { Text, View } from '../components/Themed';

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { makeLabortxobj, infuraProvider, laborContract } from "../connectETH/Transaction";

// 근로계약서 알림 모달창

export default function NotificationModal({ navigation }: RootTabScreenProps<'NotificationModal'>) {
  
  const connector = useWalletConnect();
  
  return (
    <View style={styles.notificatioonContainer}>
      {!connector.connected && (
        <Text style={styles.buttonTextStyle}>로그인 해주세요</Text>
      )}
      {connector.connected && (
        <>
        <TouchableOpacity onPress={() => navigation.navigate('LaborContractSendScreen')}style={styles.notificationBox}>
          <Text style={styles.notificationBoxText}>홍길동 사장님의 롯데리아에서 근로계약서 확인요청이 들어왔습니다!</Text>
        </TouchableOpacity>
        </>
      )}
    </View>
  );
}
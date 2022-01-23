import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { styles } from '../css/styles';
import { RootTabScreenProps } from '../types';
import { PROVIDER_APIKEY, CONTRACT_ADDRESS1, CONTRACT_ADDRESS2} from "@env";

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { makeLabortxobj, infuraProvider, laborContract } from "../transaction/Transaction";

// 내 근무지

export default function LaborContractSendScreen({ route }) {

  const [ready, setReady] = useState<boolean>(false);
  const [contractdata, setContractdata] = useState<any[]>([]);

  useEffect(() => {
    getLaborContract();
  }, []);

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  // wallet과 연결함
  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const getLaborContract = (async() => {
  })

  return (
    <View style={styles.container}>
      {!ready && (
        <>
          <Text style={styles.title}>{route.params.index}</Text>
          <Text style={styles.title}>잠시만 기다려주세요..</Text>
        </>
      )}
      {ready && (
        <>
        </>
      )} 
    </View>
  );
}
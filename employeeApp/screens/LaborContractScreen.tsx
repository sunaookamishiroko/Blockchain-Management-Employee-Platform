import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { PROVIDER_APIKEY, CONTRACT_ADDRESS1, CONTRACT_ADDRESS2} from "@env";

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { makeLabortxobj, infuraProvider, laborContract } from "../transaction/Transaction";

// 내 근무지

export default function LaborContractScreen({ route }) {

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
    let result = await laborContract.getLaborContract(
      route.params.index, 
      connector.accounts[0], 
      { from : connector.accounts[0] }
      );

    console.log(result);
    
    let temp = [];

    temp.push(ethers.utils.formatUnits(result[0], 0))
    temp.push(result[1])
    temp.push(decodeURI(result[2]))
    temp.push(result[3])
    temp.push(decodeURI(result[4]))
    temp.push(result[5])
    temp.push(decodeURI(result[6]))
    temp.push(decodeURI(result[7]))
    
    setContractdata(temp);
    setReady(true);
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
          <Text style={styles.title}>{contractdata[0]}</Text>
          <Text style={styles.title}>{contractdata[1]}</Text>
          <Text style={styles.title}>{contractdata[2]}</Text>
          <Text style={styles.title}>{contractdata[3]}</Text>
          <Text style={styles.title}>{contractdata[4]}</Text>
          <Text style={styles.title}>{contractdata[5]}</Text>
          <Text style={styles.title}>{contractdata[6]}</Text>
          <Text style={styles.title}>{contractdata[7]}</Text>
        </>
      )} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonStyle: {
    backgroundColor: "#3399FF",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#3399FF",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "600",
  },
});

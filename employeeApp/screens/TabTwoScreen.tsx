import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { makeWorkplaceInfoCard } from '../components/WorkplaceInfoCard';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { makeLabortxobj, infuraProvider, laborContract } from "../transaction/Transaction";

// 근무지 정보

export default function TabTwoScreen({navigation} : RootTabScreenProps<'TabTwo'>) {

  const [ready, setReady] = useState<boolean>(false);
  const [callresult, setCallresult] = useState<string[]>([]);
  
  useEffect(() => {
    if (connector.connected) {
      getWorkplace();
    }
  }, []);

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  // wallet과 연결함
  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  // 근무지 불러오기
  const getWorkplace = (async() => {
    let result = await laborContract.getWorkplaces({ from : connector.accounts[0] });
    console.log(result);
    setCallresult(result);
    setReady(true);
  })

  // 렌더링 하기 위해 배치작업
  const makeJsx = (() => {
    let workplaceInfo = [];

    for (let x = 0 ; x < callresult[1].length; x++) {
      workplaceInfo.push(
        <View style={styles.container} key={x}>
            <Text>{ethers.utils.formatUnits(callresult[0][x], 0)}</Text>
            <Text>{decodeURI(callresult[1][x])}</Text>
            <Text>{decodeURI(callresult[2][x])}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('LaborContractScreen', { index : x })}>
                <Text style={styles.buttonTextStyle}>근로계약서</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('AttendancePayScreen', { index : x })}>
                <Text style={styles.buttonTextStyle}>근태 / 급여</Text>
              </TouchableOpacity>
            </View>
        </View>
      );
    }

    return workplaceInfo;
  })

  return (
    <View style={styles.container}>
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {connector.connected && !ready && (
        <>
          <Text>잠시만 기다려주세요...</Text>
        </>
      )}
      {(connector.connected && ready) && (
        <>
          {makeJsx()}
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
  buttonContainer: {
    display: "flex",
    flexDirection: "row"
  }
});


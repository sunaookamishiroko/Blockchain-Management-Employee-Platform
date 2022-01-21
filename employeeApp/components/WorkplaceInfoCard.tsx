import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { makeLabortxobj, infuraProvider, laborContract } from "../transaction/Transaction";

export default async function makeWorkplaceInfoCard({navigation} : RootTabScreenProps<'TabTwo'>) {

    const connector = useWalletConnect();

    let result = await laborContract.getWorkplaces({ from : connector.accounts[0] });
    console.log(result);

    let workplaceInfo = [];

    for (let x = 0 ; x < result[1].length; x++) {
        workplaceInfo.push(
          <View style={styles.container} key={x}>
              <Text>{ethers.utils.formatUnits(result[0][x], 0)}</Text>
              <Text>{decodeURI(result[1][x])}</Text>
              <Text>{decodeURI(result[2][x])}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('LaborContractScreen')}>
                  <Text style={styles.buttonTextStyle}>근로계약서</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('AttendancePayScreen')}>
                  <Text style={styles.buttonTextStyle}>근태 / 급여</Text>
                </TouchableOpacity>
              </View>
          </View>
        );
      }
  
    return workplaceInfo;
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
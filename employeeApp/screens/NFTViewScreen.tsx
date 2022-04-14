import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import { styles } from '../css/styles';
import { RootTabScreenProps } from '../types';
import { PROVIDER_APIKEY, CONTRACT_ADDRESS1, CONTRACT_ADDRESS2} from "@env";

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { makeLabortxobj, infuraProvider, laborContract } from "../connectETH/Transaction";

// 내 근무지

export default function NFTViewScreen({ route }) {

  return (
    <View style={styles.container}>
      <Image 
        source={{uri: route.params.tokeninfo[0].image}}
        style={{width: 250, height: 250}}
      />
      <Text>{route.params.tokeninfo[0].name}</Text>
      <Text>설명 : {route.params.tokeninfo[0].description}</Text>
      <Text>nftindex : {route.params.tokeninfo[0].nftindex}</Text>
      <Text>{decodeURI(route.params.tokeninfo[1][0])}</Text>
      <Text>{decodeURI(route.params.tokeninfo[1][1])}</Text>
    </View>
  );
}
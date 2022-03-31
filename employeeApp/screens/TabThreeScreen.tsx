import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import { styles } from '../css/styles';
import { Text, View } from '../components/Themed';

import axios from "axios";
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { makeLabortxobj, NFTContract, laborContract } from "../connectETH/Transaction";
//import { connectWallet } from "../connectETH/connectWallet";

export default function TabThreeScreen() {

  const [tokeninfo, setTokeninfo] = useState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (connector.connected) {
      getTokens();
    }
  }, []);

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const getTokens = async() => {
    let result = await NFTContract.getAllTokens(connector.accounts[0], { from : connector.accounts[0] });
    console.log(result);
    let temp = [];

    const url = `https://api.pinata.cloud/data/pinList?status=pinned&metadata[keyvalues]={"owner":{"value":"0x8F22cbB2Fe066d8671c9C09bfF005F0507e1627e", "op":"eq"}}`;

    if (result.length == 0) {
      setReady(null);
    } else {
      let res = await axios
      .get(url, {
          headers: {
              pinata_api_key: "",
              pinata_secret_api_key: ""
          }
      })

      for (let x = 0 ; x < res.data.rows.length; x++) {
        let res2 = await axios.get(`https://gateway.pinata.cloud/ipfs/${res.data.rows[x].ipfs_pin_hash}`)
        console.log(res2.data);

        let res3 = await laborContract.getWorkplcesInfo(parseInt(res2.data.wpindex), { from : connector.accounts[0] });
        console.log(res3);
        temp.push([res2.data, res3]);
      }
    }

      setTokeninfo(temp);
      setReady(true);
  }

  // nft jsx 컴포넌트 만들기
  const makeJsx = () => {
    let nfts = [];
    //`${tokeninfo[x].image}`
    for (let x = tokeninfo.length -1 ; x != -1 ; x--) {
      nfts.push(
        <View key={x}>
          <Image 
          source={{uri: ""}}
          style={{width: 100, height: 100}}
          />
          <Text>{decodeURI(tokeninfo[x][1][0])}</Text>
          <Text>{decodeURI(tokeninfo[x][1][1])}</Text>
          <Text>name : {tokeninfo[x][0].name}</Text>
          <Text>description : {tokeninfo[x][0].description}</Text>
          <Text>nftindex : {tokeninfo[x][0].nftindex}</Text>
        </View>
      );
    }
    

    return nfts;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Three</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {connector.connected && ready == false && (
        <>
          <Text>잠시만 기다려주세요...</Text>
        </>
      )}
      {connector.connected && ready == null && (
        <>
          <Text>보유하고 있는 뱃지가 존재하지 않습니다.</Text>
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

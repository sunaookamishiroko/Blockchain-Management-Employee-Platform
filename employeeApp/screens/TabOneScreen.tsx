import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { scrollInterpolator, animatedStyles } from '../utils/animation.js';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { styles } from '../css/styles';
import { PROVIDER_APIKEY, CONTRACT_ADDRESS1, CONTRACT_ADDRESS2} from "@env";

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { makeLabortxobj, infuraProvider, laborContract } from "../transaction/Transaction";

// 내 근무지

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [ready, setReady] = useState<boolean>(false);
  const [cardindex, setCardindex] = useState<number>(0);
  const [carddata, setCarddata] = useState<any[]>([]);
  const [workplaeindex, setWorkplaceindex] = useState<any[]>([]);

  const isCarousel = useRef(null);
  

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
    let temp = [];
    let index = [];

    for (let x = 0 ; x < result[1].length; x++) {
      index.push(ethers.utils.formatUnits(result[0][x], 0));
      temp.push({
        title : decodeURI(result[1][x]),
        text: decodeURI(result[2][x]),
        wage: "1000"
      })
    }
    setWorkplaceindex(index);
    setCarddata(temp);
    setReady(true);
  })

  // 카드 렌더링
  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>{item.title}</Text>
        <Text>{item.text}</Text>
        <Text>{item.wage}</Text>
      </View>
    );
  }

  const uploadPersonalInfo = React.useCallback(async () => {

    let abidata = new ethers.utils
    .Interface(["function uploadPersonalInfo(address person, uint8 identiNumber, string calldata name, uint age, string calldata gender)"])
    .encodeFunctionData("uploadPersonalInfo", [connector.accounts[0], 0, encodeURI("이서윤"), 25, encodeURI("남")]);
    let txObj = await makeLabortxobj(connector.accounts[0], abidata, 100000);

    try {
      await connector.sendTransaction(txObj)
      .then((result) => {
        console.log("tx hash:", result);
        console.log(`https://ropsten.etherscan.io/tx/${result}`)
      });
    } catch (e) {
      console.error(e);
    };

  }, [connector]);

  return (
    <View style={styles.container}>
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {connector.connected && !ready &&(
        <>
          <Text>잠시만 기다려주세요...</Text>
        </>
      )}
      {connector.connected && ready &&(
        <>
          <Carousel
          ref={isCarousel}
          data={carddata} 
          renderItem={(item) => renderItem(item)}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(index) => setCardindex(index)}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}          
          />
          <Text style={styles.counter}>{cardindex}</Text>
          <Text style={styles.counter}>{workplaeindex[cardindex]}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AttendanceCheckScreen', { index : workplaeindex[cardindex], num : 0 })} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>출근</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AttendanceCheckScreen', { index : workplaeindex[cardindex], num : 1 })} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>퇴근</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={uploadPersonalInfo} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>개인정보 업로드</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
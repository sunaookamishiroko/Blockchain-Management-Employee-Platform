import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { scrollInterpolator, animatedStyles } from '../utils/animation.js';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { styles } from '../css/styles';

import { useWalletConnect } from '@walletconnect/react-native-dapp';

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
//import { connectWallet } from "../connectETH/connectWallet";
import { makeLabortxobj, laborContract } from "../connectETH/Transaction";

// 내 근무지

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [ready, setReady] = useState(false);
  const [cardindex, setCardindex] = useState<number>(0);
  const [carddata, setCarddata] = useState<any[]>([]);
  const [workplaeindex, setWorkplaceindex] = useState<any[]>([]);

  const isCarousel = useRef(null);

  useEffect(() => {
    if (connector.connected) {
      getCardinfo();
    }
  }, []);

  // walletconnect 세션을 저장하는 hook
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

   // 근무지 불러오기
  const getCardinfo = (async() => {

    let result = await laborContract.getWorkplaces({ from : connector.accounts[0] });
    console.log(result);

    let temp = [];
    let index = [];

    if (result[1].length == 0) {
      setWorkplaceindex(index);
      setCarddata(temp);
      setReady(null);
    } else {
      for (let x = 0 ; x < result[1].length; x++) {
        index.push(ethers.utils.formatUnits(result[0][x], 0));
        temp.push({
          title : decodeURI(result[1][x]),
          text: decodeURI(result[2][x])
        })
      }
      setWorkplaceindex(index);
      setCarddata(temp);
      setReady(true);
    }
    
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


  return (
    <View style={styles.container}>
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {connector.connected && ready == false &&(
        <>
          <Text>잠시만 기다려주세요...</Text>
        </>
      )}
      {connector.connected && ready == null &&(
        <>
          <Text>근무지가 존재하지 않습니다.</Text>
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
          <Text style={styles.counter}>{carddata[cardindex].title}</Text>
          <Text style={styles.counter}>{workplaeindex[cardindex]}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AttendanceCheckScreen', { index : workplaeindex[cardindex], num : 0 })} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>출근</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AttendanceCheckScreen', { index : workplaeindex[cardindex], num : 1 })} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>퇴근</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
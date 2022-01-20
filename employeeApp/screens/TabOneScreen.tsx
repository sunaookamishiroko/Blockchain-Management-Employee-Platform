import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { scrollInterpolator, animatedStyles } from '../utils/animation.js';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
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
  const [callresult, setCallresult] = useState<string[]>([]);
  const [activeindex, setActiveindex] = useState<number>(0);

  const isCarousel = useRef(null);
  
  const DATA = [
    {
        title:"Item 1",
        text: "Text 1",
    },
    {
        title:"Item 2",
        text: "Text 2",
    },
    {
        title:"Item 3",
        text: "Text 3",
    },
    {
        title:"Item 4",
        text: "Text 4",
    },
    {
        title:"Item 5",
        text: "Text 5",
    },
  ];


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

  // 출근하기
  const onWork = React.useCallback(async () => {

    let abidata = new ethers.utils
    .Interface(["function uploadAttendance(uint8 classifyNum, uint workPlaceInfoIndex, string calldata day, int timeHour, int timeMinute)"])
    .encodeFunctionData("uploadAttendance", [0, 0, "2022/01/11", 18, 0]);
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
  
  // 퇴근하기
  const OffWork = React.useCallback(async () => {

    let abidata = new ethers.utils
    .Interface(["function uploadAttendance(uint8 classifyNum, uint workPlaceInfoIndex, string calldata day, int timeHour, int timeMinute)"])
    .encodeFunctionData("uploadAttendance", [1, 0, "2022/01/11", 20, 0]);
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

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>{item.title}</Text>
        <Text>{item.text}</Text>
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
      {!!connector.connected && (
        <>
          <Carousel
          ref={isCarousel}
          data={DATA} 
          renderItem={(item) => renderItem(item)}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(index) => setActiveindex(index)}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}          
          />
          <Text style={styles.counter}
        >
          {activeindex}
        </Text>
          <TouchableOpacity onPress={onWork} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>출근</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={OffWork} style={styles.buttonStyle}>
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
  carouselContainer: {
    marginTop: 50
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue'
  },
  itemLabel: {
    color: 'white',
    fontSize: 24
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

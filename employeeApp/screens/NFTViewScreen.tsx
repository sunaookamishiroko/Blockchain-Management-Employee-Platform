import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import { styles } from '../css/styles';

// NFT 자세히 보기
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
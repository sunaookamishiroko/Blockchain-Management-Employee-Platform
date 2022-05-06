import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import { styles } from '../css/styles';

// NFT 자세히 보기
export default function NFTViewScreen({ route }) {

  return (
    <View style={styles.container}>
      <Image 
        source={{uri: route.params.tokeninfo.metadata.image}}
        style={{width: 250, height: 250}}
      />
      <Text>{route.params.tokeninfo.metadata.name}</Text>
      <Text>설명 : {route.params.tokeninfo.metadata.description}</Text>
      <Text>nftindex : {route.params.tokeninfo.metadata.nftindex}</Text>
      <Text>{route.params.tokeninfo.wpinfo.wpname}</Text>
      <Text>{route.params.tokeninfo.wpinfo.wplocation}</Text>
    </View>
  );
}
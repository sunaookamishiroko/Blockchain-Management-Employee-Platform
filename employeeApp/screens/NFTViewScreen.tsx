import React from "react";
import { Image } from "react-native";

import { Text, View } from "../components/Themed";
import { styles } from "../css/styles";

// NFT 자세히 보기
export default function NFTViewScreen({ route }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: route.params.tokeninfo.metadata.image }}
        style={{
          width: 250,
          height: 250,
          resizeMode: "contain",
          marginBottom: 40,
        }}
      />
      <View style={{}}>
        <Text>NFT#{route.params.tokeninfo.metadata.nftindex} : {route.params.tokeninfo.metadata.name}</Text>
        <Text>설명 : {route.params.tokeninfo.metadata.description}</Text>
        <Text>발급 지점 : {route.params.tokeninfo.wpinfo.wpname}</Text>
        <Text>지점 주소 : {route.params.tokeninfo.wpinfo.wplocation}</Text>
      </View>
    </View>
  );
}

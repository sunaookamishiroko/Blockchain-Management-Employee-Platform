import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

import { styles } from "../css/styles";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

import axios from "axios";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

import { NFTContract, laborContract } from "../connectETH/Transaction";

import { PINATA_APIKEY, PANATA_SECRET_APIKEY } from "@env";
import styled from "styled-components/native";

// NFT 조회 화면
export default function TabThreeScreen({
  navigation,
}: RootTabScreenProps<"TabThree">) {
  const [tokeninfo, setTokeninfo] = useState<object>();
  const [ready, setReady] = useState<boolean | null>(false);

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

  // nft 토큰 가져오는 함수
  const getTokens = async () => {
    let alltokens = await NFTContract.getAllTokens(connector.accounts[0], {
      from: connector.accounts[0],
    });
    let temp = [];

    // const url = `https://api.pinata.cloud/data/pinList?status=pinned&metadata[keyvalues]={"owner":{"value":"${connector.accounts[0]}", "op":"eq"}}`;
    const url = `https://api.pinata.cloud/data/pinList?status=pinned&metadata[keyvalues]={"owner":{"value":"0x8F22cbB2Fe066d8671c9C09bfF005F0507e1627e", "op":"eq"}}`;

    if (alltokens.length === 0) {
      setReady(null);
    } else {
      const tokendata = await axios.get(url, {
        headers: {
          pinata_api_key: PINATA_APIKEY,
          pinata_secret_api_key: PANATA_SECRET_APIKEY,
        },
      });
      console.log(tokendata);
      for (let x = 0; x < tokendata.data.rows.length; x++) {
        let detaildata = await axios.get(
          `https://gateway.pinata.cloud/ipfs/${tokendata.data.rows[x].ipfs_pin_hash}`
        );
        let wpinfo = await laborContract.getWorkplcesInfo(
          parseInt(detaildata.data.wpindex),
          { from: connector.accounts[0] }
        );

        temp.push({
          metadata: detaildata.data,
          wpinfo: {
            wpname: decodeURI(wpinfo[0]),
            wplocation: decodeURI(wpinfo[1]),
          },
        });
      }
      setTokeninfo(temp);
      setReady(true);
    }
  };

  // nft jsx 컴포넌트 만들기
  const makeJsx = () => {
    let nfts = [];
    for (let x = tokeninfo.length - 1; x != -1; x--) {
      nfts.push(
        <BadgeView
          key={x}
          onPress={() =>
            navigation.navigate("NFTViewScreen", { tokeninfo: tokeninfo[x] })
          }
        >
          <Image
            source={{ uri: tokeninfo[x].metadata.image }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </BadgeView>
      );
    }

    return nfts;
  };

  const BadgeView = styled.TouchableOpacity`
    background-color: #f1f1f1;
    width: 150;
    height: 150;
    border-radius: 30;
    margin-bottom: 20;
    overflow: hidden;
  `;

  const BadgeContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
  `;

  return (
    <View style={styles.container}>
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {connector.connected && ready === false && (
        <>
          <Text>잠시만 기다려주세요...</Text>
        </>
      )}
      {connector.connected && ready === null && (
        <>
          <Text>NFT 뱃지가 존재하지 않습니다.</Text>
        </>
      )}
      {connector.connected && ready && (
        <BadgeContainer>{makeJsx()}</BadgeContainer>
      )}
    </View>
  );
}

# WalletConnect Example on Expo

This is a simple example how to get `WalletConnect` up and running with `Expo` for React Native.

## `WalletConnect`'s dependency on Node's `crypto` package

`WalletConnect` uses node's built-in crypto package which is not available on iOS or Android.
In order to work around this we can use `metro.config.js` to create aliases for different packages, this idea is from [here](https://learn.figment.io/tutorials/how-to-successfully-connect-to-a-celo-wallet-with-a-react-native-dapp).
This will allow us to use `WalletConnect` directly from the `expo` client without having to eject the application.

## Getting Started

Please go ahead and install the packages via `yarn install`, then, run `yarn start` or `expo start`.
Once the build is complete and opened in the `Expo Go` app, connect your wallet by pressing the `Connect a wallet` button.

![alt text](./assets/gifs/walletconnect-expo-demo.gif)

## 추가 사항

현재 expo 버그가 있어서 안드로이드에서의 walletconnect가 비정상적으로 동작합니다.
yarn install 후에 다음 조치를 따라주세요
node_modules/@walletconnect/react-native-dapp/dist/providers/WalletConnectProvider.js
에서

![alt text](./assets/images/readme_codeexample.png)

위와 같이 해당 부분을 주석처리 해주시면 정상 동작합니다.
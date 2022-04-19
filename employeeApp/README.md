## 시작하기

`yarn install`로 라이브러리 설치 후, `yarn start`이나 `expo start`를 통해 실행합니다.

## 추가 사항

현재 expo 버그가 있어서 안드로이드에서의 walletconnect가 비정상적으로 동작합니다.
yarn install 후에 다음 조치를 따라주세요
node_modules/@walletconnect/react-native-dapp/dist/providers/WalletConnectProvider.js
에서

![alt text](./assets/images/readme_codeexample.png)

위와 같이 해당 부분을 주석처리 해주시면 정상 동작합니다.


## env 관련

.env 파일에 해당하는 값을 넣어주면 됩니다.
git에 올리지 않도록 주의해주세요

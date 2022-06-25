## 시작하기

1. `yarn install`로 라이브러리를 설치합니다
2. `employeeApp/contracts/` 경로에 컨트랙트 ABI 파일을 넣습니다. -> ERC20, LaborContract, myNFT, WonToken
3. env 파일을 설정합니다.
4. `yarn start`이나 `expo start`를 통해 실행합니다.

## 추가 사항

만약 안드로이드에서의 walletconnect가 비정상적으로 동작한다면

`yarn install` 후에 다음 조치를 따라주세요.

`node_modules/@walletconnect/react-native-dapp/dist/providers/WalletConnectProvider.js`에서

![alt text](./assets/images/readme_codeexample.png)

위와 같이 해당 부분을 주석처리 해주시면 정상 동작합니다.

+ 2022/04/30 추가

안드로이드 11 이상에서 발생하는 오류라고 합니다.

해결방법은 

https://stackoverflow.com/questions/64699801/linking-canopenurl-returning-false-when-targeting-android-30-sdk-on-react-native

AndroidManifest.xml에서 컨픽추가 해주면 된다고 합니다.

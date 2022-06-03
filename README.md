# 🏢 Blockchain-Management-Employee-Platform
한국공학대학교 졸업작품 스마트 컨트랙트를 활용한 근로자 통합관리 플랫폼

## Description

알바생과 사장님들의 분쟁 해결과 데이터에 대한 신뢰성 향상을 목적으로 만들어진 이더리움 스마트 컨트랙트를 활용한 근로자 통합관리 플랫폼입니다. 

이 플랫폼은 고용주가 사용할 수 있는 Web과 근로자가 사용할 수 있는 App이 존재하며 다음과 같은 기능을 제공합니다.

- 스마트 컨트랙트를 이용한 근로계약서 저장&조회
- QR코드와 스마트 컨트랙트를 이용한 출/퇴근 기록
- ERC20 토큰을 이용한 급여 지급 기능 (이더리움 <-> 토큰 환전 가능)
- 일에 대한 보상으로 ERC721을 이용한 NFT 보상 뱃지 기능 (장기 근로, 친절, 개근)

## Architecture

<img src="/images/Architecture.png">

## More Descripton...

각 애플리케이션의 스크린샷과 구동 방법은 아래를 참조해주세요.

- [사업주 Web](https://github.com/somewheregreeny/Blockchain-Management-Employee-Platform/blob/main/employerWeb)

- [근로자 App](https://github.com/somewheregreeny/Blockchain-Management-Employee-Platform/blob/main/employeeApp)

- [DB Backend](https://github.com/somewheregreeny/Blockchain-Management-Employee-Platform/tree/main/capstonedb)

- [SmartContract](https://github.com/somewheregreeny/Blockchain-Management-Employee-Platform/tree/main/employerWeb/contracts)

## Tech Stack

|분류|기술
|---|-----|
|FrontEnd|<img src="https://img.shields.io/badge/React&React--Native-61DAFB?style=flat&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/Expo-000?style=flat&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Web3.js-F16822?style=flat&logo=Web3.js&logoColor=black"> <img src="https://img.shields.io/badge/Ethers.js-2535a0?style=flat&logo=Solidity&logoColor=white">|
|BackEnd|<img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat&logo=Amazon AWS&logoColor=white"> <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white">|
|BlockChain|<img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=flat&logo=Ethereum&logoColor=white"> <img src="https://img.shields.io/badge/Solidity-363636?style=flat&logo=Solidity&logoColor=white">|

## Members

|이름|학과|역할|
|------|---|-----|
|이서윤|컴퓨터공학과|Web, App Blcokchain 연결, DB, Blockchain, Smart Contract 작성|
|표민성|소프트웨어공학과|계획서/보고서 작성, 디자인, Smart Contract 작성|
|박태민|소프트웨어공학과|DB, Smart Contract 작성|
|김동현|소프트웨어공학과|Web, App Front 담당|

## Git Convention

### Process

* 각자 맡은 대로 브랜치를 따서 작업합니다.

* 브랜치 이름은 (Front/Back)/(기능명) 으로 작성해주시기 바랍니다.
  * ex) Back/add-new-contract Front/add-login-page

* 본인의 작업이 완료되면 main 브랜치로 pull request를 작성합니다.

* 후에 팀원들의 코드 리뷰를 받고 merge합니다.

### Issues

* 이상한 버그나 의문점이 생긴 경우 자세하게 Issues에 작성합니다.

* 그 후 카톡 또는 디스코드에서 팀원들에게 알립니다.

### Commit message

* 기본적인 git convention을 준수합니다.

* 또한 employeeApp = eA / employerWeb = eW로 줄여 작성합니다.


1. Feat : 새로운 기능 추가


```
Feat : 근로계약서 컨트랙트 작성
```


2. Fix : 버그 수정

* 이슈에 관한 버그 수정이라면 뒤에 이슈번호도 붙여줍니다.


```
Fix : 값이 컨트랙트에 들어가지 않는 버그 수정 #2
```


3. Docs : 문서 수정


```
Docs : readme에 멤버구성 추가 
```


4. Refactor : 코드 리팩토링


```
Refactor : 근로계약서 전송하는 로직 효율적으로 변경
```

* body에는 긴 설명이 필요하다고 생각할 때 작성해줍니다. 필요없다고 생각하면 작성하지 않아도 됩니다.

* 양식은 자유이지만 어떤 행동을 왜 했는지를 기본 토대로 작성해주시길 바랍니다.

### Comment

* 자신이 만든 함수가 어떠한 역할을 하는지 주석으로 남겨주시기 바랍니다.

* 다른 사람이 보았을 때 의문점이 많이 생기지 않도록 직관적이게 부탁드립니다.

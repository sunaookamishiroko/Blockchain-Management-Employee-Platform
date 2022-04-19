# 🏢 Blockchain-Management-Employee-Platform
한국공학대학교 졸업작품 스마트 컨트랙트를 활용한 근로자 통합관리 플랫폼

## Description

```
TODO
```

## Architecture

```
TODO
```

## More Descripton...

- [사업주 Web](https://github.com/somewheregreeny/Blockchain-Management-Employee-Platform/blob/main/employerWeb/README.md)

- [근로자 App](https://github.com/somewheregreeny/Blockchain-Management-Employee-Platform/blob/main/employeeApp/README.md)

- [Backend](https://github.com/somewheregreeny/Blockchain-Management-Employee-Platform/blob/main/capstone-database-backend/README.md)

- [SmartContract](https://github.com/somewheregreeny/Blockchain-Management-Employee-Platform/tree/main/employerWeb/contracts)

## Members

|이름|학과|역할|
|------|---|---|
|이서윤|컴퓨터공학과|Web/App 총괄, DB Backend, Blockchain, 컨트랙트 작성|
|표민성|소프트웨어공학과|계획서/보고서 작성, 디자인, 컨트랙트 작성|
|박태민|소프트웨어공학과|컨트랙트 작성|
|김동현|소프트웨어공학과|Web Front 담당, 디자인|

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

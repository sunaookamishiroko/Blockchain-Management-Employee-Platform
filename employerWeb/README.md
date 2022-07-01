# **employerWeb**

## 시작하기
- node.js의 설치가 필요합니다.

1. `employerWeb/contracts` 폴더에 존재하는 컨트랙트들의 컴파일이 필요합니다. remix 또는 truffle을 이용해주세요. 또는 테스트하기 위해 ganache도 이용가능합니다.
2. `LaborContract.sol, WonToken.sol, myNFT.sol`을 컴파일 후 배포합니다.
3. `LaborContract.json, WonToken.json, myNFT.json, ERC20.json` 4개의 ABI 파일에 다음 `networks` 항목이 없다면 추가합니다. 배포한 contract의 address와 txhash를 추가하면 됩니다. ERC20의 address는 WonToken contract의 `geterc20address()` 함수를 통해 알아낼 수 있습니다.

-> remix로 배포했다면 무조건 존재하지 않으므로 추가합니다.

-> truffle을 이용했다면 존재합니다.

```
{
	"deploy": {
		"VM:-": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"main:1": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"ropsten:3": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"rinkeby:4": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"kovan:42": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"görli:5": {
			"linkReferences": {},
			"autoDeployLib": true
		},
		"Custom": {
			"linkReferences": {},
			"autoDeployLib": true
		}
	},
	"networks": {
		"3": {
		  "events": {},
		  "links": {},
		  "address": "0xffffffffffffffffffffffffffffffffffffffff",
		  "transactionHash": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
		}
	},
  ......
```
4. 4개의 ABI 파일을 `employerWeb/client/src/contractABI`폴더에 넣어주세요.
5. `employerWeb/client/src/envSetting.js`에서 알맞은 환경 변수를 넣어주세요.
6. `npm install`을 실행하여 라이브러리 설치후 `npm start`를 통해 웹을 실행합니다.

## Screenshot

### 1. 출/퇴근 현황

<img src="/images/web/1-noqr.png">
<img src="/images/web/1.png">

- 근로자들의 출/퇴근 현황을 달력에서 확인할 수 있습니다.
- 당일 날짜에 랜덤한 숫자로 이루어진 QR코드를 생성할 수 있습니다. 해당 값은 DB에 저장됩니다.
- 근로자들은 QR코드를 이용해 출/퇴근을 등록합니다.

### 2. 근로자 관리 
<img src="/images/web/2.png">
<img src="/images/web/2-another.png">

- 근로자들을 관리할 수 있습니다.
- 근로자의 입사일, 근무일수, 마지막 근무일, 지각률을 확인할 수 있습니다.

### 2-1. 근로자 근로계약서 확인
<img src="/images/web/2-contract.png">

- 근로계약서 조회 버튼을 통해 해당 근로자의 근로계약서를 조회할 수 있습니다.

### 2-2. 근로자 NFT 보상 뱃지 증정
<img src="/images/web/2-badge.png">

- 보상 지급 버튼을 통해 해당 근로자에게 NFT 뱃지를 지급할 수 있습니다.
- 해당 뱃지는 다른 고용주에게 자신을 어필할 수 있는 수단이 될 수 있습니다.
- 장기근속, 친절, 개근 중에 선택할 수 있으며 추가로 코멘트를 달 수 있습니다.
- NFT metadata 저장은 pinata를 이용합니다.

### 2-3. 근로자 계약 해지
<img src="/images/web/2-delete.png">

- 해당 근로자의 합의를 통해 근로 계약을 해지할 수 있습니다.

### 3. 근로자 등록
<img src="/images/web/3.png">

- 해당 근로자와 구두 합의를 통해 이야기한 임시 근로계약서를 작성할 수 있습니다.
- 계약서 작성 요청 버튼을 누르면 DB에 해당 임시 근로 계약서가 저장되고 근로자는 해당 사항을 앱에서 확인할 수 있습니다.
- 근로자가 계약서를 확인하고 이상이 없다면 이더리움에 업로드하게 됩니다.

### 4. 급여 지급
<img src="/images/web/4.png">

- 근로자들의 급여를 토큰으로 지급할 수 있습니다.
- 정산하기 버튼을 통해 자세한 내용을 확인할 수 있습니다.
- 토큰은 금액을 적고 교환하기 버튼을 눌러 교환할 수 있습니다.

### 4-1. 정산하기
<img src="/images/web/4-calculate.png">

- 해당 근로자의 정산하기 버튼을 통해 자세한 내역을 확인할 수 있습니다.
- 출근 날짜, 총 근무 시간, 시급을 확인할 수 있습니다.

### 4-2. 토큰 교환
<img src="/images/web/4-tokenchange.png">

- 사장님은 가지고 있는 이더와 토큰을 1,000,000 : 1 eth 의 비율로 교환할 수 있습니다. (컨트랙트 설정)

### 4-3. 토큰 보내기
<img src="/images/web/4-sendtoken.png">

- 지급하기 버튼을 통해 총 급여에 해당하는 토큰을 근로자에게 보낼 수 있습니다.

### 5. 사업장 추가
<img src="/images/web/5.png">

- 사업장의 이름과 주소를 입력하여 사업장을 새로 추가할 수 있습니다.

### 6. 사업장 변경
<img src="/images/web/6.png">

- 사장님이 가진 사업장들이 버튼으로 나타나며 클릭하면 해당 사업장으로 교체할 수 있습니다.
- 이미지는 임시 이미지이며 등록한 사업장 순서대로 정렬됩니다.

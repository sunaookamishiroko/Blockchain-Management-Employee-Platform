# solidity function description

- solidity를 이용해 작성한 contract에 대해 기술합니다.

## **LaborContract.sol**

### 조회 함수 (public view)

`function getPersonInformation (address person) public view returns (personalInfo memory)`

- 사람의 개인 정보를 조회합니다.
- Input / Output
  - 인자로 조회하고 싶은 사람의 address가 필요합니다.
  - personalInfo 구조체를 return합니다. (identiNumber, name, age, gender)

`function getEmployeeInfo (uint wpindex) public view returns (address [] memory, string [] memory) `

- 고용주가 선택한 사업장 근로자 정보들을 가져옵니다.
- 정보에는 근로자들의 address와 이름이 존재합니다.
- Input / Output
  - 인자로 선택한 사업장의 index가 필요합니다.
  - 차례대로 근로자들의 address 배열, name 배열을 return합니다.

`function getIndexOfEmployee (uint wpindex, address employeeAddress) public view returns (uint)`

- 근로자가 자신이 선택한 근무지에서의 index를 가져옵니다.
- Input / Output
  - 인자로 근무지의 index, 근로자의 address가 필요합니다.
  - 근로자의 index를 return합니다.

`function getWorkplaces () public view returns (uint [] memory, string [] memory, string [] memory)`

- 고용주의 사업장들 또는 근로자의 근무지들을 조회하는 함수입니다.
- 고용주와 근로자는 msg.sender와 등록된 identiNumber를 기준으로 구분합니다.
- Input / Output
  - 인자로 아무것도 필요하지 않습니다.
  - 차례대로 사업장/근무지들의 index 배열, name 배열, location 배열을 return합니다.
 
`function getLaborContract (uint workplaceInfoIndex, address employeeAddress) public view returns(laborContract memory)`

- 고용주가 선택한 근로자 또는 근로자가 선택한 근무지의 근로계약서를 조회하는 함수입니다.
- 고용주와 근로자는 msg.sender와 등록된 identiNumber를 기준으로 구분합니다.
- Input / Output
  - 인자로 사업장/근무지의 index, 근로자의 address가 필요합니다.
  - laborContract 구조체를 return합니다. (peroid, duties, workingTime, workingDays, wage, wageday, comment)

`function getWorkplcesInfo (uint wpindex) public view returns (string memory, string memory)`

- 선택한 사업장의 index에 대한 정보를 조회하는 함수입니다.
- Input / Output
  - 인자로 사업장 index가 필요합니다.
  - 사업장의 이름, 주소(위치)를 return합니다.

`function getLaborContract2 (uint lbindex) public view returns (laborContract memory)`

- 근로계약서의 index를 바탕으로 근로계약서를 조회하는 함수입니다.
- Input / Output
  - 인자로 근로계약서의 index가 필요합니다.
  - 해당하는 근로계약서 구조체를 return합니다.

`function getAllLaborContract (address employeeAddress) public view returns(uint [] memory)`

- 해당하는 근로자가 가진 모든 근로계약서의 index를 조회하는 함수입니다.
- Input / Output
  - 인자로 근로자의 address가 필요합니다.
  - 해당하는 근로계약서의 index가 모두 담긴 배열을 return합니다.

`function getWage (uint wpindex, uint employeeIndex) public view returns (string memory)`

- 고용주가 선택한 근로자 또는 근로자가 선택한 근무지에서의 시급을 조회하는 함수입니다.
- Input / Output
  - 인자로 사업장/근무지의 index, 근로자의 근무지에서의 index가 필요합니다. 
  - 시급을 string 형태로 return합니다.

`function getCalAttendance (uint wpindex, uint employeeIndex) public view returns (string [] memory, string [] memory)`

- 고용주가 선택한 근로자 또는 근로자가 선택한 근무지의 출근, 퇴근 날짜만 조회하는 함수입니다.
- Input / Output
  - 인자로 사업장/근무지의 index, 근로자의 근무지에서의 index가 필요합니다. 
  - 차례대로 startDay 배열, endDay 배열을 return합니다.

`function getAllAttendance (uint wpindex, uint employeeIndex) public view returns (attendance memory)`

- 고용주가 선택한 근로자 또는 근로자가 선택한 근무지의 자세한 출퇴근 내역을 조회하는 함수입니다.
- Input / Output
  - 인자로 사업장/근무지의 index, 근로자의 근무지에서의 index가 필요합니다. 
  - attendance 구조체를 return합니다. (startDay, startTimeHour, startTimeMinute, endDay, endTimeHout, endTimeMinute)

`function getWorkTime (uint wpindex, uint employeeIndex, uint startIndex, uint endIndex) public view returns (int, int)`

- 근로자가 하나의 월에 일한 시간을 조회하는 함수입니다.
- 웹, 앱 단에서 getCalAttendance를 이용해서 string 패턴 매칭 작업을 통해 해당 월의 인덱스 번호만 골라내서 이 함수를 사용합니다.
- Input / Output
  - 인자로 사업장/근무지의 index, 근로자의 근무지에서의 index, 해당하는 월의 시작 index, 끝 index가 필요합니다. 
  - 차례대로 시간, 분을 return합니다.

`function getPayment (uint wpindex, uint employeeIndex, uint startIndex, uint endIndex, int wage) public view returns (int)`

- 근로자의 월급을 계산하고 조회하는 함수입니다.
- wage는 프론트에서 getWage를 이용해 string to int 변환해준 다음 인자로 넣어줍니다.
- 웹, 앱 단에서 getCalAttendance를 이용해서 string 패턴 매칭 작업을 통해 해당 월의 인덱스 번호만 골라내서 이 함수를 사용합니다.
- Input / Output
  - 인자로 사업장/근무지의 index, 근로자의 근무지에서의 index, 해당하는 월의 시작 index, 끝 index, 시급 wage가 필요합니다. 
  - 월급을 return합니다.
 
### 업로드 함수

```
function uploadPersonalInfo(address person, uint8 identiNumber, string calldata name, 
uint age, string calldata gender) public
```

- 개인 정보를 등록하는 함수입니다.
- msg.sender와 인자의 address person이 일치해야만 등록 가능합니다.
- Input / Output
  - 인자로 사람의 address, 고용주 구분 번호 identiNumber, name, age, gender가 필요합니다.
  - 아무것도 return하지 않습니다.

`function uploadWorkplace(address employerAddress, string calldata workplaceName, string calldata location) public`

- 고용주가 사업장을 등록하는 함수입니다.
- msg.sender와 인자의 address employerAddress가 일치해야만 등록 가능합니다.
- 개인 정보의 identiNumber가 1이어야 등록 가능합니다.
- Input / Output
  - 인자로 고용주의 address, workplaceName, location이 필요합니다.
  - 아무것도 return하지 않습니다.

```
function uploadLaborContract(string [] calldata laborContractItems, string calldata stday, 
address employeeAddress, uint wpindex) public
```

- 근로자가 고용주가 보낸 임시 계약서를 허락하고, 근로계약서를 블록체인에 등록하는 함수입니다.
- 근로계약서를 등록하면 workplace에 출석부가 만들어지고, 근로계약서 저장과 근로자 address 저장이 이루어집니다.
- 그리고 근로계약서를 업로드한 날짜를 반영하여, 그때부터 근로자의 경력 저장이 이루어집니다.
- msg.sender와 인자의 address employeeAddress가 일치해야만 등록 가능합니다.
- 개인 정보의 identiNumber가 0이어야 등록 가능합니다.
- Input / Output
  - 인자로 근로계약서의 7가지 요소가 들어가 있는 배열, 근로 시작날, 근로자의 address, 근무지의 index가 필요합니다.
  - 아무것도 return하지 않습니다.
  
`function uploadAttendance (uint8 classifyNum, uint wpindex, string calldata day, int hour, int minute) public`

- 근로자가 출퇴근을 등록하는 함수입니다.
- classifyNum이 0이면 출근, 1이면 퇴근입니다.
- Input / Output
  - 인자로 classifyNum, 근무지의 index, 날짜, 시간, 분이 필요합니다.
  - 아무것도 return하지 않습니다.

## **ERC20.sol**

- openzeppelin의 표준을 그대로 사용했습니다. 수정한 부분만 기록합니다.
- 생성자에서 wontoken address가 1억을 mint합니다.

`function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool)`

- sender가 recipient에게 토큰을 amount만큼 보내는 함수입니다.
- 여기서 approve하는 과정을 주석처리 했습니다. 딱히 필요하지 않기 때문입니다.
- Input / Output
  - 인자로 토큰을 받고자하는 address, 토큰의 양(원화)을 필요로합니다.
  - bool을 return 합니다.
  
## **WonToken.sol**

- 토큰과 이더를 교환할 수 있게 만든 컨트랙트입니다.
- WonToken.sol을 배포하면 ERC20도 같이 자동 배포됩니다.

```
constructor() public {
    token = new ERC20("WON", "WON", address(this));
}
```

- constructor로 ERC20을 배포합니다. 순서대로 토큰의 이름, 토큰 축약어, WonToken의 address를 뜻합니다.

`function buy() payable public`

- 이더로 토큰을 교환합니다.
- 설정된 비율은 1,000,000 : 1 eth 입니다.
- Input / Output
  - 인자가 필요하지 않으며, 트랙잭션에 원하는 만큼의 토큰에 해당하는 이더를 보내야 합니다.
  - 아무것도 return 하지 않습니다.

`function sell(uint256 amount) public`

- 토큰으로 이더를 교환합니다.
- 설정된 비율은 1,000,000 : 1 eth 입니다.
- Input / Output
  - 인자로 교환을 원하는 토큰의 양 amount가 필요합니다.
  - 아무것도 return 하지 않습니다.

`function geterc20address() public view returns(address)`

- WonToken에 의해 배포된 ERC20 contract의 address를 return합니다.
- Input / Output
  - 인자가 필요하지 않습니다.
  - ERC20 contract의 address를 return합니다.

## **MyNFT.sol**

- 이 컨트랙트는 NFT에 대한 메타데이터 저장을 위해서 ERC721URIStorage를 상속해서 사용했습니다.
- 그 외에 나머지 부분은 openzeppelin의 표준을 그대로 사용했기 때문에 ERC721을 참고해주세요.

`constructor() ERC721("Badge", "BDG") public { }`

- constructor로 ERC721를 초기화 해줍니다. 순서대로 토큰의 이름, 토큰 축약어를 넣으면 됩니다.


`function mintNFT(address to, string memory tokenURI) public returns (uint256)`

- NFT를 만듭니다.
- NFT를 만들기전 Pinata를 이용해 먼저 메타데이터를 업로드하며, 그에 대한 ipfs주소를 받아 tokenURI로 저장합니다.
- Input / Output
  - 인자로 NFT를 받을 대상의 address, 메타데이터에 대한 ipfs uri를 받습니다.
  - 다음 token id를 return합니다.

`function getTokenIdNow() public view returns (uint256)`

- 앞으로 minfNFT를 한다면 생성될 token id를 보여줍니다.
- 예를 들어, 현재 30번까지 NFT가 만들어졌다면, 이 함수를 사용하면 31을 응답으로 받습니다.
- Input / Output
  - 인자로 아무것도 받지 않습니다.
  - 다음 token id를 return 합니다.


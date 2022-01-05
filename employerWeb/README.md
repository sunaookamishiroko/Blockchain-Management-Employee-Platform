# **employerWeb**

dependencies 설치

```
npm install
```

## **contract function description**

아래는 프론트에서 사용할 contract의 함수들에 대해 설명합니다.

## **LaborContract**

### Get function

```
getPersonInformation (address person) public view returns (personalInfo memory)
```

- 사람의 개인 정보를 조회합니다.
- Input / Output
  - 인자로 조회하고 싶은 사람의 address가 필요합니다.
  - personalInfo 구조체를 return합니다. (identiNumber, name, age, gender)

```
getEmployeeInfo (uint workplaceInfoIndex) public view returns (address [] memory, string [] memory) 
```
- 고용주가 선택한 사업장 근로자 정보들을 가져옵니다.
- 정보에는 근로자들의 address와 이름이 존재합니다.
- Input / Output
  - 인자로 선택한 사업장의 index가 필요합니다.
  - 차례대로 근로자들의 address 배열, name 배열을 return합니다.

```
getNumOfEmployee (uint workplaceInfoIndex) public view returns (uint)
```
- 고용주가 선택한 사업장의 근로자 수를 가져옵니다.
- Input / Output
  - 인자로 선택한 사업장의 index가 필요합니다.
  - 근로자의 수를 return 합니다.
 
```
getIndexOfEmployee (uint workplaceInfoIndex, address employeeAddress) public view returns (uint)
```
- 근로자가 자신이 선택한 근무지에 저장되어 있는 index를 가져옵니다.
- Input / Output
  - 인자로 근무지의 index, 근로자의 address가 필요합니다.
  - 근로자의 index를 return합니다.

```
getWorkplaces () public view returns (uint [] memory, string [] memory, string [] memory)
```
- 고용주의 사업장들 또는 근로자의 근무지들을 조회하는 함수입니다.
- 고용주와 근로자는 msg.sender와 등록된 identiNumber를 기준으로 구분합니다.
- Input / Output
  - 인자로 아무것도 필요하지 않습니다.
  - 차례대로 사업장/근무지들의 index 배열, name 배열, location 배열을 return합니다.
 
```
getLaborContract (uint workplaceInfoIndex, address employeeAddress) public view returns(laborContract memory)
```
- 고용주가 선택한 근로자 또는 근로자가 선택한 근무지의 근로계약서를 조회하는 함수입니다.
- 고용주와 근로자는 msg.sender와 등록된 identiNumber를 기준으로 구분합니다.
- Input / Output
  - 인자로 사업장/근무지의 index, 근로자의 address가 필요합니다.
  - laborContract 구조체를 return합니다. (peroid, duties, workingTime, workingDays, wage, wageday, comment)

```
getWage (uint workplaceInfoIndex, uint employeeIndex) public view returns (string memory)
```
-  고용주가 선택한 근로자 또는 근로자가 선택한 근무지에서의 시급을 조회하는 함수입니다.
- Input / Output
  - 인자로 사업장/근무지의 index, 근로자의 근무지에서의 index가 필요합니다. 
  - 시급을 string 형태로 return 합니다.
```
getCalAttendance (uint workplaceInfoIndex, uint employeeIndex) public view 
returns (string [] memory, string [] memory)
```
- 고용주가 선택한 근로자 또는 근로자가 선택한 근무지의 출근, 퇴근 날짜만 조회하는 함수입니다.
- Input / Output
  - 인자로 사업장/근무지의 index, 근로자의 근무지에서의 index가 필요합니다. 
  - 차례대로 startDay 배열, endDay 배열을 return합니다.

```
getAllAttendance (uint workplaceInfoIndex, uint employeeIndex) public view 
returns (attendance memory)
```
- 고용주가 선택한 근로자 또는 근로자가 선택한 근무지의 자세한 출퇴근 내역을 조회하는 함수입니다.
- Input / Output
  - 인자로 사업장/근무지의 index, 근로자의 근무지에서의 index가 필요합니다. 
  - attendance 구조체를 return합니다. (startDay, startTimeHour, startTimeMinute, endDay, endTimeHout, endTimeMinute)

```
getWorkTime (uint workplaceInfoIndex, uint employeeIndex, uint startIndex, uint endIndex) public view 
returns (int, int) 
```
- 근로자가 하나의 월에 일한 시간을 조회하는 함수입니다.
- 웹, 앱 단에서 getCalAttendance를 이용해서 string 패턴 매칭 작업을 통해 해당 월의 인덱스 번호만 골라내서 이 함수를 사용합니다.
- Input / Output
  - 인자로 사업장/근무지의 index, 근로자의 근무지에서의 index, 해당하는 월의 시작 index, 끝 index가 필요합니다. 
  - 차례대로 시간, 분을 return합니다.

```
getPayment (uint employeeIndex, uint workplaceInfoIndex, uint startIndex, uint endIndex, uint wage) public view 
  returns (int)
```
- 근로자의 월급을 계산하고 조회하는 함수입니다.
- wage는 프론트에서 getWage를 이용해 string to int 변환해준 다음 인자로 넣어줍니다.
- 웹, 앱 단에서 getCalAttendance를 이용해서 string 패턴 매칭 작업을 통해 해당 월의 인덱스 번호만 골라내서 이 함수를 사용합니다.
- Input / Output
  - 인자로 사업장/근무지의 index, 근로자의 근무지에서의 index, 해당하는 월의 시작 index, 끝 index, 시급 wage가 필요합니다. 
  - 월급을 return합니다.
 
### Upload function

```
uploadPersonalInfo(address person, uint8 identiNumber, string calldata name, uint age, string calldata gender) public
```

- 개인 정보를 등록하는 함수입니다.
- msg.sender와 인자의 address person이 일치해야만 등록 가능합니다.
- Input / Output
  - 인자로 사람의 address, 고용주 구분 번호 identiNumber, name, age, gender가 필요합니다.
  - 아무것도 return하지 않습니다.

```
uploadWorkplace(address employerAddress, string calldata workplaceName, string calldata location) public
```

- 고용주가 사업장을 등록하는 함수입니다.
- msg.sender와 인자의 address employerAddress가 일치해야만 등록 가능합니다.
- 개인 정보의 identiNumber가 1이어야 등록 가능합니다.
- Input / Output
  - 인자로 고용주의 address, workplaceName, location이 필요합니다.
  - 아무것도 return하지 않습니다.

```
uploadLaborContract(string [] calldata laborContractItems, address employeeAddress, uint workplaceInfoIndex) public
```

- 근로자가 고용주가 보낸 임시 계약서를 허락하고, 근로계약서를 블록체인에 등록하는 함수입니다.
- 근로계약서를 등록하면 workplace에 출석부가 만들어지고, 근로계약서 저장과 근로자 address 저장이 이루어집니다.
- msg.sender와 인자의 address employeeAddress가 일치해야만 등록 가능합니다.
- 개인 정보의 identiNumber가 0이어야 등록 가능합니다.
- Input / Output
  - 인자로 근로계약서의 7가지 요소가 들어가 있는 배열, 근로자의 address, workplaceInfoIndex 필요합니다.
  - 아무것도 return하지 않습니다.
  
```
uploadAttendance (uint8 classifyNum, uint workPlaceInfoIndex, string calldata day, int timeHour, int timeMinute) public 
```
- 근로자가 출퇴근을 등록하는 함수 입니다.
- classifyNum이 0이면 출근, 1이면 퇴근입니다.
- Input / Output
  - 인자로 classifyNum, workPlaceInfoIndex, 날짜, 시간, 분이 필요합니다.
  - 아무것도 return하지 않습니다.

## **ERC20**

작성중입니다

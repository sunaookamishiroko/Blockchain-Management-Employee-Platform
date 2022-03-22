// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LaborContract {
  
  // 사람과 개인정보 mapping
  mapping(address => personalInfo) private _person;

  // 근로자의 근로계약서 리스트 index mapping
  mapping(address => uint256 []) private _employeeLaborContractList;

  // 사업주의 사업장 리스트 index mapping
  mapping(address => uint256 []) private _employerWorkplaceList;

  // 근로자의 근무지 리스트 index mapping
  mapping(address => uint256 []) private _employeeWorkplaceList;

  // 사업장 index 전역 변수
  uint private _workplaceIndex = 0;
  
  // 근로계약서 index 전역 변수
  uint private _laborContractIndex = 0;
  
  // 사람 개인정보
  // identiNumber : 0 => 근로자 1 => 사업주
  struct personalInfo {
    uint8 identiNumber;
    string name;
    uint age;
    string gender;
    careerst career;
  }

  // 사업장 정보
  // employee와 attendance, laborContractIndex는 index 번호 같아야함 -> 근로자에게 하나의 index 배치
  struct workplaceInfo {
    string name;
    string location;
    address [] employee;
    uint [] laborContractIndex;
    attendance [] attendanceList;
  }

  // 출톼근 기록부
  struct attendance {
    string [] startDay;
    int [] startTimeHour;
    int [] startTimeMinute;
    string [] endDay;
    int [] endTimeHour;
    int [] endTimeMinute;
  }

  // 근로계약서 저장소
  struct laborContract {
    uint workplaceIndex;      // 사업장 index
    string peroid;            // 근로계약기간 
    string duties;            // 업무내용
    string workingTime;       // 소정근로시간
    string workingDays;       // 근무일
    string wage;              // 임금(시급)
    string wageday;           // 임금지급일
    string comment;           // 기타사항
  }

  struct careerst {
    string [] name;
    string [] startDay;
    string [] endDay;
  }
  
  // struct 배열 선언부
  workplaceInfo [] private workplaceinfo;
  laborContract [] private laborcontract;

  // event 선언
  event Onwork(string name, int timeHour, int timeMinute);
  event Offwork(string name, int timeHour, int timeMinute);

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  // 사람의 개인 정보 조회하는 함수
  function getPersonInformation (address person) public view 
  returns (personalInfo memory){

    require(person == msg.sender, "your not msg.sender!");

    return (_person[person]);

  }

  // 사업주의 사업장 근로자 정보 목록을 return하는 함수
  function getEmployeeInfo (uint workplaceInfoIndex) public view 
  returns (address [] memory, string [] memory) {
    
    // 이름 정보를 저장하기 위해 배열 선언
    string [] memory nameList = new string[](workplaceinfo[workplaceInfoIndex].employee.length);
    
    // employee의 address를 모두 찾아, 그것으로 name을 가져옴
    for (uint x = 0; x < workplaceinfo[workplaceInfoIndex].employee.length ; x++) {
      string memory name = _person[workplaceinfo[workplaceInfoIndex].employee[x]].name;
      nameList[x] = name;
    }

    // address들과 name들 return
    return (
      workplaceinfo[workplaceInfoIndex].employee,
      nameList
    );
  }

  // 사업주의 사업장의 근로자 수를 return하는 함수
  function getNumOfEmployee (uint workplaceInfoIndex) public view returns (uint){
    return (workplaceinfo[workplaceInfoIndex].employee.length);
  }

  // 근로자의 근무지에서의 index를 return하는 함수
  function getIndexOfEmployee (uint workplaceInfoIndex, address employeeAddress) public view returns (uint) {
    
    uint index;

    // msg.sender가 근무지에 저장되어 있는 근로자의 address와 같으면 그것의 index return
    for (uint x = 0; x < workplaceinfo[workplaceInfoIndex].employee.length ; x++) {
      if(employeeAddress == workplaceinfo[workplaceInfoIndex].employee[x]){
        index = x;
        break;
      }
    }

    return index;
  }

  // 사업주의 사업장 & 근로자의 근무지들 조회하는 함수
  function getWorkplaces () public view 
  returns (uint [] memory, string [] memory, string [] memory){
    
    uint [] memory array;

    // identiNumber = 0 => 근로자 1 => 사업주
    // 0 -> array는 mapping _employeeWorkplaceList에 저장되어 있는 근무지 index 리스트
    // 1 -> array는 mapping _employerWorkplaceList에 저장되어 있는 사업장 index 리스트
    
    if (_person[msg.sender].identiNumber == 0) array = _employeeWorkplaceList[msg.sender];
    else array = _employerWorkplaceList[msg.sender];

    string [] memory nameList = new string[](array.length);
    string [] memory locationList = new string[](array.length);

    for (uint x = 0; x < array.length ; x++) {
      string memory name = workplaceinfo[array[x]].name;
      string memory location = workplaceinfo[array[x]].location;

      nameList[x] = name;
      locationList[x] = location;
    }

    // 사업장 index list, name의 list, location의 list return
    return (array, nameList, locationList);

  }

  // 사업주가 선택한 근로자 & 근로자가 선택한 근무지의 근로계약서를 조회하는 함수
  function getLaborContract (uint workplaceInfoIndex, address employeeAddress) public view 
  returns(laborContract memory) {

    uint laborContractIndex;
    uint tempIndex;

    // identiNumber : 0 => 근로자 1 => 사업주
    // mapping _employeeLaborContractList와 근로계약서에 들어있는 workplaceIndex를 이용하여 찾음
    if (_person[msg.sender].identiNumber == 0) {

      for (uint x = 0 ; x < _employeeLaborContractList[msg.sender].length ; x++) {

        if (laborcontract[_employeeLaborContractList[msg.sender][x]].workplaceIndex == workplaceInfoIndex) {
          tempIndex = x;
          break;
        }

      }
      
      laborContractIndex = _employeeLaborContractList[msg.sender][tempIndex];
    }
    // workplace에서 index를 찾음
    else {
      tempIndex = getIndexOfEmployee(workplaceInfoIndex, employeeAddress);
      laborContractIndex = workplaceinfo[workplaceInfoIndex].laborContractIndex[tempIndex];
    }

    return (laborcontract[laborContractIndex]);

  }

  // 사업주가 선택한 근로자 or 근로자가 선택한 근무지의 시급을 return함
  function getWage (uint workplaceInfoIndex, uint employeeIndex) public view 
  returns (string memory) {
    return(laborcontract[workplaceinfo[workplaceInfoIndex].laborContractIndex[employeeIndex]].wage);
  }

  // 사업주가 선택한 근로자 or 근로자가 선택한 근무지의 출근, 퇴근 날짜만 return하는 함수
  function getCalAttendance (uint workplaceInfoIndex, uint employeeIndex) public view 
  returns (string [] memory, string [] memory){

    return(
      workplaceinfo[workplaceInfoIndex].attendanceList[employeeIndex].startDay,
      workplaceinfo[workplaceInfoIndex].attendanceList[employeeIndex].endDay
    );

  }

  // 사업주가 선택한 근로자 or 근로자가 선택한 근무지의 자세한 출퇴근 내역을 return하는 함수
  function getAllAttendance (uint workplaceInfoIndex, uint employeeIndex) public view 
  returns (attendance memory){
    return (workplaceinfo[workplaceInfoIndex].attendanceList[employeeIndex]);
  }

  // 근로자가 하나의 월에 일한 시간을 return하는 함수
  // hour(시간), minute(분)을 숫자로 출력합니다   -> 몇 시간 몇 분 근무했는지에 대한 정보
  // 웹, 앱 단에서 getCalAttendance를 이용해서 string 패턴 매칭 작업을 통해 해당 월의 인덱스 번호만 골라내서 이 함수를 사용합니다.
  function getWorkTime (uint workplaceInfoIndex, uint employeeIndex, uint startIndex, uint endIndex) public view 
  returns (int, int) {

    int Allhour = 0;
    int Allminute = 0;

    int hour;
    int minute;

    for (uint x = startIndex ; x <= endIndex ; x++) {
      
      hour = workplaceinfo[workplaceInfoIndex].attendanceList[employeeIndex].endTimeHour[x] 
      - workplaceinfo[workplaceInfoIndex].attendanceList[employeeIndex].startTimeHour[x];

      minute = workplaceinfo[workplaceInfoIndex].attendanceList[employeeIndex].endTimeMinute[x] 
      - workplaceinfo[workplaceInfoIndex].attendanceList[employeeIndex].startTimeMinute[x];

      if (hour < 0) hour = hour + 24;
      if (minute < 0) minute = minute + 60;

      Allhour += hour;
      Allminute += minute;
    }

    return (Allhour, Allminute);

  }

  // 근로자의 월급 조회
  // wage는 프론트에서 getWage를 이용해 string to int 변환해준 다음 인자로 넣어줍니다
  function getPayment (uint workplaceInfoIndex, uint employeeIndex, uint startIndex, uint endIndex, int wage) public view 
  returns (int) {

    int Allhour;
    int Allminute;

    (Allhour, Allminute) = getWorkTime(workplaceInfoIndex, employeeIndex, startIndex, endIndex);

    int Allwage = (Allhour * wage) + (Allminute * (wage / 60));

    return (Allwage);
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////


  // 개인 정보 등록하는 함수
  function uploadPersonalInfo(address person, uint8 identiNumber, string calldata name, uint age, string calldata gender) public {

    require(person == msg.sender, "your not msg.sender!");

    personalInfo storage newPersonalInfo = _person[person];

    newPersonalInfo.identiNumber = identiNumber;
    newPersonalInfo.name = name;
    newPersonalInfo.age = age;
    newPersonalInfo.gender = gender;

  }
  
  // 사업주가 사업장 등록하는 함수
  function uploadWorkplace(address employerAddress, string calldata workplaceName, string calldata location) public {

    require(employerAddress == msg.sender, "your not msg.sender!");
    require(_person[employerAddress].identiNumber == 1, "your not employer!");
    
    address [] memory employee;
    uint [] memory laborContractIndex;

    workplaceinfo.push();
    workplaceinfo[_workplaceIndex].name = workplaceName;
    workplaceinfo[_workplaceIndex].location = location;
    workplaceinfo[_workplaceIndex].employee = employee;
    workplaceinfo[_workplaceIndex].laborContractIndex = laborContractIndex;

    // _employerWorkplaceList mapping에 사업장 index 등록
    _employerWorkplaceList[employerAddress].push(_workplaceIndex);

    // 사업장 index 증가
    _workplaceIndex++;
  }

  // 근로계약서 등록하는 함수
  function uploadLaborContract(string [] calldata laborContractItems, address employeeAddress, uint workplaceInfoIndex) public {

    require(employeeAddress == msg.sender, "your not msg.sender!");
    require(_person[employeeAddress].identiNumber == 0, "your not employee!");

    laborContract memory newLabor;

    newLabor.workplaceIndex = workplaceInfoIndex;
    newLabor.peroid = laborContractItems[0];
    newLabor.duties = laborContractItems[1];
    newLabor.workingTime = laborContractItems[2];
    newLabor.workingDays = laborContractItems[3];
    newLabor.wage = laborContractItems[4];
    newLabor.wageday = laborContractItems[5];
    newLabor.comment =  laborContractItems[6];

    laborcontract.push(newLabor);

    // _employeeLaborContractList mapping에 근로계약서 index 등록
    // _employeeWorkplaceList mapping에 근무지 index 등록
    _employeeLaborContractList[employeeAddress].push(_laborContractIndex);
    _employeeWorkplaceList[employeeAddress].push(workplaceInfoIndex);

    // workplace의 근로자로 등록하기
    workplaceinfo[workplaceInfoIndex].employee.push(employeeAddress);
    
    // workspace에다가 근로계약서의 index 저장하기
    workplaceinfo[workplaceInfoIndex].laborContractIndex.push(_laborContractIndex);

    string [] memory startDay;
    int [] memory startTimeHour;
    int [] memory startTimeMinute;
    string [] memory endDay;
    int [] memory endTimeHour;
    int [] memory endTimeMinute;

    attendance memory newAttendance = attendance(startDay, startTimeHour, startTimeMinute, endDay, endTimeHour, endTimeMinute);

    // 새로운 출석부 만들어서 출석부 리스트에 넣기
    workplaceinfo[workplaceInfoIndex].attendanceList.push(newAttendance);

    // 근로계약서 index 증가
    _laborContractIndex++;

  }

  // 출퇴근 올리는 함수
  // classifyNum : 0 -> 출근 / 1 -> 퇴근
  function uploadAttendance (uint8 classifyNum, uint workPlaceInfoIndex,
  string calldata day, int timeHour, int timeMinute) public {

    require(_person[msg.sender].identiNumber == 0, "you are not employee");

    uint employeeIndex = getIndexOfEmployee(workPlaceInfoIndex, msg.sender);

    // 출근
    if (classifyNum == 0) {

      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startDay.push(day);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startTimeHour.push(timeHour);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startTimeMinute.push(timeMinute);

      emit Onwork(_person[msg.sender].name, timeHour, timeMinute);
    
    // 퇴근
    } else if (classifyNum == 1){

      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endDay.push(day);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endTimeHour.push(timeHour);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endTimeMinute.push(timeMinute);

      emit Offwork(_person[msg.sender].name, timeHour, timeMinute);

    }

  }

  function deleteEmployee(address employeeAddress) public {

  }



} 
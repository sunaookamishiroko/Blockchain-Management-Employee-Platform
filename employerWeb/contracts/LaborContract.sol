// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LaborContract {
  
  // 사람과 개인정보 mapping
  mapping(address => personalInfo) private _person;

  // 근로자의 근로계약서 리스트 index mapping
  mapping(address => uint256 []) private _employeeLaborContractList;

  // 고용주의 사업장 리스트 index mapping
  mapping(address => uint256 []) private _employerWorkplaceList;

  // 근로자의 근무지 리스트 index mapping
  mapping(address => uint256 []) private _employeeWorkplaceList;

  // 사업장 index 전역 변수
  uint private _workplaceIndex = 0;
  
  // 근로계약서 index 전역 변수
  uint private _laborContractIndex = 0;
  
  // 사람 개인정보
  // identiNumber : 0 => 근로자 1 => 고용주
  struct personalInfo {
    uint8 identiNumber;
    string name;
    uint age;
    string gender;
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
    uint8 [] startTimeHour;
    uint8 [] startTimeMinute;
    string [] endDay;
    uint8 [] endTimeHour;
    uint8 [] endTimeMinute;
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
  
  //struct 배열 선언부
  workplaceInfo [] private workplaceinfo;
  laborContract [] private laborcontract;


  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  // 함수 뒤에 EW : employerWeb -> 고용주가 사용하는 함수
  //         EA : employeeApp -> 근로자가 사용하는 함수
  //       아무 것도 적히지 않은 것 -> 공통으로 사용하는 함수 


  //사람의 개인 정보 조회하는 함수
  function getEmployeeInformation (address person) public view returns (uint8, string memory, uint, string memory){

    require(person == msg.sender, "your not msg.sender!");

    return (_person[person].identiNumber, _person[person].name, _person[person].age, _person[person].gender);

  }

  // 고용주의 사업장 근로자 정보 목록을 return하는 함수
  function getEmployerInfoEW (uint workplaceInfoIndex) public view returns (address [] memory, string [] memory) {
    
    string [] memory nameList = new string[](workplaceinfo[workplaceInfoIndex].employee.length);

    for (uint x = 0; x < workplaceinfo[workplaceInfoIndex].employee.length ; x++) {

      string memory name = _person[workplaceinfo[workplaceInfoIndex].employee[x]].name;
      nameList[x] = name;

    }

    return (
      workplaceinfo[workplaceInfoIndex].employee,
      nameList
    );
  }

  // 고용주의 사업장의 근로자 수를 return하는 함수
  function getNumOfEmployerEW (uint workplaceInfoIndex) public view returns (uint){
    return (workplaceinfo[workplaceInfoIndex].employee.length);
  }

  // 근로자의 근무지에서의 index를 return하는 함수
  function getIndexOfEmployee (uint workplaceInfoIndex) public view returns (int) {

    for (uint x = 0; x < workplaceinfo[workplaceInfoIndex].employee.length ; x++) {
      if(msg.sender == workplaceinfo[workplaceInfoIndex].employee[x]) return int(x);
    }

    return -1;
  }

  // 고용주의 사업장들 조회하는 함수
  function getWorkplacesEW (address employerAddress) public view returns (uint [] memory, string [] memory, string [] memory){

    uint [] memory array = _employerWorkplaceList[employerAddress];
    string [] memory nameList = new string[](array.length);
    string [] memory locationList = new string[](array.length);

    for (uint x = 0; x < array.length ; x++) {
      string memory name = workplaceinfo[array[x]].name;
      string memory location = workplaceinfo[array[x]].location;

      nameList[x] = name;
      locationList[x] = location;
    }

    return (array, nameList, locationList);

  }

  // 근로자의 근무지들 조회하는 함수
  function getWorkplacesEA (address employeeAddress) public view returns (uint [] memory, string [] memory, string [] memory){
    
    uint [] memory array = _employeeWorkplaceList[employeeAddress];
    string [] memory nameList = new string[](array.length);
    string [] memory locationList = new string[](array.length);
    
    for (uint x = 0; x < array.length ; x++) {
      string memory name = workplaceinfo[array[x]].name;
      string memory location = workplaceinfo[array[x]].location;

      nameList[x] = name;
      locationList[x] = location;
    }

    return (array, nameList, locationList);

  }

  // 근로자가 선택한 근무지 / 고용주가 선택한 근로자의 근로계약서를 조회하는 함수
  function getLaborContract (uint workplaceInfoIndex, uint employeeIndex) public view returns(string [] memory) {
    
    require(workplaceInfoIndex < workplaceinfo.length, "workplace is not available");

    string [] memory laborContractItems = new string[](7);
    string [] memory temp = new string[](7);

    uint laborContractIndex = workplaceinfo[workplaceInfoIndex].laborContractIndex[employeeIndex];

    temp[0] = laborcontract[laborContractIndex].peroid;
    temp[1] = laborcontract[laborContractIndex].duties;
    temp[2] = laborcontract[laborContractIndex].workingTime;
    temp[3] = laborcontract[laborContractIndex].workingDays;
    temp[4] = laborcontract[laborContractIndex].wage;
    temp[5] = laborcontract[laborContractIndex].wageday;
    temp[6] = laborcontract[laborContractIndex].comment;
    
    for (uint x = 0 ; x < laborContractItems.length ; x++) {
      laborContractItems[x] = temp[x];
    }
    return (laborContractItems);

  }

  // 근로자가 선택한 근무지 / 고용주가 선택한 근로자의 시급을 return함
  function getWage (uint workplaceInfoIndex, uint employeeIndex) public view returns (string memory) {

    require(workplaceInfoIndex < workplaceinfo.length, "workplace is not available");

    string memory wage = laborcontract[workplaceinfo[workplaceInfoIndex].laborContractIndex[employeeIndex]].wage;

    return(wage);
  }

  // 근로자가 선택한 근무지 / 고용주가 선택한 근로자의 출근, 퇴근 날짜만 return하는 함수
  function getCalAttendance (uint workplaceInfoIndex, uint employeeIndex) public view 
  returns (string [] memory, string [] memory){

    return(
      workplaceinfo[workplaceInfoIndex].attendanceList[employeeIndex].startDay,
      workplaceinfo[workplaceInfoIndex].attendanceList[employeeIndex].endDay
    );

  }

  // 고근로자가 선택한 근무지 / 용주가 선택한 근로자의 자세한 출퇴근 내역을 return하는 함수
  function getAllAttendance (uint workplaceInfoIndex, uint employeeIndex) public view 
  returns (string [] memory, uint8 [] memory, uint8 [] memory, string [] memory, uint8 [] memory, uint8 [] memory){

    return (
      workplaceinfo[workplaceInfoIndex].attendanceList[employeeIndex].startDay,
      workplaceinfo[workplaceInfoIndex].attendanceList[employeeIndex].startTimeHour,
      workplaceinfo[workplaceInfoIndex].attendanceList[employeeIndex].startTimeMinute,
      workplaceinfo[workplaceInfoIndex].attendanceList[employeeIndex].endDay,
      workplaceinfo[workplaceInfoIndex].attendanceList[employeeIndex].endTimeHour,
      workplaceinfo[workplaceInfoIndex].attendanceList[employeeIndex].endTimeMinute);
  }

  // 근로자가 하나의 월에 일한 시간을 return하는 함수
  // hour(시간), minute(분)을 숫자로 출력합니다   -> 몇 시간 몇 분 근무했는지에 대한 정보
  // 웹, 앱 단에서 getCalAttendance를 이용해서 string 패턴 매칭 작업을 통해 해당 월의 인덱스 번호만 골라내서 이 함수를 사용합니다.
  function getWorkTime (uint employeeIndex, uint workplaceInfoIndex, uint startIndex, uint endIndex) public view returns (uint, uint) {

    uint Allhour = 0;
    uint Allminute = 0;

    uint hour;
    uint minute;

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
  // getWorkTime 사용
  function getPayment (uint employeeIndex, uint workplaceInfoIndex, uint startIndex, uint endIndex, uint wage) public view returns (uint) {

    uint Allhour;
    uint Allminute;

    (Allhour, Allminute) = getWorkTime(employeeIndex, workplaceInfoIndex, startIndex, endIndex);

    uint Allwage = (Allhour * wage) + (Allminute * (wage / 60));

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
  
  // 고용주가 사업장 등록하는 함수
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

    _employerWorkplaceList[employerAddress].push(_workplaceIndex);

    _workplaceIndex++;
  }

  // 근로계약서 등록하는 함수
  function uploadLaborContract(string [] calldata laborContractItems, address employeeAddress, uint workplaceIndex) public {

    require(employeeAddress == msg.sender, "your not msg.sender!");
    require(_person[employeeAddress].identiNumber == 0, "your not employee!");

    laborContract memory newLabor;

    newLabor.workplaceIndex = workplaceIndex;
    newLabor.peroid = laborContractItems[0];
    newLabor.duties = laborContractItems[1];
    newLabor.workingTime = laborContractItems[2];
    newLabor.workingDays = laborContractItems[3];
    newLabor.wage = laborContractItems[4];
    newLabor.wageday = laborContractItems[5];
    newLabor.comment =  laborContractItems[6];

    laborcontract.push(newLabor);

    _employeeLaborContractList[employeeAddress].push(_laborContractIndex);
    _employeeWorkplaceList[employeeAddress].push(workplaceIndex);

    workplaceinfo[workplaceIndex].employee.push(employeeAddress);
    workplaceinfo[workplaceIndex].laborContractIndex.push(_laborContractIndex);

    string [] memory startDay;
    uint8 [] memory startTimeHour;
    uint8 [] memory startTimeMinute;
    string [] memory endDay;
    uint8 [] memory endTimeHour;
    uint8 [] memory endTimeMinute;

    attendance memory newAttendance = attendance(startDay, startTimeHour, startTimeMinute, endDay, endTimeHour, endTimeMinute);

    workplaceinfo[workplaceIndex].attendanceList.push(newAttendance);

    _laborContractIndex++;

  }

  // 출퇴근 올리는 함수
  // classifyNum : 0 -> 출근 / 1 -> 퇴근
  function uploadAttendance (uint8 classifyNum, uint workPlaceInfoIndex, address employeeAddress,
  string calldata day, uint8 timeHour, uint8 timeMinute) public returns (uint8) {

    require(workPlaceInfoIndex < workplaceinfo.length, "your workplace is not available");
    require(_person[employeeAddress].identiNumber != 0, "you are not employee");

    uint employeeIndex;

    for (uint x = 0 ; x <= workplaceinfo[workPlaceInfoIndex].employee.length ; x++) {
      
      if(workplaceinfo[workPlaceInfoIndex].employee[x] == employeeAddress) {
        employeeIndex = x;
        break;
      }
    }

    // 출근
    if (classifyNum == 0) {

      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startDay.push(day);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startTimeHour.push(timeHour);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startTimeMinute.push(timeMinute);
    
    // 퇴근
    } else if (classifyNum == 1){

      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endDay.push(day);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endTimeHour.push(timeHour);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endTimeMinute.push(timeMinute);

    } else return 0;

    return 1;

  }
  

} 
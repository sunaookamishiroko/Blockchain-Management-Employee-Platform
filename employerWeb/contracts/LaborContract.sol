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
  workplaceInfo [] workplaceinfo;
  laborContract [] laborcontract;


  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  // 함수 뒤에 EW : employerWeb -> 고용주가 사용하는 함수
  //         EA : employeeApp -> 근로자가 사용하는 함수


  //사람의 개인 정보 조회하는 함수
  function getEmployeeInformation (address person) public view returns (string [] memory){

    require(person == msg.sender, "your not msg.sender!");

    string [] personItems;

    personItems.push(_person[person].identiNumber);
    personItems.push(_person[person].name);
    personItems.push(_person[person].age);
    personItems.push(_person[person].gender);

    return (personItems);

  }

  // 고용주의 사업장들 조회하는 함수
  function getWorkplacesEW (address employerAddress) public view returns (uint [], string [] memory, string [] memory){

    uint [] array = _employerWorkplaceList[employerAddress];
    string [] name;
    string [] location;

    for (uint x = 0; x < array.length ; x++) {
      name.push(workplaceinfo[array[x]].name);
      location.push(workplaceinfo[array[x]].location);
    }

    return (array, name, location);

  }

  // 근로자의 근무지들 조회하는 함수
  function getWorkplacesEA (address employeeAddress) public view returns (uint [], string [] memory, string [] memory){
    
    uint [] array = _employeeWorkplaceList[employeeAddress];
    string [] name;
    string [] location;
    
    for (uint x = 0; x < array.length ; x++) {
      name.push(workplaceinfo[array[x]].name);
      location.push(workplaceinfo[array[x]].location);
    }

    return (array, name, location);

  }

  // 고용주가 선택한 근로자의 근로계약서를 조회하는 함수
  function getLaborContractEW (uint workplaceInfoIndex, address employeeAddress) public view returns(string [] memory) {
    
    require(employeeAddress == msg.sender, "your not msg.sender!");
    require(workplaceInfoIndex < workplaceinfo.length, "workplace is not available");

    uint employeeIndex;
    string [] laborContractItems;
    
    for (employeeIndex = 0 ; employeeIndex  < workplaceinfo[workplaceInfoIndex].employee.length ; employeeIndex++) {

      if (workplaceinfo[workplaceInfoIndex].employee[employeeIndex] == employeeAddress) {

        uint laborContractIndex = workplaceinfo[workplaceInfoIndex].laborContractIndex[employeeIndex];

        laborContractItems.push(laborcontract[laborContractIndex].period);
        laborContractItems.push(laborcontract[laborContractIndex].duties);
        laborContractItems.push(laborcontract[laborContractIndex].workingTime);
        laborContractItems.push(laborcontract[laborContractIndex].workingDays);
        laborContractItems.push(laborcontract[laborContractIndex].wage);
        laborContractItems.push(laborcontract[laborContractIndex].wageday);
        laborContractItems.push(laborcontract[laborContractIndex].comment);

        return (laborContractItems);

      }
    }

    return (laborContractItems);  //null

  }

  // 근로자가 선택한 아르바이트의 근로계약서를 조회하는 함수
  function getLaborContractEA (uint workplaceInfoIndex, address employeeAddress) public view returns(string [] memory) {

    require(employeeAddress == msg.sender, "your not msg.sender!");
    require(workplaceInfoIndex < workplaceinfo.length, "workplace is not available");

    string [] laborContractItems;

    for (uint x = 0 ; x < _employeeLaborContractList[employeeAddress].length ; x++) {

      if (laborcontract[_employeeLaborContractList[employeeAddress][x]].workplaceIndex == workplaceInfoIndex) {
        laborContractItems.push(laborcontract[_employeeLaborContractList[employeeAddress][x]].period);
        laborContractItems.push(laborcontract[_employeeLaborContractList[employeeAddress][x]].duties);
        laborContractItems.push(laborcontract[_employeeLaborContractList[employeeAddress][x]].workingDays);
        laborContractItems.push(laborcontract[_employeeLaborContractList[employeeAddress][x]].wage);
        laborContractItems.push(laborcontract[_employeeLaborContractList[employeeAddress][x]].wageday);
        laborContractItems.push(laborcontract[_employeeLaborContractList[employeeAddress][x]].comment);

        return (laborContractItems);
      }
    }

    return (laborContractItems);

  }

  // 고용주의 사업장 근로자 정보 목록을 return하는 함수
  function getEmployerInfo (uint workplaceInfoIndex) public view returns (address [], string [] memory) {
    
    string [] nameList;

    for (uint x = 0; x < workplaceinfo[workplaceInfoIndex].employee.length ; x++) {
      nameList.push(_person[workplaceinfo[workplaceInfoIndex].employee[x]].name);
    }

    return (
      workplaceinfo[workplaceInfoIndex].employee,
      nameList
    );
  }

  // 고용주의 사업장의 근로자 수를 return하는 함수
  function getNumOfEmployer (uint workplaceInfoIndex) public view returns (uint){
    return (workplaceinfo[workplaceInfoIndex].employee.length);
  }

  // 출근, 퇴근 날짜만 return하는 함수 -> 달력에 사용
  function getCalAttendance (uint workplaceInfoIndex, uint employeeIndex) public view 
  returns (string [] memory, string [] memory){

    return(
      workplaceinfo[workplaceInfoIndex].attendanceList[employeeIndex].startDay,
      workplaceinfo[workplaceInfoIndex].attendanceList[employeeIndex].endDay
    );

  }

  // 자세한 출퇴근 내역을 return하는 함수
  function getAllAttendance (uint workplaceInfoIndex, uint employeeIndex) public view 
  returns (string [] memory, uint [], uint [], string [] memory, uint [], uint []){

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
  function getPayment (uint employeeIndex, uint workplaceInfoIndex, uint startIndex, uint endIndex) public returns (uint) {

    uint Allhour;
    uint Allminute;

    (Allhour, Allminute) = getWorkTime(employeeIndex, workplaceInfoIndex, startIndex, endIndex);

    uint wage = (wage/60)*(hour*60+minute);

    return (wage);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////


  // 개인 정보 등록하는 함수
  function uploadPersonalInfo(address person, uint8 identiNumber, string name, uint age, string gender) public {

    require(person == msg.sender, "your not msg.sender!");

    personalInfo storage newPersonalInfo = _person[person];

    newPersonalInfo.identiNumber = identiNumber;
    newPersonalInfo.name = name;
    newPersonalInfo.age = age;
    newPersonalInfo.gender = gender;

  }

  // 고용주가 사업장 등록하는 함수
  function uploadWorkplace(address employer, string workplaceName, string location) public {

    require(employer == msg.sender, "your not msg.sender!");
    require(_person[employer] == 1, "your not employer!");
    
    workplaceInfo storage newInfo = workplaceInfo(workplaceName, location);
    workplaceinfo.push(newInfo);

    _employerWorkplaceList[employer].push(_workplaceIndex);

    _workplaceIndex++;
  }

  // 근로계약서 등록하는 함수
  function uploadLaborContract(string [] laborContractItems, address employee, uint workPlaceIndex) public {

    require(employee == msg.sender, "your not msg.sender!");
    require(_person[employee] == 0, "your not employee!");

    laborContract storage newLabor = laborContract(workPlaceIndex,
      laborContractItems[0], laborContractItems[1], laborContractItems[2], laborContractItems[3],
      laborContractItems[4], laborContractItems[5], laborContractItems[6]);
    laborcontract.push(newLabor);

    _employeeLaborContractList[employee].push(_laborContractIndex);

    _employeeWorkplaceList[employee].push(workPlaceIndex);

    workplaceinfo[workPlaceIndex].employee.push(employee);
    workplaceinfo[workPlaceIndex].laborContractIndex.push(_laborContractIndex);

    _laborContractIndex++;

  }

  // 출퇴근 올리는 함수
  // classifyNum : 0 -> 출근 / 1 -> 퇴근
  function uploadAttendance (uint8 classifyNum, uint workPlaceInfoIndex, address employee,
  string day, uint timeHour, uint timeMinute) public returns (uint8) {

    require(workPlaceInfoIndex < workplaceinfo.length, "your workplace is not available");
    require(personalInfo[employee].identiNumber != 0, "you are not employee");

    uint employeeIndex = -1;

    for (uint x = 0 ; x <= workplaceinfo[workPlaceInfoIndex].employee.length ; x++) {
      
      if(workplaceinfo[workPlaceInfoIndex].employee[x] == employee) {
        employeeIndex = x;
        break;
      }
    }

    require(employeeIndex != -1, "can't find address in workplace");

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
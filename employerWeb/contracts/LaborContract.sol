// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LaborContract {
  
  // 사람과 개인정보 mapping
  mapping(address => personalInfo) private _person;

  // 근로자의 근로계약서 리스트 index mapping
  mapping(address => uint256 []) private _employeeLaborContractList;

  // 고용주의 사업장 리스트 index mapping
  mapping(address => uint256 []) private _employerWorkplaceList;

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
    uint [] workPlaceInfoIndexList;
  }

  // 사업장 정보
  // employee와 attendance, laborContractIndex는 index 번호 같아야함 -> 검색 쉽게 하기 위함
  struct workplaceInfo {
    string name;
    string location;
    address [] employee;
    uint [] laborContractIndex;
    attendance [] attendanceList;
  }

  // 출톼근 기록부
  // 후에 프론트 화면에서 요구하는 양식에 따라 변경할 수 있음
  struct attendance {
    //string [] startDay;
    uint startYear;
    uint startMonth;
    uint startDate;
    uint startTimeHour;
    uint startTimeMinute;
    //string [] endDay;
    uint endYear;
    uint endMonth;
    uint endDate;
    uint endTimeHour;
    uint endTimeMinute;
  }

  //해당 월 출근 기록부
  struct monthlyAttendance {
    uint [] month;             //몇 월의 기록인지 저장
    uint [] workDate;          //근로자가 해당 월에 며칠 일했는지 저장
    uint [] workHour;          //근로자가 해당 월에 몇 시간 일했는지 저장
  }

  // 근로계약서 저장소
  struct laborContract {
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


  //근로자의 근무지들 조회하는 함수
  function getWorkplaces (address employeeAddress) public returns (uint [], string [], string []){
    
    uint [] array = _person[employeeAddress].workPlaceInfoIndexList;
    string [] name;
    string [] location;
    
    for (uint x = 0; x < array.length ; x++) {
      name.push(workplaceinfo[array[x]].name);
      location.push(workplaceinfo[array[x]].location);
    }

    return (array, name, location);

  }


  //근로자의 근로계약서를 조회하는 함수
  //아직 미완성 입니다.(근로계약서 등록을 어떻게 하냐에 따라 조회 방법이 달라질 듯 합니다.)
  function getLaborContract (uint workPlaceInfoIndex, address employeeAddress) public view
  returns(string _period, string _duties, string _workingTime, string _workingDays, string _wage, string _wageday, string _comment) {

    require(workPlaceInfoIndex < workplaceinfo.length, "workplace is not available");

    address employee = address(0);
    uint employeeIndex;
    
    for (employeeIndex = 0 ; employeeIndex  < workplaceinfo[workPlaceInfoIndex].employee.length ; employeeIndex++) {
      if (workplaceinfo[workPlaceInfoIndex].employee[employeeIndex] == employeeAddress) {
        employee = employeeAddress;
        break;
      }
    }

    return (
      workplaceinfo[workPlaceInfoIndex].laborcontract[employeeIndex].period,
      workplaceinfo[workPlaceInfoIndex].laborcontract[employeeIndex].duties,
      workplaceinfo[workPlaceInfoIndex].laborcontract[employeeIndex].workingTime,
      workplaceinfo[workPlaceInfoIndex].laborcontract[employeeIndex].workingDays,
      workplaceinfo[workPlaceInfoIndex].laborcontract[employeeIndex].wage,
      workplaceinfo[workPlaceInfoIndex].laborcontract[employeeIndex].wageday,
      workplaceinfo[workPlaceInfoIndex].laborcontract[employeeIndex].comment);

  }

  //당일 근로자가 일한 시간 조회하는 함수
  //hour(시간), minute(분)을 숫자로 출력합니다   -> 몇 시간 몇 분 근무했는지에 대한 정보
  function getWorkTime (address employeeAddress, uint workPlaceInfoIndex) public returns (uint _hour, uint _minute) {

    require(workPlaceInfoIndex < workplaceinfo.length, "error");

    address employee = address(0);
    uint employeeIndex;
    
    for (employeeIndex = 0 ; employeeIndex  < workplaceinfo[workPlaceInfoIndex].employee.length ; employeeIndex++) {
      if (workplaceinfo[workPlaceInfoIndex].employee[employeeIndex] == employeeAddress) {
        employee = employeeAddress;
        break;
      }
    }

    require(employee != address(0), "you are not employee");

    uint date = 1;                                              //추우에 날짜 기입 방법이 확정될 경우 이용될 수 있음
    uint hour = workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endTimeHour - workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startTimeHour;
    uint minute = workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endTimeMinute - workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startTimeMinute;

    if(hour < 0) {
      hour = hour + 24;
    }

    if (minute < 0) {
      hour = hour - 1;
      minute = minute + 60;
    }

    return (hour, minute);

  }

  //근로자의 급여 조회
  function getPayment (address employeeAddress, uint workPlaceInfoIndex, uint workedYear, uint workedMonth, uint wage) public 
  returns (uint) {

    require(workPlaceInfoIndex < workplaceinfo.length, "error");

    address employee = address(0);
    uint employeeIndex;
    uint Index = 0;
    uint startIndex;
    uint endIndex;
    uint hour;
    uint minute;
    uint dailyWage;
    uint montlyWage = 0;
    
    for (employeeIndex = 0 ; employeeIndex  < workplaceinfo[workPlaceInfoIndex].employee.length ; employeeIndex++) {
      if (workplaceinfo[workPlaceInfoIndex].employee[employeeIndex] == employeeAddress) {
        employee = employeeAddress;
        break;
      }
    }

    require(employee != address(0), "you are not employee");
    
    //출근기록부를 바탕으로 해당 년, 월에 출근한 내역을 뽑아낸다
    //조회를 원하는 년도의 데이터를 갖고 있는 배열의 인덱스 번호를 찾는다
    while(workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startYear[Index] != workedYear){
      Index = Index + 1;
    }

    //이어서 조회를 원하는 월의 데이터를 갖고 있는 배열의 인덱스 번호를 찾는다
    while(workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startMonth[Index] != workedMonth){
      Index = Index + 1;
    }
    //해당 인덱스 번호부터 조회를 원하는 월의 데이터가 아닌 배열이 나타날때까지 다시 조회하여 인덱스 번호를 찾는다
    startIndex = Index;

    while(workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startMonth[Index] == workedMonth){
       Index = Index + 1;
    }
    //조회를 원하는 월의 데이터를 벗어난 시점에서의 인덱스 번호를 마지막 인덱스로 한다
    endIndex = Index;
    //조회하고자 하는 년도, 월의 값을 모두 갖고 있는 인덱스부터 시작하여, 다음달 값이 들어가는 인덱스까지 반복
    for(startIndex; startIndex <endIndex; startIndex++){
      hour = workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endTimeHour[startIndex] - workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startTimeHour[startIndex];
      minute = workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endTimeMinute[startIndex] - workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startTimeMinute[startIndex];

      if(hour < 0) {
        hour = hour + 24;
      }

      if (minute < 0) {
        hour = hour - 1;
        minute = minute + 60;
      }
      dailyWage = (wage/60)*(hour*60+minute);
      montlyWage = monthlyWage + dailyWage;

    }

    return (montlyWage);
  }

  //근로자의 개인 정보 조회하는 함수
  function getEmployeeInformation (address employeeAddress, uint workPlaceInfoIndex ) public view
  returns (address _employee, uint8 _identiNumber, string _name, uint _age, string gender){
  
    require(workPlaceInfoIndex < workplaceinfo.length, "your workplace is not available");

    address employee = address(0);
    uint employeeIndex;
    
    for (employeeIndex = 0 ; employeeIndex  < workplaceinfo[workPlaceInfoIndex].employee.length ; employeeIndex++) {
      if (workplaceinfo[workPlaceInfoIndex].employee[employeeIndex] == employeeAddress) {
        employee = employeeAddress;
        break;
      }
    }

    require(employee != address(0), "you are not employee");

    return (
      workplaceinfo[workPlaceInfoIndex].employee[employeeIndex],
      workplaceinfo[workPlaceInfoIndex].personalInformation[employeeIndex].identiNumber,
      workplaceinfo[workPlaceInfoIndex].personalInformation[employeeIndex].name,
      workplaceinfo[workPlaceInfoIndex].personalInformation[employeeIndex].age,
      workplaceinfo[workPlaceInfoIndex].personalInformation[employeeIndex].gender);

  }


  }

  // 출퇴근 내역을 return하는 함수
  // 후에 프론트 화면에서 요구하는 양식에 따라 변경할 수 있음
  // 출퇴근 출력 내용 중 날짜 부분을 년도, 월, 일 세분화하였습니다.
  function getAttendance (uint workPlaceInfoIndex, address employeeAddress) public view 
  returns (uint [] memory, uint [] memory, uint [] memory, uint [] memory, uint [] memory, 
  uint [] memory, uint [] memory, uint [] memory, uint [] memory, uint [] memory){

    require(workPlaceInfoIndex < workplaceinfo.length, "workplace is not available");

    address employee = address(0);
    uint employeeIndex;
    
    for (employeeIndex = 0 ; employeeIndex  < workplaceinfo[workPlaceInfoIndex].employee.length ; employeeIndex++) {
      if (workplaceinfo[workPlaceInfoIndex].employee[employeeIndex] == employeeAddress) {
        employee = employeeAddress;
        break;
      }
    }

    require(employee != address(0), "you are not employee");

    return (
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startYear,
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startMonth,
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startDate,
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startTimeHour,
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startTimeMinute,
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endYear,
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endMonth,
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endDate,
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endTimeHour,
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endTimeMinute );
  }


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
    workplaceinfo.push(newinfo);

    _person[person].workPlaceInfoIndexList.push(_workplaceIndex);

    _employerWorkplaceList[employer].push(_workplaceIndex);

    _workplaceIndex++;
  }

  // 근로계약서 등록하는 함수
  function uploadLaborContract(string [] laborContractItems, address employee, uint workPlaceIndex) public {

    require(employee == msg.sender, "your not msg.sender!");
    require(_person[employee] == 0, "your not employee!");

    laborContract storage newLabor = laborContract(
      laborContractItems[0], laborContractItems[1], laborContractItems[2], laborContractItems[3],
      laborContractItems[4], laborContractItems[5], laborContractItems[6]);
    laborcontract.push(newLabor);

    _employeeLaborContractList[employee].push(_laborContractIndex);

    _person[employee].workPlaceInfoIndexList.push(workPlaceIndex);

    workplaceinfo[workPlaceIndex].employee.push(employee);
    workplaceinfo[workPlaceIndex].laborContractIndex.push(_laborContractIndex);

    _laborContractIndex++;

  }

  // 출퇴근 올리는 함수
  // classifyNum : 0 -> 출근 / 1 -> 퇴근
  // 날짜 입력 형식을 기존 string 형식에서 uint 년도, uint 몇월, uint 몇일 형식으로 변경하였습니다.
  function uploadAttendance (uint8 classifyNum, uint year, uint month, uint date,
  uint timeHour, uint timeMinute, uint workPlaceInfoIndex) public returns (uint8) {

    require(workPlaceInfoIndex < workplaceinfo.length, "your workplace is not available");

    address employee = address(0);
    uint employeeIndex;
    
    for (employeeIndex = 0 ; employeeIndex  < workplaceinfo[workPlaceInfoIndex].employee.length ; employeeIndex++) {
      if (workplaceinfo[workPlaceInfoIndex].employee[employeeIndex] == msg.sender) {
        employee = msg.sender;
        break;
      }
    }

    require(employee != address(0), "you are not employee");

    if (classifyNum == 0) {

      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startYear.push(year);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startMonth.push(month);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startDate.push(date);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startTimeHour.push(timeHour);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startTimeMinute.push(timeMinute);
      
    } else if (classifyNum == 1){

      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endYear.push(year);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endMonth.push(month);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endDate.push(date);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endTimeHour.push(timeHour);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endTimeMinute.push(timeMinute);

    }

    return 1;

  }




}
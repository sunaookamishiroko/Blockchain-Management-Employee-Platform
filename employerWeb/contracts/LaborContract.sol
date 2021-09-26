// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LaborContract {
  
  // 사람과 개인정보 mapping
  mapping(address => personalInfo) private _person;

  // 고용주의 사업장 리스트 index mapping
  mapping(address => uint256 []) private _employerWorkplaceList;

  // 근로자의 근로계약서 리스트 index mapping
  mapping(address => uint256 []) private _employeeLaborContractList;

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
  // employee와 attendance는 index 번호 같아야함 -> 검색 쉽게 하기 위함
  struct workplaceInfo {
    string name;
    string location;
    address [] employee;
    attendance [] attendanceList;
  }

  // 출톼근 기록부
  // 후에 프론트 화면에서 요구하는 양식에 따라 변경할 수 있음
  struct attendance {
    string [] startDay;
    uint [] startTimeHour;
    uint [] startTimeMinute;
    string [] endDay;
    uint [] endTimeHour;
    uint [] endTimeMinute;
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

  personalInfo [] personalinfo;
  workplaceInfo [] workplaceinfo;
  laborContract [] laborcontract;

  //근로자의 근무지 조회하는 함수
  // 후에 프론트 화면에서 요구하는 양식에 따라 변경할 수 있음
  function checkWorkplace (address employeeAddress, uint workPlaceInfoIndex ) public returns (string _name, string _location){
  
    require(workPlaceInfoIndex < workplaceinfo.length, "your workplace is not available");

    address employee = address(0);
    uint employeeIndex;
    
    for (employeeIndex = 0 ; employeeIndex  <= workplaceinfo[workPlaceInfoIndex].employee.length ; employeeIndex++) {
      if (workplaceinfo[workPlaceInfoIndex].employee[employeeIndex] == employeeAddress) {
        employee = employeeAddress;
        break;
      }
    }

    require(employee != address(0), "you are not employee");

    return (
      workplaceinfo[workPlaceInfoIndex].name,
      workplaceinfo[workPlaceInfoIndex].location);

  }


  //근로자의 근로계약서를 조회하는 함수
  //아직 미완성 입니다.(근로계약서 등록을 어떻게 하냐에 따라 조회 방법이 달라질 듯 합니다.)
  function checkLaborContract (address employeeAddress) public view
  returns(string _period, string _duties, string _workingTime, string _workingDays, string _wage, string _wageday, string _comment) {


    return (
      laborcontract[].period,
      laborcontract[].duties,
      laborcontract[].workingTime,
      laborcontract[].workingDays,
      laborcontract[].wage,
      laborcontract[].wageday,
      laborcontract[].comment);

  }

  //당일 근로자가 일한 시간 조회하는 함수
  //hour(시간), minute(분)을 숫자로 출력합니다   -> 몇 시간 몇 분 근무했는지에 대한 정보
  function checkWorkTime (address employeeAddress, uint workPlaceInfoIndex) public returns (uint _hour, uint _minute) {

    require(workPlaceInfoIndex < workplaceinfo.length, "error");

    address employee = address(0);
    uint employeeIndex;
    
    for (employeeIndex = 0 ; employeeIndex  <= workplaceinfo[workPlaceInfoIndex].employee.length ; employeeIndex++) {
      if (workplaceinfo[workPlaceInfoIndex].employee[employeeIndex] == employeeAdress) {
        employee = employeeAdress;
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
  function checkPayment (address employeeAddress) public returns () {


  }

  // 출퇴근 올리는 함수
  // classifyNum : 0 -> 출근 / 1 -> 퇴근
  function uploadAttendance (uint8 classifyNum, string memory day, uint timeHour, 
  uint timeMinute, uint workPlaceInfoIndex) public returns (uint8) {

    require(workPlaceInfoIndex < workplaceinfo.length, "your workplace is not available");

    address employee = address(0);
    uint employeeIndex;
    
    for (employeeIndex = 0 ; employeeIndex  <= workplaceinfo[workPlaceInfoIndex].employee.length ; employeeIndex++) {
      if (workplaceinfo[workPlaceInfoIndex].employee[employeeIndex] == msg.sender) {
        employee = msg.sender;
        break;
      }
    }

    require(employee != address(0), "you are not employee");

    if (classifyNum == 0) {

      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startDay.push(day);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startTimeHour.push(timeHour);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startTimeMinute.push(timeMinute);
      
    } else if (classifyNum == 1){

      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endDay.push(day);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endTimeHour.push(timeHour);
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endTimeMinute.push(timeMinute);

    }

    return 1;

  }

  // 출퇴근 내역을 return하는 함수
  // 후에 프론트 화면에서 요구하는 양식에 따라 변경할 수 있음
  function checkAttendance (uint workPlaceInfoIndex, address employeeAdress) public view 
  returns (string [] memory, uint [] memory, uint [] memory, string [] memory, uint [] memory, uint [] memory){

    require(workPlaceInfoIndex < workplaceinfo.length, "workplace is not available");

    address employee = address(0);
    uint employeeIndex;
    
    for (employeeIndex = 0 ; employeeIndex  <= workplaceinfo[workPlaceInfoIndex].employee.length ; employeeIndex++) {
      if (workplaceinfo[workPlaceInfoIndex].employee[employeeIndex] == employeeAdress) {
        employee = employeeAdress;
        break;
      }
    }

    require(employee != address(0), "you are not employee");

    return (
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startDay,
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startTimeHour,
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].startTimeMinute,
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endDay,
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endTimeHour,
      workplaceinfo[workPlaceInfoIndex].attendanceList[employeeIndex].endTimeMinute );
  }


}
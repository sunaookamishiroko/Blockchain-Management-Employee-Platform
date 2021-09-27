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
    address employer;                  // 사업장 정보에 고용주 address 추가
    address [] employee;
    attendance [] attendanceList;
  }

  // 출퇴근 기록부
  // 후에 프론트 화면에서 요구하는 양식에 따라 변경할 수 있음
  struct attendance {
    string [] startDay;
    uint [] startTimeHour;
    uint [] startTimeMinute;
    string [] endDay;
    uint [] endTimeHour;
    uint [] endTimeMinute;
  }

  // 근로계약서 저장소
  // 후에 프론트를 생각하여 근로시작시간 / 근무주기를 추가함
  struct laborContract {
    string period;            // 근로계약기간 
    string duties;            // 업무내용
    string workingStartTime;  // 근로시작시간
    string workingTime;       // 소정근로시간
    string workingCycle;      // 근무주기
    string workingDays;       // 근무일
    string wage;              // 임금(시급)
    string wageday;           // 임금지급일
    string comment;           // 기타사항
  }

  // 근로 계약 전 근로자 임시 저장소
  struct temporaryLabor{
    uint8 identiNumber;
    string name;
    uint age;
    string gender;
    address employee;
  }
  

  // 근로 계약 전 계약서 임시 저장소
  struct temporaryContract{
    string period;            // 근로계약기간 
    string duties;            // 업무내용
    string workingStartTime;  // 근로시작시간
    string workingTime;       // 소정근로시간
    string workingCycle;      // 근무주기
    string workingDays;       // 근무일
    string wage;              // 임금(시급)
    string wageday;           // 임금지급일
    string comment;           // 기타사항
  }
  //struct 배열 선언부

  personalInfo [] personalinfo;
  workplaceInfo [] workplaceinfo;
  laborContract [] laborcontract;
  temporaryLabor [] temporarylabor;          // 임시 저장소(근로자)
  temporaryContract [] temporarycontract;    // 임시 저장소(계약서)

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

  //근로자의 근로계약서 신청 함수(본인의 address 등록 및 개인정보 등록)
  function signupContract(uint identiNumber, string name, uint age, string gender, uint workPlaceInfoIndex, uint employeeIndex) public returns (uint8) {

    address employee = address(0);

    employee = msg.sender;

    //근로자가 본인의 개인정보를 데이터에 입력
    temporaryLabor[employeeIndex].identiNumber.push(identiNumber);
    temporaryLabor[employeeIndex].name.push(name);
    temporaryLabor[employeeIndex].age.push(age);
    temporaryLabor[employeeIndex].gender.push(gender);
    temporaryLabor[employeeIndex].identiNumber.push(identiNumber);
    temporaryLabor[employeeIndex].employee.push(employee);   
  }


  //고용주 address에서 근로계약서 조건 업로드 함수
  function uploadRequirement(uint8 classifyNum, string period, string duties,
  string workingStartTime, string workingTime, string workingCycle, string workingDays, 
  string wage, string wageday, string comment, uint workPlaceInfoIndex, uint employeeIndex) public returns (uint8) {
  //근로자의 index를 안다고 가정한 경우로 진행중 추후 변경 가능

    //사업장 확인작업
    require(workPlaceInfoIndex < workplaceinfo.length, "workplace is not available");

    address employer = address(0);

    // 고용주 확인 작업
    if (workplaceinfo[workPlaceInfoIndex].employer == msg.sender) {
      employer == msg.sender;
      break;
    } 
    else if(workpalceinfo[workPlaceInfoIndex].employer != msg.sender) {
      // 무슨 내용 들어가야될 지 미정
      break;
    }

    // 근로자 확인작업 (근로자가 신청을 했을 경우, 임시 데이터에 근로자의 데이터가 올라감)
    require(employeeIndex < temporaryContract.length, "The employee don't sign up for your workplace")

    // 근로자 확인
    require(employer != address(0), "you are not employer in this workplace");

    //임시계약서에 데이터 저장
    temporaryContract[employeeIndex].period.push(period);
    temporaryContract[employeeIndex].duties.push(duties);
    temporaryContract[employeeIndex].workingStartTime.push(workingStartTime);
    temporaryContract[employeeIndex].workingTime.push(workingTime);
    temporaryContract[employeeIndex].workingCycle.push(workingCycle);
    temporaryContract[employeeIndex].workingDays.push(workingDays);
    temporaryContract[employeeIndex].wage.push(wage);
    temporaryContract[employeeIndex].wageday.push(wageday);
    temporaryContract[employeeIndex].comment.push(comment);
    
    return 1;

  }

  // 근로자가 임시 근로계약서 확인 함수
  function sendContract(uint employeeIndex) {

  }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LaborContract {
  
  // 사람과 개인정보 mapping
  mapping(address => personalInfo) private _person;

  // 고용주의 사업장 리스트 index mapping
  mapping(address => uint256 []) private _employerWorkplaceList;

<<<<<<< Updated upstream
  // 근로자의 근무지 리스트 index mapping
  mapping(address => uint256 []) private _employeeWorkplaceList;

=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
    string residence;
>>>>>>> Stashed changes
  }

  // 사업장 정보
  // employee와 attendance는 index 번호 같아야함 -> 검색 쉽게 하기 위함
  struct workplaceInfo {
<<<<<<< Updated upstream
    string name;
    string location;
    address [] employee;
    attendance [] attendanceList;
    laborContract [] laborcontract;
    personalInfo [] personalInformation;
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
=======
    string employerName;
    string workplaceName;
    string name;
    string location;
    address employer;                  // 사업장 정보에 고용주 address 추가
    address [] employee;
    attendance [] attendanceList;
  }

  // 출퇴근 기록부
  // 후에 프론트 화면에서 요구하는 양식에 따라 변경할 수 있음
  struct attendance {
    //string [] startDay;
    uint [] startYear;
    uint [] startMonth;
    uint [] startDate;
    uint [] startTimeHour;
    uint [] startTimeMinute;
    //string [] endDay;
    uint [] endYear;
    uint [] endMonth;
    uint [] endDate;
    uint [] endTimeHour;
    uint [] endTimeMinute;
>>>>>>> Stashed changes
  }

  //해당 월 출근 기록부
  struct monthlyAttendance {
    uint [] month;             //몇 월의 기록인지 저장
    uint [] workDate;          //근로자가 해당 월에 며칠 일했는지 저장
    uint [] workHour;          //근로자가 해당 월에 몇 시간 일했는지 저장
  }

  // 근로계약서 저장소
  struct laborContract {
<<<<<<< Updated upstream
    string peroid;            // 근로계약기간 
    string duties;            // 업무내용
    string workingTime;       // 소정근로시간
=======
    address employer;
    address employee;
    string employeeName;
    string employerName;
    string peroid;            // 근로계약기간 
    string duties;            // 업무내용
    string workingStartTime;
    string workingTime;
    string workingCycle       // 소정근로시간
>>>>>>> Stashed changes
    string workingDays;       // 근무일
    string wage;              // 임금(시급)
    string wageday;           // 임금지급일
    string comment;           // 기타사항
  }
  
  //struct 배열 선언부
<<<<<<< Updated upstream
  personalInfo [] personalinfo;
  workplaceInfo [] workplaceinfo;
  laborContract [] laborcontract;

  //사람 개인정보 추가
  function addPeopleInfo(address ethAddress, uint8 identiNumber, string name, uint age, string gender) public {
    _person[ethAddress].identiNumber = identiNumber;
    _person[ethAddress].name = name;
    _person[ethAddress].age = age;
    _person[ethAddress].gender = gender;
  }

  //근로자의 근무지들 조회하는 함수
  function checkWorkplace (address employeeAddress) public returns (uint [], string [], string []){
    
    uint [] array = _employeeWorkplaceList[employeeAddress];
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
  function checkLaborContract (uint workPlaceInfoIndex, address employeeAddress) public view
  returns(string _period, string _duties, string _workingTime, string _workingDays, string _wage, string _wageday, string _comment) {

    require(workPlaceInfoIndex < workplaceinfo.length, "workplace is not available");
=======

  personalInfo [] personalinfo;
  workplaceInfo [] workplaceinfo;
  laborContract [] laborcontract;
  temporaryLabor [] temporarylabor;
  temporaryContract [] temporarycontract;

  //0. 고용주의 사업장 등록
  frunction registerWorkplace(string employerName, string workplaceName, string location) public returns (uint8){
      
      address employer;
      employer = msg.sender;
      uint max = 10000; // 추후 수정

      for(uint workplaceIndex = 0 ; workplaceIndex <= max ; workplaceIndex++){
          //if(workplaceInfo[workplaceIndex].workplaceName에 데이터가 없을 경우)
          {
            workplaceInfo[workplaceIndex].employerName.push(employerName);
            workplaceInfo[workplaceIndex].workplaceName.push(workplaceName);
            workplaceInfo[workplaceIndex].location.push(location);
            workplaceInfo[workplaceIndex].employer.push(employer);
            break;
          }
      } 
  }

  /* 
  1. 근로자가 고용주에게 근로계약서 요청 함수
    (근로자는 고용주에게 본인의 address 및 개인정보를 제시하면서 임시 근로계약서를 요청한다)
  */
  function requestContract(uint registationNum, string name, uint age, string gender, string residence) private returns (uint8){

    public address employee;
    employee = msg.sender;
    uint max = 10000; // 추후 수정

    for(uint employeeIndex = 0 ; employeeIndex <= max ; employeeIndex++){
        //if(temporaryLabor[employeeIndex].name에 데이터가 없을 경우)
        {
          temporaryLabor[employeeIndex].registationNum.push(registationNum);
          temporaryLabor[employeeIndex].name.push(name);
          temporaryLabor[employeeIndex].age.push(age);
          temporaryLabor[employeeIndex].gender.push(gender);
          temporaryLabor[employeeIndex].residence.push(residence);
          temporaryLabor[employeeIndex].employee.push(employee);
          break;
        }
    }

    return 1;

  }

  //2. 고용주가 임시 근로계약서 작성(근로 신청한 근로자의 주민등록번호, 이름을 입력하여 근로자 확인)
  function uploadRequirement(uint registationNum, string name, string period, string duties, string workingStartTime, string workingTime, 
  string workingCycle, string workingDays, string wage, string wageday, string comment) public returns (uint8) {

    uint max = 10000; // 추후 수정

    //사업장, 근로자 확인작업
    for(uint workplaceIndex = 0 ; workplaceIndex <= workplaceInfo.length ; workplaceIndex++){
        if(workplaceInfo[workplaceIndex].employer == msg.sender)
        {
            for(uint employeeIndex = 0 ; employeeIndex <= temporaryLabor.length ; employeeIndex++){
                if(temporaryLabor[employeeIndex].registationNum == registationNum)
                {
                    for(uint tempContractIndex = 0 ; tempContractIndex <= max ; tempContractIndex++){
                        //if(temporaryContract[contractIndex].employer에 데이터가 없다면)
                        {
                            temporaryContract[tempContractIndex].employer.push(msg.sender);
                            temporaryContract[tempContractIndex].employee.push(temporaryLabor[employeeIndex].employee);
                            temporaryContract[tempContractIndex].employerName.push(workplaceInfo[workplaceIndex].employerName);
                            temporaryContract[tempContractIndex].employeeName.push(name);
                            temporaryContract[tempContractIndex].period.push(period);
                            temporaryContract[tempContractIndex].duties.push(duties);
                            temporaryContract[tempContractIndex].workingStartTime.push(workingStartTime);
                            temporaryContract[tempContractIndex].workingTime.push(workingTime);
                            temporaryContract[tempContractIndex].workingCycle.push(workingCycle);
                            temporaryContract[tempContractIndex].workingDays.push(workingDays);
                            temporaryContract[tempContractIndex].wage.push(wage);
                            temporaryContract[tempContractIndex].wageday.push(wageday);
                            temporaryContract[tempContractIndex].comment.push(comment);
                            break;
                        }
                    }
                }
            }
        }
    }

    return 1;

  }

  //3. 근로자가 임시 근로계약서 확인
  function checkTemporaryContract() public view returns (string _employerName, string _period, string _duties, 
  string _workingStartTime, string _workingTime, string _workingCycle, string _workingDays, string _wage, string _wageday, string _comment){
    
    uint contractNum = 0;
    
    for(uint tempContractIndex = 0 ; tempContractIndex <= temporaryContract.length ; tempContractIndex++){
        if(temporaryContract[tempContractIndex].employee == msg.sender){
            contractNum = 1;
        }
    }

    require(contractNum != 1, "It isn't your contract in temporary contracts");

    return(
            temporaryContract[tempContractIndex].employerName,
            temporaryContract[tempContractIndex].period,
            temporaryContract[tempContractIndex].duties,
            temporaryContract[tempContractIndex].workingStartTime,
            temporaryContract[tempContractIndex].workingTime,
            temporaryContract[tempContractIndex].workingDays,
            temporaryContract[tempContractIndex].wage,
            temporaryContract[tempContractIndex].wageday,
            temporaryContract[tempContractIndex].comment);

  }

  //4. 근로자가 근로 계약서 확인 후 등록(checkNum : 0 -> 동의 / 1 -> 비동의)
  function registerContract(uint tempContractIndex, uint checkNum) returns (uint8){

    uint max = 1000000;

    for(uint tempContractIndex = 0 ; tempContractIndex <= temporaryContract.length ; tempContractIndex++){
        if(temporaryContract[tempContractIndex].employee == msg.sender){
            contractNum = 1;
        }
    }

    require(contractNum != 1, "It isn't your contract in temporary contracts");

    if(checkNum == 0)
    {
        for(uint contractIndex = 0 ; contractIndex <= max ; contractIndex++){
            if(laborContract[contractIndex].employerName에 데이터가 없다면){
                laborContract[contractIndex].employer.push(temporaryContract[tempContractIndex].employer);
                laborContract[contractIndex].employee.push(temporaryContract[tempContractIndex].employee);
                laborContract[contractIndex].employerName.push(temporaryContract[tempContractIndex].employerName);
                laborContract[contractIndex].employeeName.push(temporaryContract[tempContractIndex].employeeName);
                laborContract[contractIndex].period.push(temporaryContract[tempContractIndex].period);
                laborContract[contractIndex].duties.push(temporaryContract[tempContractIndex].duties);
                laborContract[contractIndex].workingStartTime.push(temporaryContract[tempContractIndex].workingStartTime);
                laborContract[contractIndex].workingTime.push(temporaryContract[tempContractIndex].workingTime);
                laborContract[contractIndex].workingCycle.push(temporaryContract[tempContractIndex].workingCycle);
                laborContract[contractIndex].workingDays.push(temporaryContract[tempContractIndex].workingDays);
                laborContract[contractIndex].wage.push(temporaryContract[tempContractIndex].wage);
                laborContract[contractIndex].wageday.push(temporaryContract[tempContractIndex].wageday);
                laborContract[contractIndex].comment.push(temporaryContract[tempContractIndex].comment);
            }
        }
    }

    if(checkNum == 1)
    {
        //이 부분은 협의 후에 정해야될 것으로 보입니다.
    }
    return 1;
  }

  //근로자의 근무지 조회하는 함수
  // 후에 프론트 화면에서 요구하는 양식에 따라 변경할 수 있음
  function checkWorkplace (address employeeAddress, uint workPlaceInfoIndex ) public returns (string _name, string _location){
  
    require(workPlaceInfoIndex < workplaceinfo.length, "your workplace is not available");
>>>>>>> Stashed changes

    address employee = address(0);
    uint employeeIndex;
    
<<<<<<< Updated upstream
    for (employeeIndex = 0 ; employeeIndex  < workplaceinfo[workPlaceInfoIndex].employee.length ; employeeIndex++) {
=======
    for (employeeIndex = 0 ; employeeIndex  <= workplaceinfo[workPlaceInfoIndex].employee.length ; employeeIndex++) {
>>>>>>> Stashed changes
      if (workplaceinfo[workPlaceInfoIndex].employee[employeeIndex] == employeeAddress) {
        employee = employeeAddress;
        break;
      }
    }

<<<<<<< Updated upstream
    return (
      workplaceinfo[workPlaceInfoIndex].laborcontract[employeeIndex].period,
      workplaceinfo[workPlaceInfoIndex].laborcontract[employeeIndex].duties,
      workplaceinfo[workPlaceInfoIndex].laborcontract[employeeIndex].workingTime,
      workplaceinfo[workPlaceInfoIndex].laborcontract[employeeIndex].workingDays,
      workplaceinfo[workPlaceInfoIndex].laborcontract[employeeIndex].wage,
      workplaceinfo[workPlaceInfoIndex].laborcontract[employeeIndex].wageday,
      workplaceinfo[workPlaceInfoIndex].laborcontract[employeeIndex].comment);
=======
    require(employee != address(0), "you are not employee");

    return (
      workplaceinfo[workPlaceInfoIndex].name,
      workplaceinfo[workPlaceInfoIndex].location);

  }


  //근로자의 근로계약서를 조회하는 함수
  //아직 미완성 입니다.(근로계약서 등록을 어떻게 하냐에 따라 조회 방법이 달라질 듯 합니다.)
  function checkLaborContract (address employeeAddress) public view
  returns(string _period, string _duties, string _workingTime, string _workingDays, string _wage, string _wageday, string _comment) {

    //require문에 본인의 어드레스랑 근로계약서의 어드레스 비교하는 과정 넣으면 됨(for문써서)

    return (
      laborcontract[].period,
      laborcontract[].duties,
      laborcontract[].workingTime,
      laborcontract[].workingDays,
      laborcontract[].wage,
      laborcontract[].wageday,
      laborcontract[].comment);
>>>>>>> Stashed changes

  }

  //당일 근로자가 일한 시간 조회하는 함수
  //hour(시간), minute(분)을 숫자로 출력합니다   -> 몇 시간 몇 분 근무했는지에 대한 정보
  function checkWorkTime (address employeeAddress, uint workPlaceInfoIndex) public returns (uint _hour, uint _minute) {

    require(workPlaceInfoIndex < workplaceinfo.length, "error");

    address employee = address(0);
    uint employeeIndex;
    
<<<<<<< Updated upstream
    for (employeeIndex = 0 ; employeeIndex  < workplaceinfo[workPlaceInfoIndex].employee.length ; employeeIndex++) {
=======
    for (employeeIndex = 0 ; employeeIndex  <= workplaceinfo[workPlaceInfoIndex].employee.length ; employeeIndex++) {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  function checkPayment (address employeeAddress, uint workPlaceInfoIndex, uint workedYear, uint workedMonth, uint wage) public 
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
  function checkEmployeeInformation (address employeeAddress, uint workPlaceInfoIndex ) public view
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
=======
  function checkPayment (address employeeAddress) public returns ( ) {
>>>>>>> Stashed changes


  }

  // 출퇴근 올리는 함수
  // classifyNum : 0 -> 출근 / 1 -> 퇴근
  // 날짜 입력 형식을 기존 string 형식에서 uint 년도, uint 몇월, uint 몇일 형식으로 변경하였습니다.
  function uploadAttendance (uint8 classifyNum, uint year, uint month, uint date,
  uint timeHour, uint timeMinute, uint workPlaceInfoIndex) public returns (uint8) {

    require(workPlaceInfoIndex < workplaceinfo.length, "your workplace is not available");

    address employee = address(0);
    uint employeeIndex;
    
<<<<<<< Updated upstream
    for (employeeIndex = 0 ; employeeIndex  < workplaceinfo[workPlaceInfoIndex].employee.length ; employeeIndex++) {
=======
    for (employeeIndex = 0 ; employeeIndex  <= workplaceinfo[workPlaceInfoIndex].employee.length ; employeeIndex++) {
>>>>>>> Stashed changes
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

  // 출퇴근 내역을 return하는 함수
  // 후에 프론트 화면에서 요구하는 양식에 따라 변경할 수 있음
  // 출퇴근 출력 내용 중 날짜 부분을 년도, 월, 일 세분화하였습니다.
  function checkAttendance (uint workPlaceInfoIndex, address employeeAddress) public view 
  returns (uint [] memory, uint [] memory, uint [] memory, uint [] memory, uint [] memory, 
  uint [] memory, uint [] memory, uint [] memory, uint [] memory, uint [] memory){

    require(workPlaceInfoIndex < workplaceinfo.length, "workplace is not available");

    address employee = address(0);
    uint employeeIndex;
    
<<<<<<< Updated upstream
    for (employeeIndex = 0 ; employeeIndex  < workplaceinfo[workPlaceInfoIndex].employee.length ; employeeIndex++) {
=======
    for (employeeIndex = 0 ; employeeIndex  <= workplaceinfo[workPlaceInfoIndex].employee.length ; employeeIndex++) {
>>>>>>> Stashed changes
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


}
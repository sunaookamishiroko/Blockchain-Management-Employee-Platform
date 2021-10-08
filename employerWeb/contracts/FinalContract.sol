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
    string residence;     //거주지 추가
  }

  // 사업장 정보
  // employee와 attendance는 index 번호 같아야함 -> 검색 쉽게 하기 위함
  struct workplaceInfo {
    string employerName;            // 고용주명
    string workplaceName;           // 사업장명
    string location;                // 사업장 위치
    address employer;               // 고용주 address
    address [] employee;            // 근로자
    attendance [] attendanceList;   // 근로자 출석부
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
  struct laborContract {
    string employeeName;      // 근로자 이름
    string employerName;      // 고용주 이름
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
    uint registationNum;  // 주민등록번호 등록 추가
    string name;
    uint age;
    string gender;
    string residence;
    address employee;
  }
  

  // 근로 계약 전 계약서 임시 저장소
  struct temporaryContract{
    address employer;         // 고용주 address
    address employee;         // 근로자 address
    string employerName;      // 고용주명
    string employeeName;      // 근로자명
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

  //2. 고용주가 임시 근로계약서 작성(근로 신청한 근로자의 주민등록번호를 입력하여 근로자 확인)
  function uploadRequirement(uint registationNum, string period, string duties, string workingStartTime, string workingTime, 
  string workingCycle, string workingDays, string wage, string wageday, string comment) public returns (uint8) {

    uint max = 10000; // 추후 수정

    //사업장, 근로자 확인작업
    for(uint workplaceIndex = 0 ; workplaceIndex <= workplaceInfo.length ; workplaceIndex++){
        if(workplaceInfo[workplaceIndex].employer == msg.sender)
        {
            for(uint employeeIndex = 0 ; employeeIndex <= temporaryLabor.length ; employeeIndex++){
                if(temporaryLabor[employeeIndex].registationNum == registationNum)
                {
                    for(uint contractIndex = 0 ; contractIndex <= max ; contractIndex++){
                        //if(temporaryContract[contractIndex].employer에 데이터가 없다면)
                        {
                            temporaryContract[contractIndex].employer.push(msg.sender);
                            temporaryContract[contractIndex].employee.push(temporaryLabor[employeeIndex].employee);
                            temporaryContract[contractIndex].employerName.push(workplaceInfo[workplaceIndex].employerName);
                            temporaryContract[contractIndex].period.push(period);
                            temporaryContract[contractIndex].duties.push(duties);
                            temporaryContract[contractIndex].workingStartTime.push(workingStartTime);
                            temporaryContract[contractIndex].workingTime.push(workingTime);
                            temporaryContract[contractIndex].workingCycle.push(workingCycle);
                            temporaryContract[contractIndex].workingDays.push(workingDays);
                            temporaryContract[contractIndex].wage.push(wage);
                            temporaryContract[contractIndex].wageday.push(wageday);
                            temporaryContract[contractIndex].comment.push(comment);
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
    
    for(uint contractIndex = 0 ; contractIndex <= temporaryContract.length ; contractIndex++){
        if(temporaryContract[contractIndex].employee == msg.sender){
            contractNum = 1;
        }
    }

    require(contractNum != 1, "It isn't your contract in temporary contracts");

    return(
            temporaryContract[contractIndex].employerName,
            temporaryContract[contractIndex].period
            temporaryContract[contractIndex].duties
            temporaryContract[contractIndex].workingStartTime
            temporaryContract[contractIndex].workingTime
            temporaryContract[contractIndex].workingDays
            temporaryContract[contractIndex].wage
            temporaryContract[contractIndex].wageday
            temporaryContract[contractIndex].comment);

  }

  
  
}
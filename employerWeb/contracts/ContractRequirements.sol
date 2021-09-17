// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LaborContract{
  
  // 근로계약서 저장소
  // 후에 프론트를 생각하여 근로시작시간 / 근무주기를 추가함
  struct laborContract {
    string peroid;            // 근로계약기간 
    string duties;            // 업무내용
    string workingStartTime;  // 근로시작시간
    string workingTime;       // 소정근로시간
    string workingCycle;      // 근무주기
    string workingDays;       // 근무일
    string wage;              // 임금(시급)
    string wageday;           // 임금지급일
    string comment;           // 기타사항
  }
    
    /* 
    근로계약서 예시(추가로 들어갈 내용이 있을 수 있음)
    9월 10일(startDay)부터 3개월동안(laborPeriod) 매주(laborCycle) 주말(laborDayofWeek)에
    10시 30분부터 16시까지(Time) 시간 당 1만원 씩 계산하여 매달 10일(wageDay)에 지급된다. 특이사항(additionalRequirment)은 다음과 같다.
    */

  }
  //근로계약서 조건 올리는 함수
  function uploadRequirement ()
}
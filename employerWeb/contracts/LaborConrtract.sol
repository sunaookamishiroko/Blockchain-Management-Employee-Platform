// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LaborContract {
  
  mapping(address => personalInfo) person;
  mapping(address => workplaceInfo) employerWorkplace;
  
  //identiNumber : 0 => 근로자 1 => 고용주
  struct personalInfo {
    uint8 identiNumber;
    string name;
    uint age;
    string gender;
  }

  struct workplaceInfo {
    string name;
    string location;
  }



}

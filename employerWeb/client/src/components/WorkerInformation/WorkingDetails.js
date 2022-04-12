import React from "react";
import styled from "styled-components";

const StyeldWorkingDetails = styled.div`
  display: grid;
  grid-template-columns: 150px 150px 150px 150px;
  grid-template-rows: 60px 60px;

  background-color: #0000ff16;

  h4 {
    align-self: center;
    width: 140px;
    color: #999999;
    font-size: 20px;
    font-weight: bold;
  }

  p {
    align-self: center;
    color: #999999;
    font-size: 20px;
  }
`;
/*
const Detail = styled.h5`
  margin-top: 8px;
  font-size: 16px;
  color: #999999;
  height: 5px;

  span {
    color: #1c89e9;
  }
`;*/

const WorkingDetails = ({ laborContract, userData, workPlaceData }) => {
  const categories = ["입사일", "근무일수", "마지막 근무일", "지각률"];

  return (
    <>
      {console.log(laborContract)}
      <StyeldWorkingDetails>
        {/* TODO 입사일, 근무일수, 마지막 근무일, 지각률 처리할 것 */}
        {categories.map((category, index) => (
          <>
            <h4>{category}: </h4>
            <p>{userData[index]}</p>
          </>
        ))}
      </StyeldWorkingDetails>
    </>
  );

  /*
      <Detail>
        {workPlaceData[0]}의 재직자 평균 근무일수는
        <span> {workPlaceData[1]}</span>, 평균 지각률은
        <span> {workPlaceData[2]}</span> 입니다.
      </Detail>
  */
};

export default WorkingDetails;

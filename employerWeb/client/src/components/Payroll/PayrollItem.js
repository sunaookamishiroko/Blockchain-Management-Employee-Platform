import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const SettlementButton = styled(NavLink)`
  background-color: #2669a4;
  font-family: "Noto Sans CJK KR";
  font-weight: bold;
  border: 0px;
  color: white;
  text-decoration: none;
  font-size: 20px;
  border-radius: 30px;
  padding-left: 30px;
  padding-right: 30px;
`;

const PayrollItem = ({ index, address, name, total, payWage }) => {
    const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(
      address.length - 6,
      address.length
    )}`;
  }

  return (
    <tr>
      <td> {index} </td>
      <td> {name}</td> 
      <td> {shortenAddress(address)} </td>  
      <td>{total}</td>
      <td>
        <button 
            onClick={() => {
              payWage(name,total,address);
            }}>지급하기</button>
      </td>
            <td>
        <SettlementButton
          onDragExitCapture={("" === "main").toString()}
          to="/Settlement"
          state={{ 
            name:name, 
            address:address 
          }}>
          정산하기
        </SettlementButton>
      </td>
    </tr>
  );
};

export default PayrollItem;

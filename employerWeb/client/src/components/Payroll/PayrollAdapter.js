import React, { useState } from "react";
import styled from "styled-components";
import PayrollItem from "./PayrollItem";

const Adapter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  border-radius: 20px;
  background-color: #f7f7f7;
  padding: 0 24px 0 24px;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  tr {
    align-items: center;
    &::nth-child(even) {
      background-color: #f8f9fa;
    }
    & + & {
      border-top: 1px solid #dee2e6;
      margin-bottom: 50px;
    }
    th {
      text-align: center;
      font-family: "Noto Sans CJK KR";
      font-size: 24px;
      color: #999999;
      font-weight: bold;
      border-bottom: 6px solid #f1f1f1;
    }
    td {
      padding: 15px;
      text-align: center;
      font-family: "Noto Sans CJK KR";
      font-size: 20px;
      color: #999999;
      font-weight: bold;
    }
  }
`;

const PayrollAdapter = ({ workers, payWage }) => {
  return (
    <Adapter>
      <h1>근로자 목록</h1>
      <table>
        <tr>
          <th>번호</th>
          <th>이름</th>
          <th>Address</th>
          <th>총액</th>
          <th>급여지급</th>
          <th>급여정산</th>
        </tr>
        <tr>
          <td>tet</td>
          <td>tet</td>
          <td>tet</td>
          <td>tet</td>
        </tr>

        {workers.map((x, index) => (
          <PayrollItem
            index={index + 1}
            address={workers[index][0]}
            name={workers[index][1]}
            total={workers[index][2]}
            payWage={payWage}
          />
        ))}
      </table>
    </Adapter>
  );
};

export default PayrollAdapter;

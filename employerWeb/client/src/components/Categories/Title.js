import React from "react";

const Title = ({ name }) => {
  return (
    <>
      <p
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: "28px",
          marginBottom: "-10px",
          fontWeight: "bold",
        }}
      >
        반갑습니다!
      </p>
      <p
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: "18px",
          marginBottom: "-10px",
          color: "#1C89E9",
          fontWeight: "bold",
        }}
      >
        CU 편의점 산기대점
      </p>
      <p
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        <span style={{ color: "#1C89E9" }}> {name ? name : "홍길동"}</span>
        &nbsp;사장님
      </p>
    </>
  );
};
export default Title;

import { Dialog } from "@mui/material";
import React, { useState, useCallback } from "react";
import styled, { css } from "styled-components";
import SubmitDialog from "./Dialog/SubmitDialog";
//import { firestore } from "./firebase.js";
//import { collection, addDoc } from "firebase/firestore";

const Content = styled.div`
  display: flex;
  flex-direction: column;

  margin: 30px;
  padding: 10px;

  width: 100%;
  height: auto;

  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
  border-radius: 20px;

  background-color: #f7f7f7;

  h1 {
    font-size: 26px;
    font-family: "Noto Sans CJK KR";
  }

  form > div {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }
`;

const LeftInput = styled.div`
  width: 100%;
`;

const RightInput = styled.div`
  width: 100%;
`;

const SubmitDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 260px;
    border-radius: 30px;
    font-family: "Noto Sans CJK KR";
    border: 0px;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    background-color: #1c89e9;
    color: white;
    margin-right: 20px;
  }

  /* input {
    width: 260px;
    border-radius: 30px;
    font-family: "Noto Sans CJK KR";
    border: 0px;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    background-color: #f1f1f1;
    color: #999999;
    margin-right: 20px;

    :hover {
      cursor: pointer;
      background-color: #f1f1f1cc;
    }
  } */
`;

const EnrollLabel = styled.label`
  display: flex;
  flex-direction: column;

  h2 {
    font-family: "Noto Sans CJK KR";
    font-weight: bold;
    font-style: "normal";
    font-size: 22px;
  }
  input {
    width: auto;
    height: auto;
    padding: 10px;
    font-size: 16px;
    border: 0px;
    background-color: #f1f1f1;
    color: #999999;
    font-family: "Noto Sans CJK KR";
    font-weight: bold;
    border-radius: 40px;
  }
`;

const StyledResetButton = styled.input`
  width: 260px;
  border-radius: 30px;
  font-family: "Noto Sans CJK KR";
  border: 0px;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  background-color: #f1f1f1;
  color: #999999;
  margin-right: 20px;

  :hover {
    cursor: pointer;
    background-color: #f1f1f1cc;
  }
`;

const StyledSubmitButton = styled.input`
  width: 260px;
  border-radius: 30px;
  font-family: "Noto Sans CJK KR";
  border: 0px;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  background-color: #1c89e9;
  color: white;
  margin-right: 20px;

  :hover {
    cursor: pointer;
    background-color: #1c89e9cc;
  }
`;

const EnrollContent = ({
  name,
  onEnroll,
  wpinfo,
  onSubmit,
  onChange,
  onClickHandler,
}) => {
  const [worker, setWorker] = useState({
    address: "",
    period1: "",
    period2: "",
    duties: "",
    workingTime: "",
    workingDays: "",
    wage: "",
    wageday: "",
    comment: "",
  });

  const onClickSubmit = (e) => {
    e.preventDefault();
    onSubmit(true);
  };

  const onChangeHandler = (e) => {
    console.log(e.target);
  };

  const [submitOpen, setSubmitOpen] = useState(false);

  const onClose = () => {
    setSubmitOpen(false);
  };

  const openSubmit = () => {
    setSubmitOpen(true);
  };

  return (
    <Content>
      <h1> 근로자 등록 </h1>
      <form className="Enroll">
        {/* 계약서 작성 요청 보내기 클릭 시 다이얼로그 */}
        <Dialog maxWidth={1280} onClose={onClose} open={submitOpen}>
          <SubmitDialog onClickClose={onClose} />
          <input type={"submit"} value="제출" />
        </Dialog>

        <div>
          <LeftInput>
            <EnrollLabel>
              <h2> 이름 </h2>
              <input
                placeholder="근로자 이름을 입력해주세요."
                name="employeename"
                onChange={onChange}
              />
            </EnrollLabel>
            <EnrollLabel>
              <h2>주소</h2>
              <input
                placeholder="근로자 주소를 입력하세요"
                name="address"
                onChange={onChange}
              />
            </EnrollLabel>
            <EnrollLabel>
              <h2>계약기간</h2>
              <div style={{ display: "flex", width: "auto" }}>
                <input type="date" name="period1" onChange={onChange} />
                <p
                  style={{
                    color: "#999999",
                    fontFamily: "Noto Sans CJK KR",
                    fontWeight: "bold",
                  }}
                >
                  부터
                </p>
                <input type="date" name="period2" onChange={onChange} />
              </div>
            </EnrollLabel>
          </LeftInput>

          <RightInput>
            <EnrollLabel>
              <h2> 업무 내용 </h2>
              <input
                placeholder="업무 내용을 입력하세요"
                name="duties"
                onChange={onChange}
              />
            </EnrollLabel>

            <EnrollLabel>
              <h2> 소정 근로 시간 </h2>
              <input
                placeholder="소정 근로 시간을 입력하세요"
                name="workingTime"
                onChange={onChange}
              />
            </EnrollLabel>
            <EnrollLabel>
              <h2> 근무일 </h2>
              <input
                placeholder="근무일을 입력하세요"
                name="workingDays"
                onChange={onChange}
              />
            </EnrollLabel>
            <EnrollLabel>
              <h2> 임금(시급) </h2>
              <input
                placeholder="임금(시급)을 입력하세요"
                name="wage"
                onChange={onChange}
              />
            </EnrollLabel>
            <EnrollLabel>
              <h2> 임금지급일 </h2>
              <input
                placeholder="임금(시급)지급일을 입력하세요"
                name="wageday"
                onChange={onChange}
              />
            </EnrollLabel>
            <EnrollLabel>
              <h2> 기타사항 </h2>
              <input
                placeholder="기타 사항을 입력하세요"
                name="comment"
                onChange={onChange}
              />
            </EnrollLabel>
          </RightInput>
        </div>
        <SubmitDiv>
          <StyledSubmitButton
            type={"submit"}
            value="계약서 작성 요청 보내기"
            // onClick={openSubmit}
          />
          <StyledResetButton gray type={"reset"} value="초기화" />
        </SubmitDiv>
      </form>
    </Content>
  );
};
export default EnrollContent;

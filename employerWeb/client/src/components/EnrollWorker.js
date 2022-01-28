import { FormLabel } from "@mui/material";
import React, { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Categories from "./Categories";
import { firestore } from "./firebase.js";
import { collection, addDoc } from "firebase/firestore";

const LeftSidebar = styled.div`
  width: 250px;
  height: 1080px;
  background-color: #e9e9e9;
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SideButton = styled(NavLink)`
  display: flex;
  justify-content: center;
  width: 200px;
  height: 50px;
  margin-bottom: 20px;
  font-size: 15px;
  color: inherit;
  text-decoration: none;
  border: 1px solid black;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: white;
  cursor: pointer;
  &:hover {
    color: #495057;
  }
  & + & {
    margin-top: 1rem;
  }
`;

const Container = styled.div`
  width: 1900px;
  height: 1080px;
  .Left-Sidebar {
    width: 250px;
    height: 1080px;
    background-color: #e9e9e9;
    float: left;
    display: flex;
    flex-direction: column;
    align-items: center;
    .link {
    }
  }
`;

const Content = styled.div`
  padding: 10px;
  width: 1630px;
  height: 1080px;
  background-color: #f7f7f7;
  float: left;
`;

const SubmitDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: auto;
  height: auto;
  padding: 10px;
  font-size: 20px;
  border: 1px solid #999999;
  border-radius: 40px;
`;

// const EnrollWorker = ({ onEnroll }) => {
//   const [worker, setWorker] = useState({
//     address: "",
//     age: 0,
//     gender: "남",
//     period: "",
//     duties: "",
//     workingTime: "",
//     workingDays: "",
//     wage: "",
//     wageday: "",
//     comment: "",
//   });

//   const onChange = (event) => {
//     const { name, value } = event.target;
//     setWorker({ ...worker, [name]: value });
//   };

//   const onSubmit = (e) => {
//     //TODO 입력값 검증 필요
//     console.log(worker);

//     // 사업장 index를 포함하여 등록할 것
//     //onEnroll(worker);
//     e.preventDefault();
//   };

//   const onClickHandler=(e) => {
//     console.log(e.target);
//   }

//   const onChangeHandler = (e) => {
//     console.log(e.target);
//   }

class EnrollWorker extends React.Component {
    state = {
      workers:[{
      address: "",
      name:"",
      age: 0,
      gender: "남",
      period: "",
      duties: "",
      workingTime: "",
      workingDays: "",
      wage: "",
      wageday: "",
      comment: "",
      }],
      worker:{
        address: "",
        name:"",
        age: 0,
        gender: "남",
        period: "",
        duties: "",
        workingTime: "",
        workingDays: "",
        wage: "",
        wageday: "",
        comment: "",
        }
    }
  

  
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  onClickHandler = (e) => {
    e.preventDefault();
    // try {
    //     firestore.collection("LaborContract").add(collection(firestore, "users"), {
    //     address: this.state.worker.address,
    //     age: this.state.worker.age,
    //     gender: this.state.worker.gender,
    //     period: this.state.worker.period,
    //     duties: this.state.worker.duties,
    //     workingTime: this.state.worker.workingTime,
    //     workingDays: this.state.worker.workingDays,
    //     wage: this.state.worker.wage,
    //     wageday: this.state.worker.wageday,
    //     comment: this.state.worker.comment,

    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }

    firestore.collection('workersData').add({
      address:this.state.worker.address,
      name:this.state.worker.name,
      age:this.state.worker.age,
      gender:this.state.worker.gender,
      period:this.state.worker.period,
      duties:this.state.worker.duties,
      workingTime:this.state.worker.workingTime,
      workingDays:this.state.worker.workingDays,
      wage:this.state.worker.wage,
      wageday:this.state.worker.wageday,
      comment:this.state.worker.comment}
      )
      .then(r=>{
        const workers = [...this.state.workers,
          {address:this.state.worker.address,
          name:this.state.worker.name,
          age:this.state.worker.age,
          gender:this.state.worker.gender,
          period:this.state.worker.period,
          duties:this.state.worker.duties,
          workingTime:this.state.worker.workingTime,
          workingDays:this.state.worker.workingDays,
          wage:this.state.worker.wage,
          wageday:this.state.worker.wageday,
          comment:this.state.worker.comment,id:r.id}];
        this.setState({
          workers,
          worker:{
            address: "",
            name:"",
            age: 0,
            gender: "남",
            period: "",
            duties: "",
            workingTime: "",
            workingDays: "",
            wage: "",
           wageday: "",
           comment: "",
            }
        })
      })

  }

  render() {
    return (
      <Container>
      <Categories />
      <Content>
      <div className="Enroll">
        <div>
          <h2> 근로자 등록 </h2>
          <h3> Address </h3>
          <Input
            placeholder="근로자 주소를 입력하세요"
            name="address"
            value={this.state.worker.address}
            onChange={this.onChangeHandler}
          />
          <h3> 이름 </h3>
          <Input
            placeholder="근로자 이름를 입력하세요"
            name="name"
            value={this.state.worker.name}
            onChange={this.onChangeHandler}
          />
          <h3> 나이 </h3>
          <Input
            placeholder="근로자 나이를 입력하세요"
            name="age"
            value={this.state.worker.age}
            onChange={this.onChangeHandler}
          />
          <h3> 성별 </h3>
          <Input
            placeholder="근로자 성별를 입력하세요"
            name="gender"
            value={this.state.worker.gender}
            onChange={this.onChangeHandler}
          />
          <h3> 근로 기간 </h3>
          <Input
            placeholder="근로 기간를 입력하세요"
            name="period"
            value={this.state.worker.period}
            onChange={this.onChangeHandler}
          />
          <h3> 업무 </h3>
          <Input
            placeholder="근로자 업무 내용을 입력하세요"
            name="duties"
            value={this.state.worker.duties}
            onChange={this.onChangeHandler}
          />
          <h3> 근로 시간 </h3>
          <Input
            placeholder="근로 시간을 입력하세요"
            name="workingTime"
            value={this.state.worker.workingTime}
            onChange={this.onChangeHandler}
          />
          <h3> 근로 날짜 </h3>
          <Input
            placeholder="근로 날짜를 입력하세요"
            name="workingDays"
            value={this.state.worker.workingDays}
            onChange={this.onChangeHandler}
          />
          <h3> 급여 </h3>
          <Input
            placeholder="근로자 급여를 입력하세요"
            name="wage"
            value={this.state.worker.wage}
            onChange={this.onChangeHandler}
          />
          <h3> 급여 지급 날짜 </h3>
          <Input
            placeholder="급여 지급 날짜를 입력하세요"
            name="wageday"
            value={this.state.worker.wageday}
            onChange={this.onChangeHandler}
          />
          <h3> comment </h3>
          <Input
            placeholder="특이사항을 입력하세요"
            name="comment"
            value={this.state.worker.comment}
            onChange={this.onChangeHandler}
          />
          <button onClick={this.onClickHandler}>계약서 작성하기</button>
        </div>
        
      </div>
      </Content>
      </Container>
    );
  }
}

export default EnrollWorker;

  // return (
  //   <Container>
  //     <Categories />
  //     <Content>
  //       <div className="Enroll">
  //         <div>
  //         <Input 
  //         placeholder="근로자 주소를 입력하세요"
  //         onChange={EnrollWorker.onChangeHandler}></Input>
  //         <button onClick={EnrollWorker.onClickHandler}>저장</button>
          
  //         </div>
  //       </div>
        {/* <form className="Enroll" onSubmit={onSubmit}>
          <h1> 근로자 등록 </h1>
          <h2> 근로자 Address </h2>
          <Input
            placeholder="근로자 주소를 입력하세요"
            name="address"
            onChange={onChange}
          />
          <h2> 근로자 이름 </h2>
          <Input
            placeholder="근로자 이름을 입력하세요"
            name="name"
            onChange={onChange}
          />
          <h2> 근로자 나이 </h2>
          <Input
            placeholder="근로자 나이 입력하세요"
            name="age"
            onChange={onChange}
          />
          <h2> 근로자 성별 </h2>
          <FormLabel>
            남
            <Input
              type="radio"
              name="gender"
              value="남"
              onChange={onChange}
              checked
            />
          </FormLabel>
          <FormLabel>
            여
            <Input type="radio" name="gender" value="여" onChange={onChange} />
          </FormLabel>
          <h2> 근로 계약 기간 </h2> <Input type="date" name="period" />
          <h2> 업무 내용 </h2>
          <Input
            placeholder="업무 내용을 입력하세요"
            name="duties"
            onChange={onChange}
          />
          <h2> 소정 근로 시간 </h2>
          <Input
            placeholder="소정 근로 시간을 입력하세요"
            name="workingTime"
            onChange={onChange}
          />
          <h2> 근무일 </h2>
          <Input
            placeholder="근무일을 입력하세요"
            name="workingDays"
            onChange={onChange}
          />
          <h2> 임금(시급) </h2>
          <Input
            placeholder="임금(시급)을 입력하세요"
            name="wage"
            onChange={onChange}
          />
          <h2> 임금지급일 </h2>
          <Input
            placeholder="임금(시급)지급일을 입력하세요"
            name="wageday"
            onChange={onChange}
          />
          <h2> 기타사항 </h2>
          <Input
            placeholder="기타 사항을 입력하세요"
            name="comment"
            onChange={onChange}
          />
          <SubmitDiv>
            <button type="submit"> 요청 보내기 </button>
          </SubmitDiv>
        </form> */}
//       </Content>
//     </Container>
//   );
// };

// export default EnrollWorker;

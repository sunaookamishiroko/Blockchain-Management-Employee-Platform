import React from "react";
import { useState, useRef, useCallback, useEffect } from "react";

import { NavLink } from "react-router-dom";
import styled, { ThemeConsumer } from "styled-components";
import WorkerListAdapter from "../components/WorkerList/WorkerListAdapter";
import Dialog from "@mui/material/Dialog";
import { DialogTitle } from "@mui/material";
import Categories from "../components/Categories/Categories";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import WorkerList from "../components/WorkerList/WorkerList";
import WorkerInformation from "../components/WorkerInformation/WorkerInformation";
import BadgeDialog from "../components/WorkerManagement/Dialog/BadgeDialog";
import TerminationDialog from "../components/WorkerManagement/Dialog/TerminationDialog";
import AwardDialog from "../components/WorkerManagement/Dialog/AwardDialog";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #f5f8fb;
`;

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
`;

const ContractDialog = styled.div`
  width: 1280px;
  height: 720px;
  padding: 30px;
  border-radius: 15px;
  border: 3px solid #f1f1f1;
  margin: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background-color: #fc7070;
  font-family: "Noto Sans CJK KR";
  font-weight: bold;
  border: 0px;
  color: white;
  font-size: 20px;
  width: 96px;
  height: 48px;
  border-radius: 30px;
  padding-left: 30px;
  padding-right: 30px;
`;

const WorkerManagement = ({ accounts, contract, name, workers, wpinfo }) => {
  const [open, setOpen] = useState(false);

  // 근로계약서 다이얼로그 상태
  const [contractOpen, setContractOpen] = useState(false);
  // 급여정산 다이얼로그 상태
  const [settlementOpen, setSettltmentOpen] = useState(false);

  const [workername, setWorkername] = useState();
  const [customworkers, setCustomworkers] = useState();
  const [contractaddress, setContractAddress] = useState();
  const [laborcontract, setLaborcontract] = useState();

  // 조회 선택 시 state customeworkers index
  const [selectedWorker, setSelectedWorker] = useState({});
  // 조회 선택 시 state laborcontract index

  const [ready, setReady] = useState(false);
  const [contractready, setContractready] = useState(false);

  useEffect(() => {
    makeCustomWorker();
  }, []);

  useEffect(() => {
    getLaborContract();
  }, [contractaddress]);

  // 근로계약서 조회 버튼 눌렀을 때 호출
  const handleClickContract = (name, address) => {
    setOpen(true);
    setContractOpen(true);
    setWorkername(name);
    setContractAddress(address);
  };

  // 급여정산 정산하기 버튼 눌렀을 때 호출
  const handleClickSettlement = (name, address) => {
    setOpen(true);
    setSettltmentOpen(true);
    setWorkername(name);
    setContractAddress(address);
  };

  const [rewardOpen, setRewardOpen] = useState(false);
  // Buttons에서 보상 지급 버튼 눌렀을 때 호출
  const handleClickReward = () => {
    setRewardOpen(true);
  };

  const [terminationOpen, setTerminationOpen] = useState(false);
  // Buttons에서 근로계약 해지 버튼 눌렀을 때 호출
  const handleClickTermination = () => {
    setTerminationOpen(true);
  };

  // 근로자 목록에서 조회 클릭 시
  // TODO 이 페이지가 로드가 완료되면, 0번 인덱스 조회버튼이 눌리도록 할 것
  const onClickEnquiry = (index, e) => {

    // 선택된 근로자 정보 설정
    setSelectedWorker(customworkers[index]);

    // 근로계약서 정보 가져오기
    setContractAddress(selectedWorker[0]);
  };

  const handleClose = () => {
    setContractAddress(null);
    setOpen(false);
    setRewardOpen(false);
    setSettltmentOpen(false);
    setContractOpen(false);
    setContractready(false);
    setTerminationOpen(false);
  };

  // 근로자 데이터 불러오는 메소드
  const makeCustomWorker = async () => {
    let temp = [];
    
    // TODO
    // if문 -> 근로자가 1명 이상일때
    // else문 -> 근로자가 0명일때 처리
    if (workers[0].length != 0) {
      for (let x = 0; x < workers[0].length; x++) {
        temp.push([workers[0][x], decodeURI(workers[1][x])]);
      }
      setCustomworkers(temp);
      setSelectedWorker(temp[0]);
      setContractAddress(temp[0][0]);
      setReady(true);
    } else {
      setSelectedWorker(null);
      setContractAddress(null);
      setReady(null);
    }
  };

  // 근로 계약서 불러오는 메소드
  const getLaborContract = async () => {
    try {
      const response = await contract.methods
        .getLaborContract(0, contractaddress)
        .call({ from: accounts[0] });
      setLaborcontract(response);
      setContractready(true);
    } catch (e) {
      console.log(e);
    }
  };

  // // TODO 선택된 badge
  // const [selectedBadge, setSelectedBadge] = useState({
  //   image: "img/badge_test.png",
  //   issueData: "2021/05/24",
  //   issuancePoint: "CGV용산",
  //   etc: "필요한 내용 기입",
  //   statement:
  //     "이곳에는 추가적으로 배지에 관한 내용이 기재됩니다. 이 친구 고객들에게 친절하고 지각을 한 번도 하지 않음. 보장함ㅇㅇ",
  // });

  // TODO 보상 지급용 배지 리스트
  const [badges, setBadges] = useState([
    { name: "testBadge", image: "img/badge_test.png" },
  ]);

  return (
    <Container>
      {/* 근로 계약서 Dialog */}
      {contractaddress != null && (
        <Dialog maxWidth={1280} onClose={handleClose} open={contractOpen}>
          <DialogTitle> {workername} 님 </DialogTitle>
          <CloseButton onClick={handleClose} />
          {!contractready && <p>잠시만 기다려주세요...</p>}
          {contractready && (
            <ContractDialog>
              <h2> 근로 계약 기간 </h2> <p> {laborcontract[1]}</p>
              <h2> 업무 내용 </h2>
              <p> {decodeURI(laborcontract[2])} </p>
              <h2> 소정 근로 시간 </h2>
              <p> {laborcontract[3]} </p>
              <h2> 근무일 </h2>
              <p> {decodeURI(laborcontract[4])} </p>
              <h2> 임금(시급) </h2>
              <p> {laborcontract[5]} </p>
              <h2> 임금지급일 </h2>
              <p> {decodeURI(laborcontract[6])} </p>
              <h2> 기타사항 </h2>
              <p> {decodeURI(laborcontract[7])} </p>
            </ContractDialog>
          )}
        </Dialog>
      )}

      {/* 보상 지급 선택 시 Dialog */}
      <Dialog maxWidth={1280} onClose={handleClose} open={rewardOpen}>
        <DialogTitle> {workername} 님 </DialogTitle>
        <CloseButton onClick={handleClose} />
        <AwardDialog badges={badges} onClickClose={handleClose} />
      </Dialog>

      {/* 근로계약 해지 시 Dialog */}
      {/* 사용자 이름 전달해야 함 name */}
      {/* 해지 버튼클릭 시 이벤트 전달해야 함 */}
      <Dialog maxWidth={1280} onClose={handleClose} open={terminationOpen}>
        <TerminationDialog onClickClose={handleClose} />
      </Dialog>

      {/* 좌측 카테고리 */}
      <Categories name={name} wpname={wpinfo[1]} />

      {/* 근로자 목록 */}
      {customworkers ? (
        <WorkerList
          ready={ready}
          customworkers={customworkers}
          onClickEnquiry={onClickEnquiry}
        />
      ) : (
        <></>
      )}

      {/* 근로자 정보 */}
      {/* TODO 조회가 클릭된 근로자의 데이터를 삽입해야 함 */}
      {laborcontract ? (
        <WorkerInformation
          badges={badges}
          selectedWorker={selectedWorker}
          laborContract={laborcontract}
          handleClickContract={handleClickContract}
          handleClickReward={handleClickReward}
          handleClickTermination={handleClickTermination}
        />
      ) : (
        <></>
      )}
    </Container>
  );
};

export default WorkerManagement;

import React, { useState } from "react";
import styled, { css } from "styled-components";

const axios = require("axios");

const StyledAward = styled.div`
  display: flex;
  flex-direction: column;
  width: 1280px;

  > h2 {
    text-align: center;
  }

  > div {
    display: flex;
    justify-content: center;
  }
`;

const StyledBadge = styled.img`
  width: 162px;
  height: 244px;
  border-radius: 25px;
  border-color: white;
  background: white;
  overflow: hidden;
`;

const Button = styled.button`
  margin: 17px;
  height: 48px;
  font-family: "Noto Sans CJK KR";
  font-weight: bold;
  border: 0px;
  color: #999999;
  font-size: 20px;
  border-radius: 30px;
  padding-left: 30px;
  padding-right: 30px;
  width: 240px;
  cursor: pointer;
  ${(props) =>
    props.blue &&
    css`
      background-color: #1c89e9;
      color: white;

      :hover {
        background-color: #1c89e9cc;
      }
    `}
`;

const AwardDialog = ({ accounts, nftcontract, selectedWorker, badges, wpinfo, onClickClose }) => {

  const [badgeclassfiy, setBadgeclassfiy] = useState();
  const [description, setDescription] = useState();

  // nft 지급하기
  const onClickAwardBadge = async() => {
    console.log(badgeclassfiy);

    if (badgeclassfiy == undefined) {
      alert("뱃지를 선택해주세요");
      return;
    }

    try {
      let image;
      
      // 뱃지에 해당하는 이미지 ipfshash
      if (badgeclassfiy == "장기근속") {
        image = "QmVmMoy5Ax3HzeLkZvYekiwd3s6q6YKwTGmNU2VoUiVi3P";
      } else if (badgeclassfiy == "친절") {
        image = "QmWuCNTkWmD72XmWUgY8BvpMhuRPABnC8veQTb4k6P7B9v";
      } else if (badgeclassfiy == "개근") {
        image = "QmRTk3MaRTW9LKSF6gVPgsrgt9cN7WFFYUNfiRdkyt3U5U";
      }

      // 현재 nft index 불러오기
      let nftindex = await nftcontract.methods
          .getTokenIdNow().call({ from: accounts[0] });
      
      // pinata 업로드 위한 json 만들기
      let JSONBody = {
        pinataMetadata: {
          name: nftindex,
          keyvalues: {
            owner: `${selectedWorker[0]}`,
          },
        },
        pinataContent: {
          description: description,
          nftindex: nftindex,
          wpindex: wpinfo[0],
          image:
            `https://gateway.pinata.cloud/ipfs/${image}`,
          name: badgeclassfiy,
        },
      };
      
      // pinata에 업로드
      await axios
        .post(`https://api.pinata.cloud/pinning/pinJSONToIPFS`, JSONBody, {
          headers: {
            pinata_api_key: "",
            pinata_secret_api_key: "",
          },
        })
        .then(function (response) {
          console.log(response);
          // 컨트랙트에 트랜잭션
          nftcontract.methods
            .mintNFT(selectedWorker[0], response.data.IpfsHash)
            .send({ from: accounts[0] });

          console.log("nft_mint complete");
        })
        .catch(function (error) {
          console.log(error);
        });
      
    } catch(e) {
      console.log(e);
    }
  };

  // 라디오박스 change 핸들러
  const handleChange = e => {
    const target = e.target;
    console.log(target.value);
    if (target.checked) {
      setBadgeclassfiy(target.value);
    }
  };

  // 설명 change 핸들러
  const descriptinHandleChange = e => {
    const target = e.target;
    console.log(target.value);
    setDescription(target.value);
  };

  // submit 핸들러
  const handleSubmit = e => {
    e.preventDefault();
    onClickAwardBadge();
  };
  
  return (
    <StyledAward>
      <h2>증정할 배지를 선택해주세요</h2>
      <div>
        {badges.map((badge) => (
          <StyledBadge src={badge.image} />
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
          <label>
            <input
              type="radio"
              value="장기근속"
              checked={badgeclassfiy === "장기근속"}
              onChange={handleChange}
            />
            장기근속
          </label>
          <label>
            <input
              type="radio"
              value="친절"
              checked={badgeclassfiy === "친절"}
              onChange={handleChange}
            />
            친절
          </label>
          <label>
            <input
              type="radio"
              value="개근"
              checked={badgeclassfiy === "개근"}
              onChange={handleChange}
            />
            개근
          </label>
          <label>
            <input
              placeholder="설명을 입력해주세요"
              name="description"
              onChange={descriptinHandleChange}
            />
          </label>
          <Button blue type="submit">배지지급</Button>
          <Button type="button" onClick={onClickClose}>취소</Button>
          </div>
        </form>
      </div>
    </StyledAward>
  );
};

export default AwardDialog;

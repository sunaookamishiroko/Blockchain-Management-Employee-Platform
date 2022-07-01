import React, { useState } from "react";
import styled, { css } from "styled-components";

import { PINATA_API_KEY, PINATA_SECRET_API_KEY, BADGE1, BADGE2, BADGE3 } from "../../../envSetting"

const axios = require("axios");

const StyledAward = styled.div`
  display: flex;
  flex-direction: column;
  width: 1280px;

  > h2 {
    text-align: center;
  }

  > div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    div {
      display: flex;
      justify-content: center;

      align-items: center;
    }

    > form {
      width: 100%;
    }

    label {
      display: flex;
      flex-direction: column;
      align-items: center;
      > p {
        width: 180px;
        border-radius: 30px;
        font-family: "Noto Sans CJK KR";
        border: 0px;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        padding: 5px;
        background-color: #999999;
        color: #ffffff;
        margin: 24px;
      }
    }

    #radio-group {
      input {
        display: none;
      }

      label {
        cursor: pointer;
      }

      input:checked + label {
        > p {
          background-color: #1c89e9;
        }
      }
    }
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

const StyledInput = styled.input`
  background-color: red;

  // text 입력의 경우
  ${(props) =>
    props.type == "text" &&
    css`
      width: 640px;
      border-radius: 30px;
      font-family: "Noto Sans CJK KR";
      border: 0px;
      font-size: 20px;
      font-weight: bold;
      padding: 10px;
      background-color: #f1f1f1;
      color: #999999;
      margin: 24px;
    `}
`;

const AwardDialog = ({
  accounts,
  nftcontract,
  selectedWorker,
  wpinfo,
  onClickClose,
}) => {
  const [badgeclassfiy, setBadgeclassfiy] = useState();
  const [description, setDescription] = useState();

  // nft 지급하기
  const onClickAwardBadge = async () => {

    if (badgeclassfiy == undefined) {
      alert("뱃지를 선택해주세요");
      return;
    }

    try {
      let image;

      // 뱃지에 해당하는 이미지 ipfshash
      if (badgeclassfiy == "장기근속") {
        image = BADGE1;
      } else if (badgeclassfiy == "친절") {
        image = BADGE2;
      } else if (badgeclassfiy == "개근") {
        image = BADGE3;
      }

      // 현재 nft index 불러오기
      let nftindex = await nftcontract.methods
        .getTokenIdNow()
        .call({ from: accounts[0] });

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
          image: `https://gateway.pinata.cloud/ipfs/${image}`,
          name: badgeclassfiy,
        },
      };
    
      // pinata에 업로드
      await axios
        .post(`https://api.pinata.cloud/pinning/pinJSONToIPFS`, JSONBody, {
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API_KEY,
          },
        })
        .then(function (response) {
          // 컨트랙트에 트랜잭션
          nftcontract.methods
            .mintNFT(selectedWorker[0], `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`)
            .send({ from: accounts[0] });

          console.log("nft_mint complete");
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  // 라디오박스 change 핸들러
  const handleChange = (e) => {
    const target = e.target;
    if (target.checked) {
      setBadgeclassfiy(target.value);
    }
  };

  // 설명 change 핸들러
  const descriptinHandleChange = (e) => {
    const target = e.target;
    setDescription(target.value);
  };

  // submit 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    onClickAwardBadge();
  };

  return (
    <StyledAward>
      <h2>증정할 배지를 선택해주세요</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div id="radio-group">
            <input
              type="radio"
              value="장기근속"
              checked={badgeclassfiy === "장기근속"}
              onChange={handleChange}
              id="radio1"
            />
            <label for="radio1">
              <StyledBadge src="img/cgv_badge.png" />
              <p>장기근속</p>
            </label>

            <input
              type="radio"
              value="친절"
              checked={badgeclassfiy === "친절"}
              onChange={handleChange}
              id="radio2"
            />
            <label for="radio2">
              <StyledBadge src="img/lm_badge.png" />
              <p>친절</p>
            </label>

            <input
              type="radio"
              value="개근"
              checked={badgeclassfiy === "개근"}
              onChange={handleChange}
              id="radio3"
            />
            <label for="radio3">
              <StyledBadge src="img/sb_badge.png" />
              <p>개근</p>
            </label>
          </div>
          <div>
            <label>
              <StyledInput
                type="text"
                placeholder="설명을 입력해주세요"
                name="description"
                onChange={descriptinHandleChange}
              />
            </label>
          </div>

          <div>
            <Button blue type="submit">
              배지지급
            </Button>
            <Button type="button" onClick={onClickClose}>
              취소
            </Button>
          </div>
        </form>
      </div>
    </StyledAward>
  );
};

export default AwardDialog;

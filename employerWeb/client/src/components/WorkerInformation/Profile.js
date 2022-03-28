import React from "react";
import styled from "styled-components";

const StyledProfile = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #ff000016;

  img {
    align-self: center;
    width: 120px;
    height: 120px;
    border-radius: 25px;
    background: white;
    overflow: hidden;
    margin-right: 48px;
  }

  div {
    background-color: #00ff0016;
    display: flex;
    flex-direction: column;

    div {
      height: 50px;
      display: flex;
      flex-direction: row;

      h4 {
        align-self: center;
        width: 140px;
        color: #999999;
        font-size: 20px;
        font-weight: bold;
      }

      p {
        align-self: center;
        align-self: center;
        color: #999999;
        font-size: 20px;
      }
    }
  }
`;

const Profile = ({ userData }) => {
  const profileCategories = ["이름", "연락처", "Address"];

  return (
    <StyledProfile>
      <img src="img/profile.png" alt="프로필" />
      <div>
        {profileCategories.map((data, index) => (
          <div>
            <h4>{data}</h4>
            <p>{userData[index]}</p>
          </div>
        ))}
      </div>
    </StyledProfile>
  );
};

export default Profile;

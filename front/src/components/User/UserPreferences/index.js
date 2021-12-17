import styled from "styled-components";
// import { useState } from "react";
import { ReactComponent as Close } from "../../../assets/close.svg";
// import {} from "../../helpers/cryptoManagementServices";
const UserPreferences = () => {
  return (
    <Wrapper>
      <div>
        <Title>
          <h1>Preferences</h1>
          <p>Manage your preferences</p>
        </Title>
        <div>
          <Title2>List of cryptocurrencies</Title2>
          <div>
            <Crypto>
              BTC
              <CloseButton>
                <Close />
              </CloseButton>
            </Crypto>
            <Crypto>
              ETH
              <CloseButton>
                <Close />
              </CloseButton>
            </Crypto>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 10px;
  }
  & > div > div > p {
    color: #444;
    font-weight: bold;
    width: 100%;
    margin-top: 20px;
    font-size: 21px;
  }
`;

const Title2 = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Title = styled.div`
  & > h2 {
    margin: 0;
    font-weight: bold;
  }
  & > p {
    font-weight: 400 !important;
    color: rgb(88, 102, 126);
    & > button {
      border: none;
      cursor: pointer;
      color: #2b5ddc;
      font-size: 16px;
      background-color: transparent;
    }
  }
`;

// const ButtonWrapper = styled(Button)`
//   width: 350px;
//   margin-top: 33px;
// `;

// const Label = styled.p`
//   font-size: 14px;
//   font-weight: bold;
//   color: #444;
//   margin-top: 20px;
// `;

const CloseButton = styled.button`
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  margin-top: 6px;
`;

const Crypto = styled.div`
  display: flex;
  align-item: center;
  font-size: 20px;
  width: 100%;
  justify-content: space-between;
`;

// const Articles = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-item: center;
//   width: 100%;
//   & > p {
//     font-weight: normal;
//     text-align: center;
//     text-decoration: underline;
//     font-weight: normal !important;
//   }
// `;

export default UserPreferences;

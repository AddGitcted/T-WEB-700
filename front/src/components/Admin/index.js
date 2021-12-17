import styled from "styled-components";
import Button from "../Button";
import Input from "../Input";
import { useState } from "react";
import { ReactComponent as Close } from "../../assets/close.svg";
import {
  createCrypto,
  getCurrentCryptoList,
  deleteCurrentCrypto,
} from "../../helpers/cryptoManagementServices";
const Admin = () => {
  const [name, setName] = useState("");
  const [idName, setIdName] = useState("");
  const [iconUrl, setIconUrl] = useState("");

  return (
    <Wrapper>
      <div>
        <Title>
          <h1>Admin</h1>
          <p>Manage global application preferences</p>
        </Title>
        <div>
          <Title2>List of cryptocurrencies</Title2>
          <div>
            <Crypto>
              BTC
              <CloseButton onClick={() => deleteCurrentCrypto()}>
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
          <div>
            <div>
              <Label>Cryptocurrency name</Label>
              <Input onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label>ID of Cryptocurrency</Label>
              <Input onChange={(e) => setIdName(e.target.value)} />
            </div>
            <div>
              <Label>Icon url</Label>
              <Input onChange={(e) => setIconUrl(e.target.value)} />
            </div>
          </div>
          <ButtonWrapper onClick={() => {}}>
            Add to cryptocurrencies list
          </ButtonWrapper>
        </div>
      </div>
      <div style={{ marginTop: "120px" }}>
        <Title2>Articles sources</Title2>
        <Articles>
          <p>https://cointelegraph.com/rss</p>
          <p>https://cointelegraph.com/rss</p>
          <p>https://cointelegraph.com/rss</p>
        </Articles>
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

const ButtonWrapper = styled(Button)`
  width: 350px;
  margin-top: 33px;
`;

const Label = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #444;
  margin-top: 20px;
`;

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

const Articles = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  width: 100%;
  & > p {
    font-weight: normal;
    text-align: center;
    text-decoration: underline;
    font-weight: normal !important;
  }
`;

export default Admin;

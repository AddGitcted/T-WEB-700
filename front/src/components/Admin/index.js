import styled from "styled-components";
import Button from "../Button";
import Input from "../Input";
import { ReactComponent as Close } from "../../assets/close.svg";
import {
  createCrypto,
  getCurrentCryptoList,
  deleteCurrentCrypto,
} from "../../helpers/cryptoManagementServices";

import { Context } from "../../App";

import { useState, useContext, useEffect } from "react";

const Admin = () => {
  const token = JSON.parse(localStorage.getItem("token")) || {};

  const [name, setName] = useState("");
  const [idName, setIdName] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [list, setList] = useState();

  const { setShowModal, setPopupState } = useContext(Context);

  useEffect(() => {
    getCurrentCryptoList(token.token).then((res) => {
      setList(res.cryptos);
    });
    // eslint-disable-next-line
  }, []);

  const AddCrypto = (name, idName, iconUrl) => {
    if (!name || !idName || !iconUrl) {
      setPopupState({
        type: "error",
        show: true,
        message: "Bad credentials",
      });
      return;
    } else
      createCrypto(token.token, name, idName, iconUrl).then((res) => {
        setPopupState({
          type: "success",
          show: true,
          message: "Crypto added.",
        });
        setShowModal({ display: false, type: "" });
      });
  };

  return (
    <Wrapper>
      <div>
        <Title>
          <h1>Admin</h1>
          <p>Manage global application preferences</p>
        </Title>
        <div>
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
          <ButtonContainer>
            <ButtonWrapper onClick={() => AddCrypto(name, idName, iconUrl)}>
              Add to cryptocurrencies list
            </ButtonWrapper>
          </ButtonContainer>
        </div>
      </div>
      <Container>
        <div>
          <Title2>List of cryptocurrencies</Title2>
          <div>
            {list &&
              list.map((item) => (
                <Crypto key={item._id.$oid}>
                  <img src={item.icone} alt=""></img>
                  <p>{item.name}</p>
                  <p>{item.idName}</p>
                  <CloseButton
                    type="button"
                    onClick={() =>
                      deleteCurrentCrypto(token.token, item._id.$oid)
                        .then((res) => {
                          setShowModal({ display: false, type: "" });
                          setPopupState({
                            type: "success",
                            show: true,
                            message: "Crypto deleted.",
                          });
                        })
                        .catch((err) => console.log(err))
                    }
                  >
                    <Close />
                  </CloseButton>
                </Crypto>
              ))}
          </div>
        </div>
        <div>
          <Title2>Articles sources</Title2>
          <Articles>
            <p>https://cointelegraph.com/rss</p>
            <p>https://actualiteinformatique.fr/category/blockchain/feed</p>
          </Articles>
        </div>
      </Container>
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
  margin-bottom: 20px;
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
  align-items: center;
  font-size: 20px;
  width: 100%;
  justify-content: space-between;
  margin: 10px 0;
  & > img {
    height: 30px;
    width: 30px;
    object-fit: cover;
  }
  & > p {
    margin: 0;
    min-width: 110px;
  }
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

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
`;

export default Admin;

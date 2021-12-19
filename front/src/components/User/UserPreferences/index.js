import styled from "styled-components";
import { getCurrentCryptoList } from "../../../helpers/cryptoManagementServices";
import { modifyUser } from "../../../helpers/userServices";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../../App";
import Button from "../../Button";

const UserPreferences = () => {
  const token = JSON.parse(localStorage.getItem("token")) || {};
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const { setShowModal, setUserData, setPopupState, userData } =
    useContext(Context);

  const [userCryptoList, setUserCryptoList] = useState(userData.preferences);

  const [list, setList] = useState();

  const handleChange = (idName) => {
    if (!userCryptoList.includes(idName))
      setUserCryptoList([...userCryptoList, idName]);
    else setUserCryptoList(userCryptoList.filter((arr) => arr !== idName));
  };

  const handleSave = () => {
    modifyUser(user, userCryptoList, "crypto", token.token).then((res) => {
      setUserData(res);
      setShowModal({ display: false, type: "" });
      setPopupState({
        type: "success",
        show: true,
        message: "Crypto preferences changed.",
      });
    });
  };

  useEffect(() => {
    getCurrentCryptoList(token.token).then((res) => {
      setList(res.cryptos);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <div>
        <Title>
          <h1>Preferences</h1>
          <p>Manage your preferences</p>
        </Title>
        <div>
          <Title2>List of cryptocurrencies</Title2>
          <Container>
            {list &&
              list.map((item) => (
                <Crypto key={item._id.$oid}>
                  <img src={item.icone} alt=""></img>
                  <p>{item.name}</p>
                  <p>{item.idName}</p>
                  <Check
                    type="checkbox"
                    checked={userCryptoList.includes(item.idName)}
                    onChange={(e) => handleChange(item.idName)}
                  />
                </Crypto>
              ))}
            <ButtonContainer>
              <ButtonWrapper onClick={() => handleSave()}>Save</ButtonWrapper>
            </ButtonContainer>
          </Container>
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

const Container = styled.div`
  margin: 20px 0;
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
    max-width: 30px;
    width: 100%;
  }
`;

const ButtonWrapper = styled(Button)`
  width: 150px;
  margin-top: 20px;
`;

const Check = styled.input`
  height: 20px;
  cursor: pointer;
  width: 20px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
`;

export default UserPreferences;

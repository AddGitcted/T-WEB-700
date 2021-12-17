import styled from "styled-components";
import { loginUser, getUser } from "../../../helpers/userServices";
import Button from "../../Button";
import Input from "../../Input";
import GoogleLogin from "react-google-login";

import { Context } from "../../../App";
import { useState, useContext } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setShowModal, setUserData, setPopupState } = useContext(Context);

  const responseGoogle = (response) => {
    loginUser(response.profileObj.email, "", true)
      .then((token) => {
        getUser(token.token, setUserData);
        setShowModal({ type: "", display: false });
      })
      .catch((err) =>
        setPopupState({
          type: "error",
          show: true,
          message: "Bad credentials",
        })
      );
  };

  return (
    <Wrapper>
      <div>
        <Title>
          <h2>Log In</h2>
          <p>
            New to Crypto Counting ?
            <button
              type="button"
              onClick={() => {
                setShowModal({ type: "", display: false });
                setShowModal({ type: "registerModal", display: true });
              }}
            >
              Create an account
            </button>
          </p>
        </Title>
        <div>
          <p>Email</p>
          <Input
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p>Password</p>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <ButtonWrapper
        onClick={() => {
          loginUser(email, password)
            .then((token) => getUser(token.token, setUserData))
            .catch((err) => {
              setPopupState({
                type: "error",
                show: true,
                message: "Bad credentials",
              });
            });
          setShowModal({ display: false, type: "" });
        }}
      >
        Log in
      </ButtonWrapper>
      <GoogleLoginWrapper
        clientId="588585777325-jn9i8tha7p1p4bbn7rmqgu7s96m9i5id.apps.googleusercontent.com"
        buttonText=""
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div {
    width: 100%;
  }
  & > div > div > p {
    color: #444;
    font-weight: bold;
    width: 100%;
    margin-top: 20px;
  }
`;

const Title = styled.div`
  & > h2 {
    margin: 0;
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
  width: 250px;
  margin-top: 33px;
`;

const GoogleLoginWrapper = styled(GoogleLogin)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  height: 36px !important;

  & > div {
    margin: 0 !important;
  }
  & > span {
    display: none;
  }
`;

export default Login;

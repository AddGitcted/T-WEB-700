import styled from "styled-components";
import Button from "../../Button";
import Input from "../../Input";
import { registerUser, getUser } from "../../../helpers/userServices";
import { useState, useContext } from "react";
import { Context } from "../../../App";
import GoogleLogin from "react-google-login";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const { setShowModal, setUserData, setPopupState } = useContext(Context);

  const responseGoogle = (response) => {
    registerUser(
      response.profileObj.name,
      response.profileObj.email,
      "",
      "",
      true
    )
      .then((token) => {
        getUser(token.token, setUserData);
        setShowModal({ type: "", display: false });
      })
      .catch((res) => console.error(res));
  };

  return (
    <Wrapper>
      <div>
        <Title>
          <h2>Create an account</h2>
          <p>
            Already have an account?
            <button
              type="button"
              onClick={() => {
                setShowModal({ type: "", display: false });
                setShowModal({ type: "loginModal", display: true });
              }}
            >
              Log In
            </button>
          </p>
        </Title>
        <div>
          <p>Username</p>
          <Input onChange={(e) => setUsername(e.target.value)} />
        </div>
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
        <div>
          <p>Confirm password</p>
          <Input
            type="password"
            onChange={(e) => setSecondPassword(e.target.value)}
          />
        </div>
      </div>
      <ButtonWrapper
        onClick={() => {
          registerUser(username, email, password, secondPassword).then(
            (token) =>
              token
                ? getUser(token.token, setUserData)
                : setPopupState({
                    type: "error",
                    show: true,
                    message: "Bad credentials",
                  })
          );
          setShowModal({ display: false, type: "" });
        }}
      >
        Sign up
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

const ButtonWrapper = styled(Button)`
  width: 250px;
  margin-top: 33px;
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

const GoogleLoginWrapper = styled(GoogleLogin)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  height: 36px !important;

  & > div {
    margin: 0 !important;
    padding: 8px !important;
  }
  & > span {
    display: none;
  }
`;

export default Register;

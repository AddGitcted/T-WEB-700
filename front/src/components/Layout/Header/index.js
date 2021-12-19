import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import User from "../../../assets/user.png";
import Button from "../../Button";
import Modal from "../../Modal";
import { Context } from "../../../App";
import { useContext } from "react";
import Login from "../../User/Login";
import Register from "../../User/Register";

const Header = () => {
  const { showModal, setShowModal, userData, setUserData } =
    useContext(Context);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Band></Band>
      <Container>
        <div>
          <LinkWrapper to="/">
            <h1>Crypto Counting</h1>
          </LinkWrapper>
          <LinkWrapper to="/cryptocurrencies">Cryptocurrencies</LinkWrapper>
          <LinkWrapper to="/articles">Articles</LinkWrapper>
        </div>
        <div>
          {!userData ||
            (userData === "anonymous" && (
              <>
                <ButtonWrapper
                  onClick={() =>
                    setShowModal({ display: true, type: "loginModal" })
                  }
                >
                  Log in
                </ButtonWrapper>
                <Button
                  onClick={() =>
                    setShowModal({ display: true, type: "registerModal" })
                  }
                >
                  Sign up
                </Button>
              </>
            ))}
          {userData && userData !== "anonymous" && (
            <>
              <UserButton onClick={() => navigate("/user/profile")}>
                <img src={User} alt="" />
              </UserButton>
              <Button
                onClick={() => {
                  setUserData("anonymous");
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                }}
              >
                Log out
              </Button>
            </>
          )}
        </div>
      </Container>
      {showModal.display && (
        <Modal type={showModal.type} setShowModal={setShowModal}>
          {showModal.type === "loginModal" && <Login />}
          {showModal.type === "registerModal" && <Register />}
        </Modal>
      )}
    </Wrapper>
  );
};

const UserButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background: none;
  margin-right: 30px;
  & > img {
    height: 30px;
  }
`;

const ButtonWrapper = styled(Button)`
  background: none;
  color: #444;
  &:hover {
    transform: scale(1);
    background: none;
  }
  margin: 0 10px;
`;

const LinkWrapper = styled(Link)`
  text-decoration: none !important;
  margin: 0 15px;
  & > h1 {
    margin: 0;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height 108px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgb(239, 242, 245);
  z-index: 1500;

`;

const Band = styled.div`
  height: 36px;
  border-bottom: 1px solid rgb(239, 242, 245);
`;

const Container = styled.div`
  margin: 0 126px;
  padding: 0 16px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
    height: 100%;
  }
  & > h1 {
    font-size: 28px;
  }
`;

export default Header;

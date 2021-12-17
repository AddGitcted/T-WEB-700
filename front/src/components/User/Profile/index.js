import styled from "styled-components";
import Layout from "../../Layout";
import { useEffect, useContext, useState } from "react";
import { Context } from "../../../App";
import Button from "../../Button";
import { useNavigate } from "react-router-dom";
import Modal from "../../Modal";
import UpdatePass from "../UpdatePass";
import Input from "../../Input";
import User from "../../../assets/user.png";
import Admin from "../../Admin";
import UserPreferences from "../UserPreferences";
import { deleteUser, modifyUser } from "../../../helpers/userServices";

const Profile = () => {
  const { userData, setUserData, showModal, setShowModal, setPopupState } =
    useContext(Context);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = JSON.parse(localStorage.getItem("token")) || {};

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!user || userData === "anonymous") {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [userData]);

  return (
    <Layout>
      <Wrapper>
        <Container>
          <Title>
            <h2>Account Settings</h2>
            {userData?.role === "Admin" && (
              <AdminButton
                onClick={() => {
                  setShowModal({
                    display: true,
                    type: "adminModal",
                  });
                }}
              >
                Admin
              </AdminButton>
            )}
            {userData?.role === "User" && (
              <AdminButton
                onClick={() => {
                  setShowModal({
                    display: true,
                    type: "userModal",
                  });
                }}
              >
                Preferences
              </AdminButton>
            )}
          </Title>
          <InputWrapper>
            <div>
              <img src={User} alt="" />
              <div>
                <p>{userData?.username}</p>
                <p>{userData?.email}</p>
              </div>
            </div>
            <div>
              <p>Display name</p>
              <Input onChange={(e) => setDisplayName(e.target.value)} />
            </div>
            <div>
              <p>Email Address</p>
              <Input
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <ButtonWrapper>
              <Button
                type="button"
                onClick={() => {
                  modifyUser(
                    user,
                    { displayName: displayName, email: email },
                    "info",
                    token.token
                  ).then((res) => {
                    setPopupState({
                      type: "success",
                      show: true,
                      message: "Information updated",
                    });
                    setUserData(res);
                  });
                }}
              >
                Save
              </Button>
              <button
                type="button"
                onClick={() => {
                  setShowModal({
                    display: true,
                    type: "deleteModal",
                  });
                }}
              >
                Delete your account
              </button>
            </ButtonWrapper>
          </InputWrapper>
          <Password>
            <div>
              <h3>Password</h3>
              <p>Set a unique password to protect your personal account.</p>
            </div>
            <div>
              <Button
                type="button"
                onClick={() => {
                  setShowModal({
                    display: true,
                    type: "passwordModal",
                  });
                }}
              >
                Change password
              </Button>
            </div>
          </Password>
        </Container>
      </Wrapper>
      {showModal.display && (
        <Modal type={showModal.type} setShowModal={setShowModal}>
          {showModal.type === "passwordModal" && <UpdatePass user={user} />}
          {showModal.type === "deleteModal" && (
            <DeleteModal>
              <h2>Are you sure?</h2>
              <button
                onClick={() => {
                  setShowModal({
                    type: "",
                    display: false,
                  });
                  deleteUser(token.token).then(() => {
                    window.location.reload();
                    setPopupState({
                      type: "success",
                      show: true,
                      message: "User successfully deleted.",
                    });
                  });
                }}
              >
                Delete
              </button>
            </DeleteModal>
          )}
          {showModal.type === "adminModal" && <Admin />}
          {showModal.type === "userModal" && <UserPreferences />}
        </Modal>
      )}
    </Layout>
  );
};

const AdminButton = styled(Button)`
  background-color: #444;
  &:hover {
    background-color: #4444443d;
    color: #fff;
  }
`;

const DeleteModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > button {
    border-radius: 5px;
    border: none;
    outline: none;
    margin-right: 50px;
    height: 36px;
    padding: 4px 20px;
    color: #fff;
    background-color: #ec5e5f;
    width: 100px;
    cursor: pointer;
  }
  & > h2 {
  }
`;

const InputWrapper = styled.div`
  padding: 32px;
  max-width: 364px;
  & > div {
    margin-bottom: 32px;
  }
  & > div > p {
    font-weight: bold;
    color: #444;
  }
  & > div:first-child {
    display: flex;
    align-items: center;
    & > div {
      display: flex;
      flex-direction: column;
      & > p {
        color: #444;
      }
    }
    & > img {
      height: 40px;
      margin-right: 32px;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  & > *:last-child {
    border: none;
    outline: none;
    cursor: pointer;
    background: none;
    color: #444;
    font-weight: bold;
    padding: 0;
  }
`;

const Password = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 98px;
  margin: 0;
  border-top: 1px solid rgb(239, 242, 245);
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 98px;
  margin: 0;
  border-bottom: 1px solid rgb(239, 242, 245);
`;

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  border: 1px solid rgb(239, 242, 245);
  border-radius: 8px;
  margin-top: 40px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

export default Profile;

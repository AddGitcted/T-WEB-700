import styled from "styled-components";
import { useState, useContext } from "react";
import Input from "../../Input";
import Button from "../../Button";

import { modifyUser } from "../../../helpers/userServices";
import { Context } from "../../../App";

const UpdatePass = ({ user }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = JSON.parse(localStorage.getItem("token")) || {};

  const { setShowModal, setPopupState } = useContext(Context);

  const handleChangePass = (currentPassword, newPassword, confirmPassword) => {
    if (user.password === currentPassword && newPassword === confirmPassword) {
      modifyUser(user, newPassword, "pass", token.token).then(() => {
        setShowModal({ display: false, type: "" });
        setPopupState({
          type: "success",
          show: true,
          message: "Password changed.",
        });
      });
    }
  };

  return (
    <Wrapper>
      <h2>Change password</h2>
      <p>
        To ensure your account is well protected, please use 8 or more
        characters with a mix of letters, numbers & symbols.
      </p>
      <div>
        <p>Current Password</p>
        <Input
          type="password"
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div>
        <p>New password</p>
        <Input
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <p>Confirm new password</p>
        <Input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div>
        <Button
          type="button"
          onClick={() =>
            handleChangePass(currentPassword, newPassword, confirmPassword)
          }
        >
          Change password
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > h2 {
    margin: 0;
  }
  & > div:not(last-child) {
    margin-bottom: 20px;
  }
  & > div:last-child {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  & > div > p {
    font-weight: bold;
    color: #444;
  }
`;

export default UpdatePass;

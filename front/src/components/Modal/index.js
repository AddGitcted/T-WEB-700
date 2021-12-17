import styled from "styled-components";
import ReactDom from "react-dom";

import { ReactComponent as Close } from "../../assets/close.svg";

const Modal = ({ type, setShowModal, children }) => {
  document.body.style.overflow = "hidden";
  return ReactDom.createPortal(
    <Wrapper>
      <Container type={type}>
        <CloseButton
          onClick={() => {
            setShowModal({ display: false, type: "" });
            document.body.style.overflow = "visible";
          }}
        >
          <Close />
        </CloseButton>
        {children}
      </Container>
    </Wrapper>,
    document.getElementById(type)
  );
};

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(34, 34, 34, 0.5);
  z-index: 15;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
`;

const Container = styled.div`
  width: ${({ type }) =>
    type === "adminModal" ? "calc(100% - 400px)" : "496px"};
  background-color: #feffff;
  border-radius: 15px;
  position: relative;
  box-shadow: rgb(0 0 0 / 10%) 0px 5px 20px;
  padding: 20px;
`;

export default Modal;

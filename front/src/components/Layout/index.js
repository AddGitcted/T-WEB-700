import styled from "styled-components";
import { Context } from "../../App";
import { useContext } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Popup from "../Popup";

const Layout = ({ children }) => {
  const { popupState } = useContext(Context);

  return (
    <Wrapper>
      <Header />
      {popupState.show && <Popup />}
      <Container>{children}</Container>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  margin: 0 126px;
  padding: 0 16px;
  padding-top: 108px;
`;

export default Layout;

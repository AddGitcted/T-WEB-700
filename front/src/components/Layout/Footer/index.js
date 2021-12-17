import styled from "styled-components";

import { ReactComponent as Illustration } from "../../../assets/illu.svg";

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <p>© 2021 EpitechMscProPromo2023 / T-WEB-700. All rights reserved</p>
        <Illustration />
      </Container>
    </Wrapper>
  );
};

const Container = styled.div`
  margin: 0 126px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  width: 100%;
  color: rgb(160, 160, 160);
  border-top: 1px solid rgb(239, 242, 245);
  margin-top: 40px;
  padding-top: 40px;
`;

export default Footer;

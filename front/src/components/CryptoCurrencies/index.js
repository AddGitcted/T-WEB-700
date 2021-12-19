import styled from "styled-components";
import Layout from "../Layout";
import CryptoTable from "../../components/CryptoTable";

const CryptoCurrencies = () => {
  return (
    <Layout>
      <Wrapper>
        <CryptoTable />
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  padding-top: 50px;
`;

export default CryptoCurrencies;

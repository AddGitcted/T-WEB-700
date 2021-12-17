import styled from "styled-components";
import Layout from "../Layout";
import TradeViewChart from "react-crypto-chart";

const CryptoCurrency = () => {
  return (
    <Layout>
      <Wrapper>
        <TradeViewChart pair="BTCBUSD" />
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  height: 1000px;
`;

export default CryptoCurrency;

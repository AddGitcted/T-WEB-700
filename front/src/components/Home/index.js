import styled from "styled-components";
import Layout from "../Layout";
import CryptoTable from "../../components/CryptoTable";
import ArticleSlider from "../Slider";

const Home = () => {
  return (
    <Layout>
      <Wrapper>
        <ArticleSlider />
        <CryptoTable />
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  padding-top: 50px;
`;

export default Home;

import styled from "styled-components";
import Layout from "../Layout";
import CryptoTable from "../../components/CryptoTable";
import ArticleSlider from "../Slider";

const Home = () => {
  return (
    <Layout>
      <Wrapper>
        <ArticleSlider></ArticleSlider>
        <CryptoTable></CryptoTable>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  height: 1000px;
`;

export default Home;

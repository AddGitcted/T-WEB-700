import styled from "styled-components";
import Layout from "../Layout";
import Highcharts from "highcharts";
import { getCryptoHistory } from "../../helpers/cryptoServices";
import HighchartsReact from "highcharts-react-official";
import { useParams } from "react-router-dom";
import "./bootstrap.min.scss";
import "./style.scss";
import { capitalize } from "@material-ui/core";
import { useEffect, useState } from "react";

const CryptoCurrency = () => {
  const { token } = JSON.parse(localStorage.getItem("token")) || {};
  const { name } = useParams();
  let [data, setData] = useState([]);
  let [title, setTitle] = useState(
    // eslint-disable-next-line
    capitalize(name) + " history " + "(last day)"
  );

  useEffect(() => {
    getCryptoHistory(token).then((data) => setData(data));
    // eslint-disable-next-line
  }, []);

  const options = {
    title: {
      text: title,
    },
    series: [
      {
        type: "line",
        data: data.data,
      },
    ],
    xAxis: {
      categories: data.labels,
      tickInterval: 1,
      labels: {
        enabled: true,
      },
    },
  };

  const updateHistory = (e) => {
    // eslint-disable-next-line
    setTitle(capitalize(name) + " history " + "(last " + e.target.value + ")");
    getCryptoHistory(token, e.target.value).then((data) => setData(data));
  };

  return (
    <Layout>
      <Wrapper>
        <div className={"selector__container"}>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="btn btn-primary"
              onClick={updateHistory}
              value={"year"}
            >
              Year
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={updateHistory}
              value={"month"}
            >
              Month
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={updateHistory}
              value={"week"}
            >
              Week
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={updateHistory}
              value={"day"}
            >
              Day
            </button>
          </div>
        </div>
        <HighchartsReact
          containerProps={{ className: "chartContainer" }}
          highcharts={Highcharts}
          options={options}
        />
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  min-height: 650px;
  margin-top: 50px;
  background-color: #fafafa;
  padding: 15px;
  border-radius: 20px;
  box-shadow: rgb(0 0 0 / 10%) 0px 5px 20px;
`;

export default CryptoCurrency;

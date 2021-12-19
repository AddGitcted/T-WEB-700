import Axios from "axios";

export const getCrypto = async (token, cryptoList) => {
  const res = await Axios.get(
    `${process.env.REACT_APP_API_HOST}/cryptos/?` +
      `${cryptoList
        .map(
          (item, i) =>
            `cmids=${item.idName}${i < cryptoList.length - 1 ? "&" : ""}`
        )
        .join("")}`,
    {
      headers: {
        token: token,
      },
    }
  );
  return res.data;
};

const cryptoHistoryApiCall = async (token, url) => {
  // eslint-disable-next-line
  {
    const res = await Axios.get(url, {
      headers: {
        token: token,
      },
    });
    return res.data;
  }
};

const formatDataChart = (unformated) => {
  let data = [];

  data.labels = [];
  data.data = [];
  for (let i = 0; i !== unformated.length; i++) {
    data.data.push(unformated[i].price_open);
    data.labels.push(unformated[i].time_period_start.slice(0, -12));
  }
  return data;
};

export const getCryptoHistory = async (token, type = "day") => {
  let data = undefined;

  if (type === "day") {
    data = await cryptoHistoryApiCall(
      token,
      `${process.env.REACT_APP_API_HOST}/cryptos/BTC/history/1D`
    );
  } else if (type === "month") {
    data = await cryptoHistoryApiCall(
      token,
      `${process.env.REACT_APP_API_HOST}/cryptos/BTC/history/1M`
    );
  } else if (type === "week") {
    data = await cryptoHistoryApiCall(
      token,
      `${process.env.REACT_APP_API_HOST}/cryptos/BTC/history/1W`
    );
  } else {
    data = await cryptoHistoryApiCall(
      token,
      `${process.env.REACT_APP_API_HOST}/cryptos/BTC/history/1Y`
    );
  }

  return formatDataChart(data.list[0].data);
};

import Axios from "axios";

export const getCrypto = async (token, cryptoList) => {
  const res = await Axios.get("http://localhost:8080/cryptos?cmids=ETH", {
    headers: {
      token: token,
    },
  });
  return res.data;
};

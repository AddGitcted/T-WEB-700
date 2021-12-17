import Axios from "axios";

export const createCrypto = async (token, name, idName, iconUrl) => {
  const res = await Axios.post(
    "http://localhost:8080/cryptos?cmids=ETH",
    {
      name: name,
      idName: idName,
      icone: iconUrl,
    },
    {
      headers: {
        token: token,
      },
    }
  );
  return res.data;
};

export const getCurrentCryptoList = async (token) => {
  const res = await Axios.get(
    `http://localhost:8080/cryptoManagement/?token=${token}`,
    {
      headers: {
        token: token,
      },
    }
  );
  return res.data;
};

export const deleteCurrentCrypto = async (token, id) => {
  const res = await Axios.delete(`http://localhost:8080/cryptoManagement/`, {
    headers: {
      token: token,
    },
  });
  return res.data;
};

import Axios from "axios";

export const createCrypto = async (token, name, idName, iconUrl) => {
  const res = await Axios.post(
    `${process.env.REACT_APP_API_HOST}/cryptoManagement/`,
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
    `${process.env.REACT_APP_API_HOST}/cryptoManagement/`,
    {
      headers: {
        token: token,
      },
    }
  );
  return res.data;
};

export const deleteCurrentCrypto = async (token, id) => {
  const res = await Axios.delete(
    `${process.env.REACT_APP_API_HOST}/cryptoManagement/${id}`,
    {
      headers: {
        token: token,
      },
    }
  );
  return res.data;
};

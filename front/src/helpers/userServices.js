import Axios from "axios";

export const loginUser = async (email, password, oauth) => {
  if (!oauth) {
    if (!email || !password) return;
  }
  const res = await Axios.post(`${process.env.REACT_APP_API_HOST}/user/login`, {
    email: email,
    password: password,
  });
  localStorage.setItem("token", JSON.stringify(res.data));
  return res.data;
};

export const registerUser = async (
  username,
  email,
  password,
  secondPassword,
  oauth
) => {
  if (!oauth) {
    if (!email || !username || !password || !secondPassword) return;
  }
  if (password === secondPassword) {
    const res = await Axios.post(
      `${process.env.REACT_APP_API_HOST}/user/register`,
      {
        email: email,
        password: password,
        username: username,
        preferences: ["BTC", "ETH"],
        role: "User",
        currency: "EUR",
      }
    );
    localStorage.setItem("token", JSON.stringify(res.data));
    return res.data;
  }
};

export const getUser = async (token, setUserData) => {
  Axios.get(`${process.env.REACT_APP_API_HOST}/user/profile`, {
    headers: {
      token: token,
    },
  })
    .then((res) => {
      setUserData(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    })
    .catch((err) => {
      setUserData("anonymous");
      console.error(err);
    });
};

export const deleteUser = async (token) => {
  Axios.delete(`${process.env.REACT_APP_API_HOST}/user/profile`, {
    headers: {
      token: token,
    },
  })
    .then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    })
    .catch((err) => {
      console.error(err);
    });
};

export const modifyUser = async (user, data, type, token) => {
  if (!data) return;
  if (type === "pass") {
    const res = await Axios.put(
      `${process.env.REACT_APP_API_HOST}/user/profile`,
      {
        email: user.email,
        password: data,
        username: user.username,
        preferences: user.preferences,
        role: user.role,
        currency: "EUR",
      },
      {
        headers: {
          token: token,
        },
      }
    );
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }

  if (type === "info") {
    const res = await Axios.put(
      `${process.env.REACT_APP_API_HOST}/user/profile`,

      {
        password: user.password,
        email: data?.email || user.email,
        username: data?.displayName || user.username,
        preferences: user.preferences,
        role: user.role,
        currency: "EUR",
      },
      {
        headers: {
          token: token,
        },
      }
    );
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }

  if (type === "crypto") {
    const res = await Axios.put(
      `${process.env.REACT_APP_API_HOST}/user/profile`,

      {
        password: user.password,
        email: data?.email || user.email,
        username: data?.displayName || user.username,
        preferences: data,
        role: user.role,
        currency: "EUR",
      },
      {
        headers: {
          token: token,
        },
      }
    );
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }
};

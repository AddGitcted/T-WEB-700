import { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import styled from "styled-components";

import { getUser } from "./helpers/userServices";
import Home from "./components/Home";
import CryptoCurrency from "./components/CryptoCurrency";
import Profile from "./components/User/Profile";
import NotFound from "./components/NotFound";
import Articles from "./components/Articles";
import CryptoCurrencies from "./components/CryptoCurrencies";

export const Context = createContext(null);

const App = () => {
  const [userData, setUserData] = useState("anonymous");

  const [showModal, setShowModal] = useState({
    display: false,
    type: "",
  });

  const [popupState, setPopupState] = useState({
    type: "",
    show: false,
    message: "",
  });

  const { token } = JSON.parse(localStorage.getItem("token")) || {};

  useEffect(() => {
    if (!token) setShowModal({ display: true, type: "loginModal" });
    if (!userData) getUser(token, setUserData).then((res) => setUserData(res));
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <BrowserRouter>
        <Context.Provider
          value={{
            userData,
            setUserData,
            showModal,
            setShowModal,
            setPopupState,
            popupState,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/cryptocurrency/:name" element={<CryptoCurrency />} />
            <Route path="/articles/" element={<Articles />} />
            <Route path="/cryptocurrencies/" element={<CryptoCurrencies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

export default App;

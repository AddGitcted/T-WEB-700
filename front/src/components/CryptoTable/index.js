import styled from "styled-components";
import { Table } from "antd";
import { getCrypto } from "../../helpers/cryptoServices";
import { getCurrentCryptoList } from "../../helpers/cryptoManagementServices";
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../App";

const CryptoTable = () => {
  const { token } = JSON.parse(localStorage.getItem("token")) || {};
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [list, setList] = useState();

  const { userData, setShowModal } = useContext(Context);

  const formatData = (data) => {
    return (
      data &&
      data.map((raw, index) => ({
        key: index + 1,
        symbol: raw.cryptoInfo.icone,
        idName: raw.cryptoInfo.idName,
        name: raw.cryptoInfo.name,
        link: `${raw.cryptoInfo.idName.toLocaleLowerCase}`,
        price_average: `${(raw.data.price_high + raw.data.price_low) / 2} €`,
        price_high: `${raw.data.price_high} €`,
        price_low: `${raw.data.price_low} €`,
      }))
    );
  };

  const formatData2 = (data, type) => {
    return (
      data &&
      data.map((raw, index) => ({
        key: index + 1,
        symbol: raw.icone,
        idName: raw.idName,
        name: raw.name,
        link: `${raw.idName.toLocaleLowerCase}`,
      }))
    );
  };

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        return (
          <NameCell>
            <img src={record.symbol} alt={record.idName} />
            <p>{record.name}</p>
            <p>{record.idName}</p>
          </NameCell>
        );
      },
    },
    {
      title: "Price average",
      dataIndex: "price_average",
      key: "price_average",
    },
    {
      title: "Price low",
      dataIndex: "price_low",
      key: "price_low",
    },
    {
      title: "Price high",
      dataIndex: "price_high",
      key: "price_high",
    },
  ];

  const columns2 = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        return (
          <NameCell>
            <img src={record.symbol} alt={record.idName} />
            <p>{record.name}</p>
            <p>{record.idName}</p>
          </NameCell>
        );
      },
    },
  ];

  const getData = () => {
    getCurrentCryptoList(token).then((res) => {
      getCrypto(token, res.cryptos).then((res) => {
        setData(
          res.list.filter((item) =>
            userData?.preferences.includes(item.cryptoInfo["idName"])
          )
        );
      });
    });
  };

  useEffect(() => {
    if (userData === "anonymous")
      getCurrentCryptoList(token).then((res) => {
        setList(res.cryptos);
      });
    else getData();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <Table
        dataSource={
          userData === "anonymous" ? formatData2(list) : formatData(data)
        }
        columns={userData === "anonymous" ? columns2 : columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) =>
              userData === "anonymous"
                ? setShowModal({ display: true, type: "loginModal" })
                : navigate(
                    `/cryptocurrency/${record.name.toLocaleLowerCase()}`
                  ),
          };
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #fafafa;
  padding: 15px;
  border-radius: 20px;
  box-shadow: rgb(0 0 0 / 10%) 0px 5px 20px;
`;

const NameCell = styled.div`
  display: flex;
  align-items: center;
  & > img {
    object-fit: cover;
    height: 30px;
    width: 30px;
  }
  & > p {
    margin: 0 0 0 5px !important;
    line-height: 1.5;
    margin: 0px;
    color: rgb(23, 25, 36);
    font-weight: 600;
    font-size: 14px;
  }
  & > p:last-child {
    margin: 0 0 0 5px !important;
    line-height: 1.5;
    margin: 0px;
    color: rgb(128, 138, 157);
    font-size: 14px;
  }
`;

export default CryptoTable;

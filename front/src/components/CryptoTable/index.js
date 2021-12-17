import styled from "styled-components";
import { Table } from "antd";
import { getCrypto } from "../../helpers/cryptoServices";
import { Link, useNavigate } from "react-router-dom";
import "antd/dist/antd.css";

const CryptoTable = () => {
  const { token } = JSON.parse(localStorage.getItem("token")) || {};
  const navigate = useNavigate();
  const list = [
    {
      cryptoInfo: {
        _id: {
          $oid: "61b283bd941bc11b1cb1e4c9",
        },
        icone:
          "https://www.ethereum-france.com/wp-content/uploads/2016/02/ETHEREUM-ICON_Black.png",
        idName: "SOL",
        name: "Solana",
      },
      data: {
        price_close: 3602.71,
        price_high: 3602.71,
        price_low: 3601.44,
        price_open: 3601.44,
        time_close: "2021-12-10T09:30:21.8220000Z",
        time_open: "2021-12-10T09:30:21.8220000Z",
        time_period_end: "2021-12-10T09:30:22.0000000Z",
        time_period_start: "2021-12-10T09:30:21.0000000Z",
        trades_count: 2,
        volume_traded: 0.03457568,
      },
    },
    {
      cryptoInfo: {
        _id: {
          $oid: "61b283bd941bc11b1cb1e4c9",
        },
        icone:
          "https://www.ethereum-france.com/wp-content/uploads/2016/02/ETHEREUM-ICON_Black.png",
        idName: "ETH",
        name: "Etherum",
      },
      data: {
        price_close: 3602.71,
        price_high: 3602.71,
        price_low: 3601.44,
        price_open: 3601.44,
        time_close: "2021-12-10T09:30:21.8220000Z",
        time_open: "2021-12-10T09:30:21.8220000Z",
        time_period_end: "2021-12-10T09:30:22.0000000Z",
        time_period_start: "2021-12-10T09:30:21.0000000Z",
        trades_count: 2,
        volume_traded: 0.03457568,
      },
    },
    {
      cryptoInfo: {
        _id: {
          $oid: "61b283bd941bc11b1cb1e4c9",
        },
        icone:
          "https://www.ethereum-france.com/wp-content/uploads/2016/02/ETHEREUM-ICON_Black.png",
        idName: "BTC",
        name: "Bitcoin",
      },
      data: {
        price_close: 3602.71,
        price_high: 3602.71,
        price_low: 3601.44,
        price_open: 3601.44,
        time_close: "2021-12-10T09:30:21.8220000Z",
        time_open: "2021-12-10T09:30:21.8220000Z",
        time_period_end: "2021-12-10T09:30:22.0000000Z",
        time_period_start: "2021-12-10T09:30:21.0000000Z",
        trades_count: 2,
        volume_traded: 0.03457568,
      },
    },

    {
      cryptoInfo: {
        _id: {
          $oid: "61b283bd941bc11b1cb1e4c9",
        },
        icone:
          "https://www.ethereum-france.com/wp-content/uploads/2016/02/ETHEREUM-ICON_Black.png",
        idName: "DOGE",
        name: "Dogecoin",
      },
      data: {
        price_close: 3602.71,
        price_high: 3602.71,
        price_low: 3601.44,
        price_open: 3601.44,
        time_close: "2021-12-10T09:30:21.8220000Z",
        time_open: "2021-12-10T09:30:21.8220000Z",
        time_period_end: "2021-12-10T09:30:22.0000000Z",
        time_period_start: "2021-12-10T09:30:21.0000000Z",
        trades_count: 2,
        volume_traded: 0.03457568,
      },
    },
  ];

  const dataSource = [
    {
      key: "1",
      symbol:
        "https://www.ethereum-france.com/wp-content/uploads/2016/02/ETHEREUM-ICON_Black.png",
      idName: "BTC",
      name: "Bitcoin",
      rank: 1,
      link: "/btc",
    },
    {
      key: "2",
      symbol:
        "https://www.ethereum-france.com/wp-content/uploads/2016/02/ETHEREUM-ICON_Black.png",
      idName: "BTC",
      name: "Bitcoin",
      rank: 2,
      link: "/eth",
    },
    {
      key: "3",
      symbol:
        "https://www.ethereum-france.com/wp-content/uploads/2036/02/ETHEREUM-ICON_Black.png",
      idName: "BTC",
      name: "Bitcoin",
      rank: 3,
      link: "/sol",
    },
    {
      key: "4",
      symbol:
        "https://www.ethereum-france.com/wp-content/uploads/2046/02/ETHEREUM-ICON_Black.png",
      idName: "BTC",
      name: "Bitcoin",
      rank: 4,
      link: "/doge",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Market Cap",
      dataIndex: "marketcap",
      key: "marketcap",
    },

    {
      title: "Volume (24hrs)",
      dataIndex: "volume",
      key: "volume",
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
    },
  ];

  return (
    <Wrapper>
      <Table
        dataSource={dataSource}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) =>
              navigate(`/cryptocurrency/${record.name.toLocaleLowerCase()}`),
          };
        }}
      />
      ;
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default CryptoTable;

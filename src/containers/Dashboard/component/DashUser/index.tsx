import {
  DownloadOutlined,
  UserOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Input, Row, Table, Tag } from "antd";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line, Pie } from "react-chartjs-2";
import "./index.scss";

const { Search } = Input;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashUser = () => {
  const data: ChartData<"line", any, unknown> = {
    labels: [1, 5, 10, 15, 20, 25],
    // backgroundColor: ["rgba(255,0,0,1)"],
    // lineTension: 1,
    datasets: [
      {
        label: "HSN",
        fill: false,
        borderColor: "rgba(255, 0, 0, 0.3)",
        pointRadius: 2,
        data: [65, 59, 80, 81, 56, 55, 40],
        cubicInterpolationMode: "monotone",
        tension: 0.4,
      },
    ],
  };

  var options = {
    legend: {
      position: "right",
      labels: {
        boxWidth: 10,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: { display: false },
        },
        {
          gridLines: {
              display:false
          }
        }
      ],
      yAxes: [
        {
          ticks: { display: false },
        },
        {
          gridLines: {
              display:false
          }
        }
      ],
    },
  };

  const tableColumns: any = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: "Philantrophist",
      dataIndex: "name",
      key: "name",
      render: (name: any) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Avatar icon={<UserOutlined />} />
          {name}
        </div>
      ),
    },
    {
      title: "Donee",
      dataIndex: "donee",
      key: "donee",
      render: (name: any) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Avatar icon={<UserOutlined />} />
          {name}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      key: "status",
      sorter: (a: any, b: any) => a.status - b.status,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a: any, b: any) => a.date - b.date,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a: any, b: any) => a.amount - b.amount,
    },
  ];

  const tableData = [
    {
      id: "1",
      key: "1",
      name: "John Brown",
      donee: "A",
      status: ["loser"],
      date: "20/12/2022",
      amount: "11,234,678 ETH",
    },
    {
      id: "2",

      key: "2",
      name: "John Brown",
      donee: "A",
      status: ["loser"],
      date: "20/12/2022",
      amount: "11,234,678 ETH",
    },
    {
      id: "3",
      key: "3",
      name: "John Brown",
      donee: "A",
      status: ["loser"],
      date: "20/12/2022",
      amount: "11,234,678 ETH",
    },
    {
      id: "4",
      key: "4",
      name: "John Brown",
      donee: "A",
      status: ["loser"],
      date: "20/12/2022",
      amount: "11,234,678 ETH",
    },
    {
      id: "5",
      key: "5",
      name: "John Brown",
      donee: "A",
      status: ["loser"],
      date: "20/12/2022",
      amount: "11,234,678 ETH",
    },
    {
      id: "6",
      key: "6",
      name: "John Brown",
      donee: "A",
      status: ["loser"],
      date: "20/12/2022",
      amount: "11,234,678 ETH",
    },
  ];

  // function onChange(pagination, filters, sorter, extra) {
  //   console.log("params", pagination, filters, sorter, extra);
  // }

  return (
    <div className="dash-system">
      <Row gutter={24}>
        <Col span={12} className="gutter-row">
          <div className="chart-group">
            <div className="chart-group__header">
              <p className="chart-group__header__title">Your Giving</p>
              <div className="chart-group__header__icons">
                <ZoomInOutlined
                  style={{ fontSize: "17px", color: "black" }}
                  className="chart-group__header__icons__zoom"
                />
                <DownloadOutlined
                  style={{ fontSize: "15px", color: "black" }}
                />
              </div>
            </div>
            <Line data={data} className="chart-group__chart" />
            <div className="chart-group__data-group">
              <h3 className="chart-group__data-group__title">Total charity</h3>
              <h1 className="chart-group__data-group__data">
                1,307,000 ETH
                <span className="chart-group__data-group__data__rate">
                  32,5%
                </span>
              </h1>
            </div>
          </div>
        </Col>
        <Col span={12} className="gutter-row">
          <div className="chart-group">
            <div className="chart-group__header">
              <h1 className="chart-group__header__title">Your Receiving</h1>
              <div className="chart-group__header__icons">
                <ZoomInOutlined
                  style={{ fontSize: "17px", color: "black" }}
                  className="chart-group__header__icons__zoom"
                />
                <DownloadOutlined
                  style={{ fontSize: "15px", color: "black" }}
                />
              </div>
            </div>
            <Line data={data} className="chart-group__chart" />
            <div className="chart-group__data-group">
              <h3 className="chart-group__data-group__title">
                Total user action
              </h3>
              <h1 className="chart-group__data-group__data">
                1,234,643
                <span className="chart-group__data-group__data__rate">
                  32,5%
                </span>
              </h1>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={16} className="dash-system__row-table">
        <Col span={18} className="gutter-row">
          <div className="table-group">
            <div className="table-group__header">
              <p className="table-group__header__title">History transaction</p>
              <div className="table-group__header__right-group">
                <Search
                  placeholder="Search donee, history..."
                  // onSearch={onSearch}
                  style={{ width: 230 }}
                />
                <div className="table-group__header__right-group__icons">
                  <ZoomInOutlined
                    style={{ fontSize: "17px", color: "black" }}
                    className="table-group__header__right-group__icons__zoom"
                  />
                  <DownloadOutlined
                    style={{ fontSize: "15px", color: "black" }}
                  />
                </div>
              </div>
            </div>
            <Table
              columns={tableColumns}
              dataSource={tableData}
              // onChange={onCha}
            />
          </div>
        </Col>
        <Col span={6} className="gutter-row">
          <div className="chart-group">
            <div className="chart-group__header">
              <h1 className="chart-group__header__title">Your his</h1>
              <div className="chart-group__header__icons">
                <ZoomInOutlined
                  style={{ fontSize: "17px", color: "black" }}
                  className="chart-group__header__icons__zoom"
                />
                <DownloadOutlined
                  style={{ fontSize: "15px", color: "black" }}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DashUser;

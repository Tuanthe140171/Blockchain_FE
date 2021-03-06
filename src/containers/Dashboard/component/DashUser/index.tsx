import React, { useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Avatar, Col, Input, Row, Table, Image, Tooltip } from "antd";
import { BigNumber } from "bignumber.js";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip as ChartTooltip,
} from "chart.js";
import { ethers } from "ethers";
import { Line } from "react-chartjs-2";
import { useWeb3React } from "web3-react-core";
import moment from "moment";
//@ts-ignore
import currencyFormatter from 'currency-formatter';
import useFetch from "../../../../hooks/useFetch";
import useDebounce from "../../../../hooks/useDebounce";
import { shortenTx } from "../../../../utils";
import { exportDataToCsv } from "../../../../utils/csvGenerator";
import { plugins } from "../../../../utils/chart";
import { toPercent } from "../../../../utils/convert";
import { options } from "../../../../constants/chart";
import { CHAIN_INFO } from "../../../../constants/chainInfo";
import { SupportedChainId } from "../../../../constants/chains";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const { Search } = Input;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

enum CharityStatus {
  UP,
  DOWN,
  UNDECIDED,
}

const DashUser: React.FC<{
  pickedDate:
  | {
    from: number;
    to: number;
  }
  | undefined;
}> = (props) => {
  const navigate = useNavigate();
  const { account, chainId } = useWeb3React();
  const [keyWord, setKeyWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [chartRef, setChartRef] = useState<any>();
  const [secChartRef, setSecChartRef] = useState<any>();

  const debouncedKeyword = useDebounce<string>(keyWord, 500);

  const { explorer } =
    CHAIN_INFO[
    chainId ? (chainId as SupportedChainId) : SupportedChainId.CHARITY
    ];

  const { data: transactionsResp, loading } = useFetch<any>(
    `transactions?page=${currentPage}&userAddress=${account}&keyword=${debouncedKeyword}`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );

  const { data: userStatsResp } = useFetch<any>(
    `users/stats?userAddress=${account}`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );

  const { data: dailyDonationResp } = useFetch<any>(
    !props.pickedDate
      ? `transactions/daily/user?userAddress=${account}`
      : `transactions/daily/user?userAddress=${account}&fromDate=${props.pickedDate.from}&toDate=${props.pickedDate.to}`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );

  const givingStatus = {
    status: CharityStatus.UP,
    percentage: new BigNumber(0),
    totalGiving: new BigNumber(0),
  };

  const receivingStatus = {
    status: CharityStatus.UP,
    percentage: new BigNumber(0),
    totalReceiving: new BigNumber(0),
  };

  if (dailyDonationResp && dailyDonationResp.userDonationDayDatas.length >= 1) {
    const dayDatas = dailyDonationResp.userDonationDayDatas;
    const totalReceives = dayDatas.map((data: any) =>
      parseInt(data.totalReceive)
    );
    const totalGivings = dayDatas.map((data: any) =>
      parseInt(data.totalDonation)
    );

    if (
      totalReceives.length >= 2 &&
      totalReceives[totalReceives.length - 2] > 0
    ) {
      receivingStatus.percentage = new BigNumber(
        totalReceives[totalReceives.length - 1]
      )
        .div(1e18)
        .minus(new BigNumber(totalReceives[totalReceives.length - 2]).div(1e18))
        .div(new BigNumber(totalReceives[totalReceives.length - 2]).div(1e18));
    } else {
      receivingStatus.percentage = new BigNumber(
        totalReceives[totalReceives.length - 1]
      )
        .div(1e18)
        .minus(new BigNumber(0));
    }
    receivingStatus.status = new BigNumber(receivingStatus.percentage).lt(0)
      ? CharityStatus.DOWN
      : CharityStatus.UP;

    if (totalGivings.length >= 2 && totalGivings[totalGivings.length - 2] > 0) {
      givingStatus.percentage = new BigNumber(
        totalGivings[totalGivings.length - 1]
      )
        .div(1e18)
        .minus(new BigNumber(totalGivings[totalGivings.length - 2]).div(1e18))
        .div(new BigNumber(totalGivings[totalGivings.length - 2]).div(1e18));
    } else {
      givingStatus.percentage = new BigNumber(
        totalGivings[totalGivings.length - 1]
      )
        .div(1e18)
        .minus(new BigNumber(0));
    }
    givingStatus.status = new BigNumber(givingStatus.percentage).lt(0)
      ? CharityStatus.DOWN
      : CharityStatus.UP;
  }

  const transactionsTableData = transactionsResp
    ? transactionsResp.rows.map((transaction: any) => ({
      id: transaction.id,
      key: shortenTx(transaction.id),
      name:
        ethers.utils.getAddress(transaction.fromUser.walletAddress) ===
          ethers.utils.getAddress(account || "")
          ? "B???n"
          : transaction.fromUser.name,
      donee:
        ethers.utils.getAddress(transaction.toUser.walletAddress) ===
          ethers.utils.getAddress(account || "")
          ? "B???n"
          : transaction.toUser.name,
      date: moment(new Date(transaction["date"])).format("MM/DD/YY hh:ss"),
      amount: currencyFormatter.format(new BigNumber(transaction.amount).div(1e18).multipliedBy(1000).toFixed(), { code: 'VND' }),
      status: ["loser"],
      doneeAvatar: (function () {
        const userAvatar = transaction.toUser.UserMedia.filter(
          (userMedia: any) => userMedia.type === "1" && userMedia.active === 1
        )
          .slice(0, 1)
          .pop();
        return userAvatar ? userAvatar.link : null;
      })(),
      avatar: (function () {
        const userAvatar = transaction.fromUser.UserMedia.filter(
          (userMedia: any) => userMedia.type === "1" && userMedia.active === 1
        )
          .slice(0, 1)
          .pop();
        return userAvatar ? userAvatar.link : null;
      })(),
      philanthropistId: transaction.fromUser.id,
      doneeId: transaction.toUser.id,
    }))
    : [];

  var gradientStroke = chartRef?.ctx?.createLinearGradient(0, 500, 0, 100);
  gradientStroke?.addColorStop(1, "rgba(238, 201, 9, 0.27)");
  gradientStroke?.addColorStop(0.3, "rgba(255, 255, 255, 0)");

  var userGradientStroke = secChartRef?.ctx?.createLinearGradient(
    0,
    500,
    0,
    100
  );
  userGradientStroke?.addColorStop(1, "rgba(82, 191, 214, 0.3)");
  userGradientStroke?.addColorStop(0.3, "rgba(255, 255, 255, 0)");

  const data: ChartData<"line", any, unknown> = {
    labels: dailyDonationResp
      ? dailyDonationResp.userDonationDayDatas.map((data: any) =>
        moment(parseInt(data.date) * 1000).format("DD-MM-yy")
      )
      : [],
    datasets: [
      {
        fill: true,
        data: dailyDonationResp
          ? dailyDonationResp.userDonationDayDatas.map((data: any) =>
            new BigNumber(data.totalDonation).div(1e18).toFixed(4)
          )
          : [],
        backgroundColor: gradientStroke,
        borderColor: "#EEC909",
        tension: 0.5,
        pointBorderWidth: 0,
        pointHoverBorderWidth: 2,
        pointHoverBackgroundColor: "white",
      },
    ],
  };

  const receivingData: ChartData<"line", any, unknown> = {
    labels: dailyDonationResp
      ? dailyDonationResp.userDonationDayDatas.map((data: any) =>
        moment(parseInt(data.date) * 1000).format("DD-MM-yy")
      )
      : [],
    datasets: [
      {
        fill: true,
        data: dailyDonationResp
          ? dailyDonationResp.userDonationDayDatas.map((data: any) =>
            new BigNumber(data.totalReceive).div(1e18).toFixed(4)
          )
          : [],
        backgroundColor: userGradientStroke,
        borderColor: "#52BFD6",
        tension: 0.5,
        pointBorderWidth: 0,
        pointHoverBorderWidth: 2,
        pointHoverBackgroundColor: "white",
      },
    ],
  };

  const tableColumns: any = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a: any, b: any) => a.id - b.id,
      render: (name: any, others: any) => (
        <Tooltip title={name}>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => window.open(`${explorer}/tx/${name}`, "_blank")}
          >
            {shortenTx(name)}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Ng?????i t??? thi???n",
      dataIndex: "name",
      key: "name",
      render: (name: any, others: any) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          className="transaction-table__philanthropist"
        >
          <Avatar src={others.avatar} style={{ marginRight: 20 }} />
          <p
            onClick={() => navigate(`/profile/${others.philanthropistId}`)}
            style={{ cursor: "pointer", marginBottom: 0 }}
          >
            {name}
          </p>
        </div>
      ),
    },
    {
      title: "Ng?????i nh???n",
      dataIndex: "donee",
      key: "donee",
      render: (name: any, others: any) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
            className="transaction-table__donee"
          >
            <Avatar src={others.doneeAvatar} style={{ marginRight: 20 }} />
            <p
              onClick={() => navigate(`/profile`)}
              style={{ cursor: "pointer", marginBottom: 0 }}
            >
              {name}
            </p>
          </div>
        );
      },
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   render: (tags: any) => (
    //     <>
    //       {tags.map((tag: any) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    //   key: "status",
    //   sorter: (a: any, b: any) => a.status - b.status,
    // },
    {
      title: "Ng??y",
      dataIndex: "date",
      key: "date",
      sorter: (a: any, b: any) => a.date - b.date,
    },
    {
      title: "S??? ti???n",
      dataIndex: "amount",
      key: "amount",
      sorter: (a: any, b: any) => a.amount - b.amount,
    },
  ];

  return (
    <div className="dash-system">
      <Row gutter={24}>
        <Col span={12} className="gutter-row">
          <div className="chart-group">
            <div className="chart-group__header">
              <p className="chart-group__header__title">B???n cho ??i</p>
              <div className="chart-group__header__icons">
                <DownloadOutlined
                  style={{ fontSize: "15px", color: "black" }}
                  onClick={() =>
                    exportDataToCsv(
                      dailyDonationResp
                        ? dailyDonationResp.userDonationDayDatas
                        : [],
                      "daily-donation"
                    )
                  }
                />
              </div>
            </div>
            <Line
              data={data}
              ref={(ref) => setChartRef(ref)}
              options={options}
              plugins={plugins() as any}
              className="chart-group__chart"
            />
            <div className="chart-group__data-group">
              <h3 className="chart-group__data-group__title">T???ng s??? cho ??i</h3>
              <h1 className="chart-group__data-group__data">
                {userStatsResp && userStatsResp.userStatistic
                  ? new BigNumber(userStatsResp.userStatistic.totalDonation)
                    .div(1e18)
                    .toFixed(4)
                  : 0}{" "}
                <Image src="/icon/ethereum_1.svg" preview={false} />
                <span
                  className={`chart-group__data-group__data__rate chart-group__data-group__data__rate--${givingStatus.status === CharityStatus.UP ? "up" : "down"
                    }`}
                >
                  <Image
                    preview={false}
                    src="/icon/growth.svg"
                    className={`chart-group__data-group__data__icon--${givingStatus.status === CharityStatus.UP ? "up" : "down"
                      }`}
                  />
                  <span>{toPercent(givingStatus.percentage)}%</span>
                </span>
              </h1>
            </div>
          </div>
        </Col>
        <Col span={12} className="gutter-row">
          <div className="chart-group">
            <div className="chart-group__header">
              <h1 className="chart-group__header__title">B???n nh???n v???</h1>
              <div className="chart-group__header__icons">
                <DownloadOutlined
                  style={{ fontSize: "15px", color: "black" }}
                  onClick={() =>
                    exportDataToCsv(
                      dailyDonationResp
                        ? dailyDonationResp.userDonationDayDatas
                        : [],
                      "daily-donation"
                    )
                  }
                />
              </div>
            </div>
            <Line
              data={receivingData}
              options={options}
              ref={(ref) => setSecChartRef(ref)}
              plugins={plugins("#52BFD6") as any}
              className="chart-group__chart"
            />
            <div className="chart-group__data-group">
              <h3 className="chart-group__data-group__title">
                T???ng s??? nh???n v???
              </h3>
              <h1 className="chart-group__data-group__data">
                {userStatsResp && userStatsResp.userStatistic
                  ? new BigNumber(
                    userStatsResp.userStatistic.totalDonationReceive
                  )
                    .div(1e18)
                    .toFixed(4)
                  : 0}{" "}
                <Image src="/icon/ethereum_1.svg" preview={false} />
                <span
                  className={`chart-group__data-group__data__rate chart-group__data-group__data__rate--${receivingStatus.status === CharityStatus.UP ? "up" : "down"
                    }`}
                >
                  <Image
                    preview={false}
                    src="/icon/growth.svg"
                    className={`chart-group__data-group__data__icon--${receivingStatus.status === CharityStatus.UP
                        ? "up"
                        : "down"
                      }`}
                  />
                  <span>{toPercent(receivingStatus.percentage)}%</span>
                </span>
              </h1>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={24} className="dash-system__row-table">
        <Col span={24} className="gutter-row">
          <div className="table-group">
            <div className="table-group__header">
              <p className="table-group__header__title">L???ch s??? t??? thi???n</p>
              <div className="table-group__header__right-group">
                <Search
                  placeholder="T??n, s??? l?????ng..."
                  // onSearch={onSearch}
                  style={{ width: 230 }}
                  value={keyWord}
                  onChange={(e) => {
                    setCurrentPage(1);
                    setKeyWord(e.target.value.replace(/[^a-z0-9A-Z ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????]/g, ""))
                  }}
                />
                <div className="table-group__header__right-group__icons">
                  <DownloadOutlined
                    style={{ fontSize: "15px", color: "black" }}
                    onClick={() =>
                      exportDataToCsv(
                        transactionsResp
                          ? transactionsResp.rows.map((transaction: any) => ({
                            id: transaction.id,
                            key: shortenTx(transaction.id),
                            name:
                              ethers.utils.getAddress(transaction.fromUser.walletAddress) ===
                                ethers.utils.getAddress(account || "")
                                ? "B???n"
                                : transaction.fromUser.name,
                            donee:
                              ethers.utils.getAddress(transaction.toUser.walletAddress) ===
                                ethers.utils.getAddress(account || "")
                                ? "B???n"
                                : transaction.toUser.name,
                            date: moment(new Date(transaction["date"])).format("MM/DD/YY hh:ss").toString(),
                            amount: currencyFormatter.format(new BigNumber(transaction.amount).div(1e18).multipliedBy(1000).toFixed(), { code: 'VND' }),
                            status: ["loser"],
                            doneeAvatar: (function () {
                              const userAvatar = transaction.toUser.UserMedia.filter(
                                (userMedia: any) => userMedia.type === "1" && userMedia.active === 1
                              )
                                .slice(0, 1)
                                .pop();
                              return userAvatar ? userAvatar.link : null;
                            })(),
                            avatar: (function () {
                              const userAvatar = transaction.fromUser.UserMedia.filter(
                                (userMedia: any) => userMedia.type === "1" && userMedia.active === 1
                              )
                                .slice(0, 1)
                                .pop();
                              return userAvatar ? userAvatar.link : null;
                            })(),
                            philanthropistId: transaction.fromUser.id,
                            doneeId: transaction.toUser.id,
                          }))
                          : []
                        , "transactions")
                    }
                  />
                </div>
              </div>
            </div>
            <Table
              className="transaction-table"
              columns={tableColumns}
              dataSource={transactionsTableData}
              pagination={{
                defaultPageSize: transactionsResp ? transactionsResp.limit : 10,
                pageSize: transactionsResp ? transactionsResp.limit : 10,
                total: transactionsResp ? transactionsResp.count : 0,
                current: currentPage,
              }}
              onChange={(props: any) => setCurrentPage(props.current)}
              loading={loading}
            />
          </div>
        </Col>
        {/* <Col span={6} className="gutter-row">
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
        </Col> */}
      </Row>
    </div>
  );
};

export default DashUser;

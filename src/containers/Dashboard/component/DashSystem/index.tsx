import { DownloadOutlined } from "@ant-design/icons";
import { Avatar, Col, Input, Row, Table, Image, Tooltip } from "antd";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip as ChartTooltip,
} from "chart.js";
import { ethers } from "ethers";
import { useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { useWeb3React } from "web3-react-core";
import moment from "moment";
import BigNumber from "bignumber.js";
//@ts-ignore
import currencyFormatter from 'currency-formatter';
import useFetch from "../../../../hooks/useFetch";
import useDebounce from "../../../../hooks/useDebounce";
import { shortenTx } from "../../../../utils";
import { plugins } from "../../../../utils/chart";
import { exportDataToCsv } from "../../../../utils/csvGenerator";
import { toPercent } from "../../../../utils/convert";
import { options } from "../../../../constants/chart";
import { CHAIN_INFO } from "../../../../constants/chainInfo";
import { SupportedChainId } from "../../../../constants/chains";
import { useNavigate } from "react-router-dom";
import "./index.scss";

enum CharityStatus {
  UP,
  DOWN,
  UNDECIDED,
}

const { Search } = Input;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  Filler,
  ArcElement
);

const DashSystem: React.FC<{
  pickedDate:
  | {
    from: number;
    to: number;
  }
  | undefined;
}> = (props) => {
  const { chainId, account } = useWeb3React();
  const [keyWord, setKeyWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [chartRef, setChartRef] = useState<any>();
  const [userChartRef, setUserChartRef] = useState<any>();

  const debouncedKeyword = useDebounce<string>(keyWord, 500);
  const navigate = useNavigate();

  const { explorer } =
    CHAIN_INFO[
    chainId ? (chainId as SupportedChainId) : SupportedChainId.CHARITY
    ];

  const { data: transactionsResp, loading } = useFetch<any>(
    `transactions?page=${currentPage}&keyword=${debouncedKeyword}`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );

  const { data: userStatsResp } = useFetch<any>(`users/stats/number`, {
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  const { data: dailyDonationResp } = useFetch<any>(
    !props.pickedDate
      ? `transactions/daily`
      : `transactions/daily?fromDate=${props.pickedDate.from}&toDate=${props.pickedDate.to}`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );

  const { data: donationResp } = useFetch<any>(`landing-page/stats`, {
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  const { data: userActiveResp } = useFetch<any>(
    !props.pickedDate
      ? `active/stats`
      : `active/stats?fromDate=${props.pickedDate.from}&toDate=${props.pickedDate.to}`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );

  const charityStatus = {
    status: CharityStatus.UP,
    percentage: new BigNumber(0),
  };

  const userStatsStatus = {
    status: CharityStatus.UP,
    percentage: new BigNumber(0),
    totalUserActions: new BigNumber(0),
  };

  if (dailyDonationResp && dailyDonationResp.donationDayDatas.length >= 1) {
    const dayDatas = dailyDonationResp.donationDayDatas;
    if (dayDatas.length >= 2 && dayDatas[dayDatas.length - 2].dailyVolume > 0) {
      charityStatus.percentage = new BigNumber(
        dayDatas[dayDatas.length - 1].dailyVolume
      )
        .div(1e18)
        .minus(
          new BigNumber(dayDatas[dayDatas.length - 2].dailyVolume).div(1e18)
        )
        .div(
          new BigNumber(dayDatas[dayDatas.length - 2].dailyVolume).div(1e18)
        );
    } else {
      charityStatus.percentage = new BigNumber(
        dayDatas[dayDatas.length - 1].dailyVolume
      )
        .div(1e18)
        .minus(new BigNumber(0));
    }
    charityStatus.status = new BigNumber(charityStatus.percentage).lt(0)
      ? CharityStatus.DOWN
      : CharityStatus.UP;
  }

  if (userActiveResp && userActiveResp.length >= 1) {
    if (
      userActiveResp.length >= 2 &&
      userActiveResp[userActiveResp.length - 2].count > 0
    ) {
      userStatsStatus.percentage = new BigNumber(
        userActiveResp[userActiveResp.length - 1].count
      )
        .minus(new BigNumber(userActiveResp[userActiveResp.length - 2].count))
        .div(new BigNumber(userActiveResp[userActiveResp.length - 2].count));
    } else {
      userStatsStatus.percentage = new BigNumber(
        userActiveResp[userActiveResp.length - 1].count
      ).minus(new BigNumber(0));
    }
    userStatsStatus.status = new BigNumber(userStatsStatus.percentage).lt(0)
      ? CharityStatus.DOWN
      : CharityStatus.UP;

    for (let userStats of userActiveResp) {
      userStatsStatus.totalUserActions = userStatsStatus.totalUserActions.plus(
        new BigNumber(userStats.count)
      );
    }
  }

  var gradientStroke = chartRef?.ctx?.createLinearGradient(0, 500, 0, 100);
  gradientStroke?.addColorStop(1, "rgba(238, 201, 9, 0.27)");
  gradientStroke?.addColorStop(0.3, "rgba(255, 255, 255, 0)");

  var userGradientStroke = userChartRef?.ctx?.createLinearGradient(
    0,
    500,
    0,
    100
  );
  userGradientStroke?.addColorStop(1, "rgba(82, 191, 214, 0.3)");
  userGradientStroke?.addColorStop(0.3, "rgba(255, 255, 255, 0)");

  const data: ChartData<"line", any, unknown> = {
    labels: dailyDonationResp
      ? dailyDonationResp.donationDayDatas.map((data: any) =>
        moment(parseInt(data.date) * 1000).format("DD-MM")
      )
      : [],
    datasets: [
      {
        fill: true,
        data: dailyDonationResp
          ? dailyDonationResp.donationDayDatas.map((data: any) =>
            new BigNumber(data.dailyVolume).div(1e18).toFixed(4)
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

  const userStatsData: ChartData<"line", any, unknown> = {
    labels: userActiveResp
      ? userActiveResp.map((stats: any) =>
        moment(new Date(stats.date)).format("DD-MM")
      )
      : [],
    datasets: [
      {
        fill: true,
        data: userActiveResp
          ? userActiveResp.map((stats: any) => stats.count)
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
              onClick={() => navigate(`/profile/${others.doneeId}`)}
              style={{ cursor: "pointer", marginBottom: 0 }}
            >
              {name}
            </p>
          </div>
        );
      },
    },
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

  const pieData: ChartData<"pie", any, unknown> = {
    labels: ["Ng?????i ??i t??? thi???n", "Ng?????i c???n t??? thi???n"],
    datasets: [
      {
        data: userStatsResp
          ? [
            userStatsResp.totalNum - userStatsResp.doneeNum,
            userStatsResp.doneeNum,
          ]
          : [50, 50],
        backgroundColor: ["#52BFD6", "#EA6A3F"],
      },
    ],
  };

  return (
    <div className="dash-system">
      <Row gutter={24}>
        <Col span={12} className="gutter-row">
          <div className="chart-group">
            <div className="chart-group__header">
              <p className="chart-group__header__title">T???ng t??? thi???n</p>
              <div className="chart-group__header__icons">
                <DownloadOutlined
                  style={{ fontSize: "15px", color: "black" }}
                  onClick={() =>
                    exportDataToCsv(
                      dailyDonationResp
                        ? dailyDonationResp.donationDayDatas
                        : [],
                      "daily-donation"
                    )
                  }
                />
              </div>
            </div>
            <Line
              ref={(ref) => setChartRef(ref)}
              data={data}
              plugins={plugins() as any}
              options={options}
              className="chart-group__chart"
            />
            <div className="chart-group__data-group">
              <h3 className="chart-group__data-group__title">
                T???ng ti???n t??? thi???n
              </h3>
              <h1 className="chart-group__data-group__data">
                {donationResp && donationResp.donations.length !== 0
                  ? new BigNumber(donationResp.donations[0].totalVolume)
                    .div(1e18)
                    .toFixed(4)
                  : 0}{" "}
                <Image src="/icon/ethereum_1.svg" preview={false} />
                <span
                  className={`chart-group__data-group__data__rate chart-group__data-group__data__rate--${charityStatus.status === CharityStatus.UP ? "up" : "down"
                    }`}
                >
                  <Image
                    preview={false}
                    src="/icon/growth.svg"
                    className={`chart-group__data-group__data__icon--${charityStatus.status === CharityStatus.UP ? "up" : "down"
                      }`}
                  />
                  <span>{toPercent(charityStatus.percentage)}%</span>
                </span>
              </h1>
            </div>
          </div>
        </Col>
        <Col span={12} className="gutter-row">
          <div className="chart-group">
            <div className="chart-group__header">
              <h1 className="chart-group__header__title">L?????t truy c???p</h1>
              <div className="chart-group__header__icons">
                <DownloadOutlined
                  style={{ fontSize: "15px", color: "black" }}
                  onClick={() =>
                    exportDataToCsv(
                      userActiveResp ? userActiveResp : [],
                      "user-active"
                    )
                  }
                />
              </div>
            </div>
            <Line
              ref={(ref) => setUserChartRef(ref)}
              data={userStatsData}
              options={options}
              plugins={plugins("#52BFD6") as any}
              className="chart-group__chart"
            />
            <div className="chart-group__data-group">
              <h3 className="chart-group__data-group__title">
                T???ng l?????t truy c???p
              </h3>
              <h1 className="chart-group__data-group__data">
                {userStatsStatus.totalUserActions.toFixed()}
                <span
                  className={`chart-group__data-group__data__rate chart-group__data-group__data__rate--${userStatsStatus.status === CharityStatus.UP ? "up" : "down"
                    }`}
                >
                  <Image
                    preview={false}
                    src="/icon/growth.svg"
                    className={`chart-group__data-group__data__icon--${userStatsStatus.status === CharityStatus.UP
                      ? "up"
                      : "down"
                      }`}
                  />
                  <span>{toPercent(userStatsStatus.percentage)}%</span>
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
              <p className="table-group__header__title">L???ch s??? t??? thi???n</p>
              <div className="table-group__header__right-group">
                <Search
                  placeholder="T??n, s??? l?????ng ..."
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
                            amount: new BigNumber(transaction.amount).div(1e18).toFixed(),
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
        <Col span={6} className="gutter-row">
          <div className="chart-group">
            <div className="chart-group__header">
              <h1 className="chart-group__header__title">Ng?????i d??ng</h1>
              <div className="chart-group__header__icons">
                <DownloadOutlined
                  style={{ fontSize: "15px", color: "black" }}
                />
              </div>
            </div>
            <Pie data={pieData} className="chart-group__chart" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DashSystem;

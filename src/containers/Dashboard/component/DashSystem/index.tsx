import {
  DownloadOutlined,
  UserOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Input, Row, Table, Image } from "antd";
import { exportDataToCsv } from '../../../../utils/csvGenerator';
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
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import moment from "moment";
import BigNumber from "bignumber.js";
import useFetch from "../../../../hooks/useFetch";
import { shortenAddress, shortenTx } from "../../../../utils";
import "./index.scss";

enum CharityStatus {
  UP,
  DOWN,
  UNDECIDED
}

const { Search } = Input;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);


const plugins = [
  {
    afterDraw: (chart: { tooltip?: any; scales?: any; ctx?: any }) => {
      // eslint-disable-next-line no-underscore-dangle
      if (chart.tooltip && chart.tooltip._active && chart.tooltip._active.length) {
        // find coordinates of tooltip
        const activePoint = chart.tooltip._active[0];
        const { ctx } = chart;
        const { x, y } = activePoint.element;
        const topY = chart.scales.y.top;
        const bottomY = chart.scales.y.bottom;
        const topX = chart.scales.x.left;
        const bottomX = chart.scales.x.right;

        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = '#EEC909';

        // draw vertical line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.stroke();


        // Draw horizontal line
        ctx.beginPath();
        ctx.moveTo(topX, y);
        ctx.lineTo(bottomX, y);
        ctx.stroke();

        ctx.restore();
      }
    },
  },
];

const DashSystem: React.FC<{
  pickedDate: {
    from: number,
    to: number
  } | undefined
}> = (props) => {
  console.log(props.pickedDate);
  const [currentPage, setCurrentPage] = useState(1);
  const [chartRef, setChartRef] = useState<any>();
  const { data: transactionsResp, loading } = useFetch<any>(`transactions?page=${currentPage}`, {
    "Content-Type": "application/json",
    Accept: "application/json"
  });

  const { data: userStatsResp, loading: userStatsLoading } = useFetch<any>(`users/stats/number`, {
    "Content-Type": "application/json",
    Accept: "application/json"
  });

  const { data: dailyDonationResp, loading: dailyDonationLoading } = useFetch<any>(
    !props.pickedDate ? `transactions/daily`: `transactions/daily?fromDate=${props.pickedDate.from}&toDate=${props.pickedDate.to}`, 
    {
    "Content-Type": "application/json",
    Accept: "application/json"
    }
  );

  const { data: donationResp, loading: donationRespLoading } = useFetch<any>(`landing-page/stats`, {
    "Content-Type": "application/json",
    Accept: "application/json"
  });

  const charityStatus = {
    status: CharityStatus.UP,
    percentage: '0'
  }

  if (dailyDonationResp && dailyDonationResp.donationDayDatas.length >= 1) {
    const dayDatas = dailyDonationResp.donationDayDatas;
    if (dayDatas.length >= 2 && dayDatas[dayDatas.length - 2].dailyVolume > 0) {
      console.log(
        dayDatas[dayDatas.length - 1].dailyVolume,
        dayDatas[dayDatas.length - 2].dailyVolume
      )
      charityStatus.percentage = new BigNumber((dayDatas[dayDatas.length - 1].dailyVolume / dayDatas[dayDatas.length - 2].dailyVolume)).multipliedBy(100).toFixed(4)
    }
    charityStatus.status = new BigNumber(charityStatus.percentage).lt(1) ? CharityStatus.DOWN : CharityStatus.UP;
  }

  var gradientStroke = chartRef?.ctx?.createLinearGradient(0, 500, 0, 100);
  gradientStroke?.addColorStop(1, "rgba(238, 201, 9, 0.27)");
  gradientStroke?.addColorStop(0.3, "rgba(255, 255, 255, 0)");

  const data: ChartData<"line", any, unknown> = {
    labels: dailyDonationResp ? dailyDonationResp.donationDayDatas.map((data: any) => moment(parseInt(data.date) * 1000).format("DD-MM-yy")) : [],
    datasets: [
      {
        fill: true,
        data: dailyDonationResp ? dailyDonationResp.donationDayDatas.map((data: any) => new BigNumber(data.dailyVolume).div(new BigNumber(10).pow(18)).toFixed()) : [],
        backgroundColor: gradientStroke,
        borderColor: '#EEC909',
        tension: 0.5,
        pointBorderWidth: 0,
        pointHoverBorderWidth: 2,
        pointHoverBackgroundColor: "white"
      },
    ],
  };

  var options: any = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    // maintainAspectRatio: false,
    // elements: {
    //   point: {
    //     radius: 5,
    //     hoverRadius: 4,
    //   },
    // }
  }


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

  const tableData = transactionsResp ? transactionsResp.rows.map((transaction: any) => ({
    id: shortenTx(transaction.id),
    key: shortenTx(transaction.id),
    name: transaction.from.name,
    donee: transaction.to.name,
    date: moment(new Date(parseInt(transaction.donated_at_timestamp) * 1000)).format("MM/DD/YY hh:ss"),
    amount: transaction.amount,
    status: ["loser"],
  })) : [];

  const pieData: ChartData<"pie", any, unknown> = {
    labels: ["Philantrophist", "Donee"],
    datasets: [
      {
        data: userStatsResp ? [userStatsResp.totalNum - userStatsResp.doneeNum, userStatsResp.doneeNum] : [50, 50],
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
              <p className="chart-group__header__title">Charity</p>
              <div className="chart-group__header__icons">
                <ZoomInOutlined
                  style={{ fontSize: "17px", color: "black" }}
                  className="chart-group__header__icons__zoom"
                />
                <DownloadOutlined
                  style={{ fontSize: "15px", color: "black" }}
                  onClick={() => exportDataToCsv(dailyDonationResp ? dailyDonationResp.donationDayDatas : [], 'daily-donation')}
                />
              </div>
            </div>
            <Line ref={ref => setChartRef(ref)} data={data} plugins={plugins as any} options={options} className="chart-group__chart" />
            <div className="chart-group__data-group">
              <h3 className="chart-group__data-group__title">Total charity</h3>
              <h1 className="chart-group__data-group__data">
                {donationResp ? new BigNumber(donationResp.donations[0].totalVolume).div(1e18).toFixed(2) : 0} CRV
                <span className={`chart-group__data-group__data__rate chart-group__data-group__data__rate--${charityStatus.status === CharityStatus.UP ? 'up' : 'down'}`}>
                  <Image preview={false} src={charityStatus.status === CharityStatus.UP ? '/icon/growth.svg' : '/icon/down.svg'} />
                  <span>{charityStatus.percentage}%</span>
                </span>
              </h1>
            </div>
          </div>
        </Col>
        <Col span={12} className="gutter-row">
          <div className="chart-group">
            <div className="chart-group__header">
              <h1 className="chart-group__header__title">User Action</h1>
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
            <Line data={data} options={options} className="chart-group__chart" />
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
              pagination={{
                defaultPageSize: transactionsResp ? transactionsResp.limit : 10,
                pageSize: transactionsResp ? transactionsResp.limit : 10,
                total: transactionsResp ? transactionsResp.count : 0,
                current: currentPage
              }}
              onChange={((props: any) => setCurrentPage(props.current))}
              loading={loading}
            />
          </div>
        </Col>
        <Col span={6} className="gutter-row">
          <div className="chart-group">
            <div className="chart-group__header">
              <h1 className="chart-group__header__title">User</h1>
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
            <Pie data={pieData} className="chart-group__chart" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DashSystem;

import React, { useState } from "react";
import { Avatar, Button, Typography, Image } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import BigNumber from "bignumber.js";
import moment from "moment";
import { LeftOutlined } from "@ant-design/icons";
import useFetch from "../../hooks/useFetch";
import AppLoading from "../../components/AppLoading";
import AppPagination from "../../components/AppPagination";
import "./index.scss";

const convertToLocaleString = (time: string) => {
  const t3 = time.replace("seconds", "giây");
  const t4 = t3.replace("minutes", "phút");
  const t5 = t4.replace("minute", "phút");
  const t6 = t5.replace("hours", "giờ");
  const t7 = t6.replace("hour", "giờ");
  const t8 = t7.replace("days", "ngày");
  const t9 = t8.replace("day", "ngày");
  const t10 = t9.replace("months", "tháng");
  const t11 = t10.replace("month", "tháng");
  const t12 = t11.replace("years", "năm");
  const t13 = t12.replace("year", "năm");
  const t14 = t13.replace("a few", "Một vài");
  const t15 = t14.replace("an", "Một");
  const t16 = t15.replace("a", "Một");
  return t16;
};

const getTimeDiff = (time: any) => {
  const timestamp = moment(time).fromNow(true);
  const convertedTime = convertToLocaleString(timestamp);
  return convertedTime;
};

const Donations: React.FC = () => {
  const { Title } = Typography;
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading } = useFetch<any>(
    `users/me/philanthropists?id=${id}&page=${currentPage}&limit=15`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [id],
    { method: "GET" }
  );

  return (
    <div className="donations">
      <Title level={3} className="donations__title">
        Tất cả người ủng hộ
      </Title>
      <div className="donations__content">
        <Button className="donations__back" onClick={() => navigate(-1)}>
          <LeftOutlined className="donations__back-icon" />
          <span>Trở lại</span>
        </Button>
        <ul className="people-donated__list">
          {data?.rows?.map((TOP_DONATED: any, key: number) => (
            <React.Fragment key={key}>
              {/* <div className="people-donated__divider"></div> */}
              <li className="people-donated__list-item">
                <Avatar
                  src={(function () {
                    const userAvatar = TOP_DONATED.from.UserMedia.filter(
                      (userMedia: any) =>
                        userMedia.type === "1" && userMedia.active === 1
                    )
                      .slice(0, 1)
                      .pop();
                    return userAvatar ? userAvatar.link : null;
                  })()}
                  className="people-donated__avatar"
                />
                <div className="people-donated__details">
                  <p
                    className="people-donated__name"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/profile/${TOP_DONATED.from.id}`)}
                  >
                    {TOP_DONATED.from.name}
                  </p>
                  <p className="people-donated__last-donated">
                    {getTimeDiff(TOP_DONATED.from.transactionsFrom[0].date)}
                  </p>
                </div>
                <div className="people-donated__amount">
                  <span>
                    {new BigNumber(TOP_DONATED.amount).div(1e18).toFixed(3)}
                  </span>
                  <Image src="/icon/ethereum_1.svg" preview={false} />
                </div>
              </li>
            </React.Fragment>
          ))}
        </ul>
        <div className="donations__pagination">
          <AppPagination
            defaultPageSize={data ? data.limit : 10}
            pageSize={data ? data.limit : 10}
            totalPage={data ? data.count : 0}
            current={currentPage}
            onChange={(page: number) => setCurrentPage(page)}
          />
        </div>
        {loading && (
          <AppLoading showContent={false} loadingContent={<div></div>} />
        )}
      </div>
    </div>
  );
};

export default Donations;

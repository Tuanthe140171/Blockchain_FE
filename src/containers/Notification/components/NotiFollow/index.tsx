import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import moment from "moment";
import React, { useState } from "react";
import AppPagination from "../../../../components/AppPagination";
import useFetch from "../../../../hooks/useFetch";
import "./index.scss";

const NotificationFollow = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useFetch<any>(
    `notification/get-notification?type=2&limit=10&offset=0&page=${currentPage}`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [],
    {},
  );

  return (
    <div className="notification-follow">
      <p className="notification-follow__header">Bỏ phiếu</p>
      <div className="notification-follow__body">
        {data?.rows.map((voting: any) => {
          return (
            <div className="notification-follow-confirm" key={voting.avatar}>
              <div className="notification-follow-confirm__top">
                <div className="notification-follow-confirm__top__ava">
                  <Avatar
                    size={40}
                    icon={<UserOutlined />}
                    src={voting.avatar}
                  />
                </div>
                <div className="notification-follow-confirm__top__message">
                  <strong>{voting.name}</strong> {voting.content}
                  <div>{moment(voting.createDate).format("DD-MM-YYYY")}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="notification-follow-wrapper">
        <AppPagination
          defaultPageSize={data ? data.limit : 10}
          pageSize={data ? data.limit : 10}
          totalPage={data ? data.count : 0}
          current={currentPage}
          onChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default NotificationFollow;

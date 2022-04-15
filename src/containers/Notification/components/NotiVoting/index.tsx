import React, { useState } from "react";
import moment from "moment";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useFetch from "../../../../hooks/useFetch";
import "./index.scss";
import AppPagination from "../../../../components/AppPagination";

const NotificationVoting = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useFetch<any>(
    `notification/get-notification?type=1&limit=10&offset=0?page=${currentPage}`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [],
    {},
  );

  return (
    <div className="notification-voting">
      <p className="notification-voting__header">Bỏ phiếu</p>
      <div className="notification-voting__body">
        {data ? data.rows.map((voting: any) => {
          return (
            <div className={"notification-voting-confirm"} key={voting.avatar}>
              <div className="notification-voting-confirm__top">
                <div className="notification-voting-confirm__top__ava">
                  <Avatar
                    size={40}
                    icon={<UserOutlined />}
                    src={voting.avatar}
                  />
                </div>
                <div className="notification-voting-confirm__top__message">
                  <strong>{voting.name}</strong> {voting.content}
                  <div>{moment(voting.createDate).format("DD-MM-YYYY")}</div>
                </div>
              </div>
            </div>
          );
        }): []}
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

export default NotificationVoting;
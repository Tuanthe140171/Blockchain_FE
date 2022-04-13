import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import moment from "moment";
import React, { useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import "./index.scss";

const NotificationFollow = () => {
  const [data, setData] = useState([]);

  const { data: followData } = useFetch<any>(
    "notification/get-notification?type=2&limit=10&offset=0",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [],
    {},
    (e) => {
      setData(e.data.followNoti);
    }
  );

  return (
    <div className="notification-follow">
      <p className="notification-follow__header">Bỏ phiếu</p>
      <div className="notification-follow__body">
        {data?.map((voting: any) => {
          return (
            <div className={"notification-follow-confirm"} key={voting.avatar}>
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
    </div>
  );
};

export default NotificationFollow;

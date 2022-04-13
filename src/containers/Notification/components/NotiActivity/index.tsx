import React, { useState } from "react";
import moment from "moment";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useFetch from "../../../../hooks/useFetch";
import "./index.scss";

const NotificationActivity = () => {
  const [data, setData] = useState([]);

  const { data: activityData } = useFetch<any>(
    "notification/get-notification?type=3&limit=10&offset=0",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [],
    {},
    (e) => {
      setData(e.data.postNoti);
    }
  );

  return (
    <div className="notification-activity">
      <p className="notification-activity__header">Hoạt động</p>
      <div className="notification-activity__body">
        {data?.map((activity: any) => {
          return (
            <div className={"notification-activity-confirm"} key={activity.avatar}>
              <div className="notification-activity-confirm__top">
                <div className="notification-activity-confirm__top__ava">
                  <Avatar
                    size={40}
                    icon={<UserOutlined />}
                    src={activity.avatar}
                  />
                </div>
                <div className="notification-activity-confirm__top__message">
                  <strong>{activity.name}</strong> {activity.content}
                  <div>{moment(activity.createDate).format("DD-MM-YYYY")}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationActivity;

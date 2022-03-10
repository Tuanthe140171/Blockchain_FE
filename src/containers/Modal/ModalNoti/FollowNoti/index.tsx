import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import "./index.scss";

type IFollowNotiProps = {
  data: any;
};

const FollowNoti: React.FC<IFollowNotiProps> = (props) => {
  const { data } = props;
  console.log(data);

  return (
    <div
      className={`follow-noti ${
        data.isRead ? "follow-read" : "follow-not-read"
      }`}
    >
      {!data.isRead ? <div className="follow-noti__dotted"></div> : null}
      <div className="follow-noti__top">
        <div className="follow-noti__top__ava">
          <Avatar size={40} icon={<UserOutlined />} />
        </div>
        <div className="follow-noti__top__message">{data.message}</div>
      </div>
      <div className="follow-noti__bottom">
        <div>{data.time}</div>
      </div>
    </div>
  );
};

export default FollowNoti;

import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import "./index.scss";

type VotingNotiProps = {
  data: any;
};

const ActivityNoti: React.FC<VotingNotiProps> = (props) => {
  const { data } = props;
  console.log(data);

  return (
    <div
      className={`activity-noti ${
        data.isRead ? "voting-read" : "voting-not-read"
      }`}
    >
      {!data.isRead ? <div className="activity-noti__dotted"></div> : null}
      <div className="activity-noti__top">
        <div className="activity-noti__top__ava">
          <Avatar size={40} icon={<UserOutlined />} />
        </div>
        <div className="activity-noti__top__message">{data.message}</div>
      </div>
      <div className="activity-noti__description">"{data.description}"</div>
      <div className="activity-noti__bottom">
        <div>{data.time}</div>
      </div>
    </div>
  );
};

export default ActivityNoti;
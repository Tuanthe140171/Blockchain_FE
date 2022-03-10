import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import "./index.scss";

type VotingNotiProps = {
  data: any;
};

const VotingNoti: React.FC<VotingNotiProps> = (props) => {
  const { data } = props;

  return (
    <div
      className="voting-noti"
      style={{ backgroundColor: data.isRead ? "#ffffff" : "Cyan 100" }}
    >
      <div className="voting-noti__ava">
        <Avatar size={40} icon={<UserOutlined />} />
      </div>
      <div className="voting-noti__message">{data.message}</div>
    </div>
  );
};

export default VotingNoti;

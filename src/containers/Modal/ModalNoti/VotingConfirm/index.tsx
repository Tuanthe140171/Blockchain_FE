import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import "./index.scss";

type VotingNotiProps = {
  data: any;
};

const VotingConfirm: React.FC<VotingNotiProps> = (props) => {
  const { data } = props;

  return (
    <div
      className={`voting-confirm ${
        data.isRead ? "voting-read" : "voting-not-read"
      }`}
    >
      {!data.isRead ? <div className="voting-confirm__dotted"></div> : null}
      <div className="voting-confirm__top">
        <div className="voting-confirm__top__ava">
          <Avatar size={40} icon={<UserOutlined />} />
        </div>
        <div className="voting-confirm__top__message">{data.message}</div>
      </div>
      <div className="voting-confirm__bottom">
        <div>{data.time}</div>
      </div>
    </div>
  );
};

export default VotingConfirm;

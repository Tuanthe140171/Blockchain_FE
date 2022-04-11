import React from "react";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.scss";

type IFollowNotiProps = {
  data: any;
};

const FollowNoti: React.FC<IFollowNotiProps> = (props) => {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <div
      className={`follow-noti ${
        data.isRead ? "follow-read" : "follow-not-read"
      }`}
      onClick={() => {
        navigate(data.id);
      }}
    >
      {!data.isRead ? <div className="follow-noti__dotted"></div> : null}
      <div className="follow-noti__top">
        <div className="follow-noti__top__ava">
          <Avatar size={40} icon={<UserOutlined />} />
        </div>
        <div className="follow-noti__top__message">{data.content}</div>
      </div>
      <div className="follow-noti__bottom">
        <div>{moment(data.time).format("DD-MM-YYYY")}</div>
      </div>
    </div>
  );
};

export default FollowNoti;

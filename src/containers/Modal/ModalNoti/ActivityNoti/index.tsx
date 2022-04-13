import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import moment from "moment";
import React from "react";
import "./index.scss";

type VotingNotiProps = {
  data: any;
};

const ActivityNoti: React.FC<VotingNotiProps> = (props) => {
  const { data } = props;

  return (
    <div className={"activity-noti voting-read"}>
      {/* {!data.isRead ? <div className="activity-noti__dotted"></div> : null} */}
      <div className="activity-noti__top">
        <div className="activity-noti__top__ava">
          <Avatar size={40} icon={<UserOutlined />} src={data.avatar} />
        </div>
        <div className="activity-noti__top__message">
          <strong>{data.name}</strong> {data.content}
        </div>
      </div>
      <div className="activity-noti__description">{data.description}</div>
      <div className="activity-noti__bottom">
        <div>{moment(data.createDate).format("DD-MM-YYYY")}</div>
      </div>
    </div>
  );
};

export default ActivityNoti;

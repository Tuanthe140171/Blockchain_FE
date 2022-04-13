import { UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
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
          <Tooltip title={<strong>{data.name} {data.content}</strong>}>
            <div>
              <strong>{data.name}</strong>&nbsp;
              <span>{data.content}</span>
            </div>
          </Tooltip>
          <span>{moment(data.createDate).format("DD-MM-YYYY")}</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityNoti;

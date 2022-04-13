import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import moment from "moment";
import React from "react";
import "./index.scss";

type IActivityNotiProps = {
  data: any;
};

const ActivityNoti: React.FC<IActivityNotiProps> = (props) => {
  const { data } = props;
  console.log(data);

  return (
    <div className={"activity-noti voting-read"}>
      <div className="activity-noti__top">
        <div className="activity-noti__top__ava">
          <Avatar size={40} icon={<UserOutlined />} src={data.avatar} />
        </div>
        <div className="activity-noti__top__message">
          <strong>{data.name}</strong> {data.content}
          <div>{moment(data.createDate).format("DD-MM-YYYY")}</div>
        </div>
      </div>
      <div className="activity-noti__description">
        {data.external.description}
      </div>
    </div>
  );
};

export default ActivityNoti;

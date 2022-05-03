import { UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

type IActivityNotiProps = {
  data: any;
};

const ActivityNoti: React.FC<IActivityNotiProps> = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  console.log(data);

  return (
    <div
      className={"activity-noti voting-read"}
      onClick={() => {
        navigate(`/profile/${data?.external?.userId}`);
      }}
    >
      <div className="activity-noti__top">
        <div className="activity-noti__top__ava">
          <Avatar size={40} icon={<UserOutlined />} src={data.avatar} />
        </div>
        <div className="activity-noti__top__message">
          <Tooltip
            title={
              <strong>
                {data.name} {data.content}
              </strong>
            }
          >
            <div>
              <strong>{data.name}</strong>&nbsp;
              <span>{data.content}</span>
            </div>
          </Tooltip>
          <span>{moment(data.createDate).format("DD-MM-YYYY hh:mm")}</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityNoti;

import React from "react";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
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
      className={`follow-noti follow-read`}
      onClick={() => {
        navigate(`/profile/${data.external.userId}`);
      }}
    >
      {/* {!data.isRead ? <div className="follow-noti__dotted"></div> : null} */}
      <div className="follow-noti__top">
        <div className="follow-noti__top__ava">
          <Avatar size={40} icon={<UserOutlined />} src={data.avatar} />
        </div>
        <div className="follow-noti__top__message">
          <Tooltip title={<strong>{data.name} {data.content}</strong>}>
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

export default FollowNoti;

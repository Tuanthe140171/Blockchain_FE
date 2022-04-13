import { UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import moment from "moment";
import React from "react";
import "./index.scss";

type IVotingNotiProps = {
  data: any;
};

const VotingConfirm: React.FC<IVotingNotiProps> = (props) => {
  const { data } = props;

  return (
    <div className={"voting-confirm  voting-read"}>
      {/* {!data.isRead ? <div className="voting-confirm__dotted"></div> : null} */}
      <div className="voting-confirm__top">
        <div className="voting-confirm__top__ava">
          <Avatar size={40} icon={<UserOutlined />} src={data.avatar} />
        </div>
        <div className="voting-confirm__top__message">
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

export default VotingConfirm;

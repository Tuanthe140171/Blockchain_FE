import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
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
          <strong>{data.name}</strong> {data.content}
          <div>{moment(data.createDate).format("DD-MM-YYYY")}</div>
        </div>
      </div>
    </div>
  );
};

export default VotingConfirm;

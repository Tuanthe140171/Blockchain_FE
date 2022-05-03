import { UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

type IVotingNotiProps = {
  data: any;
};

const VotingConfirm: React.FC<IVotingNotiProps> = (props) => {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <div
      className={"voting-confirm  voting-read"}
      onClick={() => navigate("/voting")}
    >
      {/* {!data.isRead ? <div className="voting-confirm__dotted"></div> : null} */}
      <div className="voting-confirm__top">
        <div className="voting-confirm__top__ava">
          <Avatar size={40} icon={<UserOutlined />} src={data.avatar} />
        </div>
        <div className="voting-confirm__top__message">
          <Tooltip
            title={
              <strong>
                {data.name} {data.content}
              </strong>
            }
            zIndex={99999999999}
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

export default VotingConfirm;

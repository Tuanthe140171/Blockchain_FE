import { CheckCircleOutlined } from "@ant-design/icons";
import { Badge, Button } from "antd";
import React from "react";
import ActivityNoti from "./ActivityNoti";
import FollowNoti from "./FollowNoti";
import "./index.scss";
import VotingConfirm from "./VotingConfirm";
import VotingNoti from "./VotingNoti";

const ModalNoti: React.FC<{
  notifications: {
    type: number,
    content: string,
    createDate: string
  }[]
} | undefined> = (props) => {
  const { notifications } = props;

  const renderVoting = () => {
    return notifications.map((data) => {
      return data.type === 1 ? (
        <VotingNoti data={data} />
      ) : (
        <VotingConfirm data={data} />
      );
    });
  };

  const renderFollower = () => {
    return notifications.map((data) => {
      return data.type === 2 && <FollowNoti data={data} />;
    });
  };

  const renderActivity = () => {
    return notifications.map((data) => {
      return data.type === 3 && <ActivityNoti data={data} />;
    });
  };

  return (
    <div className="modal-noti">
      <div className="modal-noti__header">
        <div className="modal-noti__header__title">Notifications</div>
        <Button type="ghost" style={{ fontSize: "15px", color: "#B3CDFB" }}>
          Mark all as read <CheckCircleOutlined />
        </Button>
      </div>
      <div className="modal-noti__wrapper">
        <div className="modal-noti__wrapper__header">
          <div className="modal-noti__wrapper__header__title">Voting</div>
          <Button type="ghost">See all</Button>
        </div>
        {renderVoting()}
      </div>
      <div className="modal-noti__wrapper">
        <div className="modal-noti__wrapper__header">
          <div className="modal-noti__wrapper__header__title">Followers</div>
          <Button type="ghost">See all</Button>
        </div>
        {renderFollower()}
      </div>
      <div className="modal-noti__wrapper">
        <div className="modal-noti__wrapper__header">
          <div className="modal-noti__wrapper__header__title">Activities</div>
          <Button type="ghost">See all</Button>
        </div>
        {renderActivity()}
      </div>
    </div>
  );
};

export default ModalNoti;

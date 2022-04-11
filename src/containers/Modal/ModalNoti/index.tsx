import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import ActivityNoti from "./ActivityNoti";
import FollowNoti from "./FollowNoti";
import "./index.scss";
import VotingConfirm from "./VotingConfirm";

const ModalNoti: React.FC<
  | {
      notifications: {
        type: number;
        content: string;
        createDate: string;
      }[];
    }
  | undefined
> = (props) => {
  const { notifications } = props;
  console.log(notifications);
  // const votingData = [
  //   {
  //     id: 1,
  //     type: 1,
  //     message:
  //       "Hệ thống đang có 13 người cần được từ thiện chờ bạn xác minh thông tin của họ.",
  //     time: "",
  //     isRead: true,
  //   },
  //   {
  //     id: 2,
  //     type: 2,
  //     message: "Nguyễn Lâm Thảo cần xác minh cho Trẻ em mồ côi và Người nghèo",
  //     time: "Today at 9:42 AM",
  //     isRead: true,
  //   },
  //   {
  //     id: 1,
  //     type: 2,
  //     message:
  //       "Hoàng Minh Tuấn Anh cần xác minh cho Trẻ em mồ côi và Người nghèo",
  //     time: "Yesterday at 11:42 PM",
  //     isRead: false,
  //   },
  // ];

  // const followerData = [
  //   {
  //     id: 1,
  //     message: "Hoàng Minh Tuấn Anh đã theo dõi bạn",
  //     time: "Last Wednesday at 11:15 AM",
  //     isRead: true,
  //   },
  // ];

  // const activityData = [
  //   {
  //     id: 1,
  //     message: "Dennis Nedry đã đăng tải dòng trạng thái trên tường. ",
  //     description: `“Oh, I finished de-bugging the phones, but the system's compiling for eighteen minutes, or twenty.  `,
  //     time: "Yesterday at 5:42 PM",
  //     isRead: false,
  //   },
  // ];

  const renderVoting = () => {
    return notifications.map((data) => {
      // return data.type === 1 ? (
      //   <VotingNoti data={data} />
      // ) : (
      //   <VotingConfirm data={data} />
      // );
      return data.type === 1 && <VotingConfirm data={data} />;
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

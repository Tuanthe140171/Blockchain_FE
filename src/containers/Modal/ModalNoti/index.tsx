import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
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
  const defaultNotification = useSelector(
    (state: any) => state.userLayout.defaultNotification
  );
  const [propsData, setPropsData] = useState<any>(null);
  const navigate = useNavigate();
  console.log(notifications);

  useEffect(() => {
    const arrFollow = defaultNotification.followNoti.map((noti: any) => ({
      content: noti.content,
      name: noti.name,
      avatar: noti.avatar,
      external: {
        userId: JSON.parse(noti.external)?.userId,
      },
      type: noti.type,
      createDate: noti.createDate,
    }));
    const arrActivity = defaultNotification.postNoti.map((noti: any) => ({
      content: noti.content,
      name: noti.name,
      avatar: noti.avatar,
      external: {
        userId: JSON.parse(noti.external)?.postId,
        description: JSON.parse(noti.external)?.description,
      },
      type: noti.type,
      createDate: noti.createDate,
    }));
    const arrVoting = defaultNotification.registerNoti.map((noti: any) => ({
      content: noti.content,
      name: noti.name,
      avatar: noti.avatar,
      external: {
        userId: JSON.parse(noti.external)?.userId,
      },
      type: noti.type,
      createDate: noti.createDate,
    }));
    const combineArray = arrActivity.concat(arrFollow, arrVoting);
    setPropsData(combineArray.concat(notifications));
    console.log(combineArray);
  }, [notifications]);

  const renderVoting = () => {
    return propsData?.map((data: any) => {
      return (
        data.type === 1 && (
          <VotingConfirm data={data} key={data.avatar + data.createDate} />
        )
      );
    });
  };

  const renderFollower = () => {
    return propsData?.map((data: any) => {
      return (
        data.type === 2 && (
          <FollowNoti data={data} key={data.avatar + data.createDate} />
        )
      );
    });
  };

  const renderActivity = () => {
    return propsData?.map((data: any) => {
      return (
        data.type === 3 && (
          <ActivityNoti data={data} key={data.avatar + data.createDate} />
        )
      );
    });
  };

  return (
    <div className="modal-noti">
      <div className="modal-noti__header">
        <div className="modal-noti__header__title">Thông báo</div>
      </div>
      <div className="modal-noti__wrapper">
        <div className="modal-noti__wrapper__header">
          <div className="modal-noti__wrapper__header__title">Bỏ phiếu</div>
          <Button type="ghost" onClick={() => navigate("/notification/1")}>
            Xem tất cả
          </Button>
        </div>
        {renderVoting()}
      </div>
      <div className="modal-noti__wrapper">
        <div className="modal-noti__wrapper__header">
          <div className="modal-noti__wrapper__header__title">
            Người theo dõi
          </div>
          <Button type="ghost" onClick={() => navigate("/notification/2")}>
            Xem tất cả
          </Button>
        </div>
        {renderFollower()}
      </div>
      <div className="modal-noti__wrapper">
        <div className="modal-noti__wrapper__header">
          <div className="modal-noti__wrapper__header__title">Hoạt động</div>
          <Button type="ghost" onClick={() => navigate("/notification/3")}>
            Xem tất cả
          </Button>
        </div>
        {renderActivity()}
      </div>
    </div>
  );
};

export default ModalNoti;

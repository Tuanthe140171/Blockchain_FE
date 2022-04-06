import { Avatar, Image } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AppDialog from "../../../../../../components/AppDialog";
import useFetch from "../../../../../../hooks/useFetch";

import "./index.scss";

type YourFollowerCardProps = {
  id: string;
  name: string;
  status: string;
  avatar: string;
};

const YourFollowerCard: React.FC<YourFollowerCardProps> = (props) => {
  const { userFollowingData } = useSelector((state: any) => state.userPostData);
  const [isFollowing, setIsFollowing] = useState<boolean>(
    userFollowingData.includes(props.id)
  );
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [unfollow, setUnfollow] = useState<any>(undefined);
  const [follow, setFollow] = useState<any>(undefined);

  const { data: unfollowData } = useFetch<any>(
    "users/follow-people",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [unfollow],
    {
      method: "POST",
      body: JSON.stringify({
        id: props.id,
        enable: false,
      }),
    },
    (e) => {
      setUnfollow(undefined);
      setOpenConfirmDialog(false);
      setOpenDialog(true);
    }
  );

  const { data: followData } = useFetch<any>(
    "users/follow-people",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [follow],
    {
      method: "POST",
      body: JSON.stringify({
        id: props.id,
        enable: true,
      }),
    },
    (e) => {
      setFollow(undefined);
      setIsFollowing(true);
    }
  );

  return (
    <>
      {openConfirmDialog ? (
        <AppDialog
          type="confirm"
          title={`Bạn chắc chắn muốn hủy theo dõi người này không?`}
          confirmText={"Hủy theo dõi"}
          cancelText={"Đóng"}
          onConfirm={() => {
            setUnfollow(true);
          }}
          onClose={() => {
            setOpenConfirmDialog(false);
          }}
        />
      ) : null}
      {openDialog ? (
        <AppDialog
          type="infor"
          title={`Hủy theo dõi thành công`}
          confirmText={"Đóng"}
          onConfirm={() => {
            setIsFollowing(false);
            setOpenDialog(false);
          }}
        />
      ) : null}
      <div className="your-follower-card" key={props.name}>
        <div className="your-follower-card__details">
          <Avatar src={props.avatar} className="your-follower-card__avatar" />
          <div className="your-follower-card__info">
            <p>{props.name}</p>
            <span>{props.status}</span>
          </div>
        </div>
        <div
          className={`your-follower-card__following ${
            isFollowing
              ? "your-follower-card__following--active"
              : "your-follower-card__following--inactive"
          }`}
          onClick={() => {
            if (isFollowing) {
              setOpenConfirmDialog(true);
            } else {
              setFollow(true);
            }
          }}
        >
          <Image
            src={isFollowing ? "/icon/tick.svg" : "/icon/plus.svg"}
            preview={false}
            className="your-follower-card__following-icon"
          />
          <span className="your-follower-card__following-txt">
            {isFollowing ? "Following" : "Follow"}
          </span>
        </div>
      </div>
      <div className="your-follower-card__divider"></div>
    </>
  );
};

export default YourFollowerCard;

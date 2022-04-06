import { Avatar, Image } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppDialog from "../../../../../../components/AppDialog";
import useFetch from "../../../../../../hooks/useFetch";
import "./index.scss";

type YourFollowingCardProps = {
  id: string;
  name: string;
  status: string;
  avatar: string;
};

const YourFollowingCard: React.FC<YourFollowingCardProps> = (props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(true);
  const [unfollow, setUnfollow] = useState<any>(undefined);
  const [follow, setFollow] = useState<any>(undefined);
  const navigate = useNavigate();

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
      <div className="your-following-card">
        <Avatar src={props.avatar} className="your-following-card__avatar" />
        <p
          className="your-following-card__name"
          onClick={() => navigate(`/profile/${props.id}`)}
          style={{ cursor: "pointer" }}
        >
          {props.name}
        </p>
        <span className="your-following-card__status">{props.status}</span>
        <div
          className="your-following-card__check"
          onClick={() => {
            if (isFollowing) {
              setOpenConfirmDialog(true);
            } else {
              setFollow(true);
            }
          }}
        >
          <Image src={isFollowing ? "/icon/tick.svg" : "/icon/plus.svg"} />
          <span>{isFollowing ? "Following" : "Follow"}</span>
        </div>
      </div>
    </>
  );
};

export default YourFollowingCard;

import { Avatar, Image } from "antd";
import React from "react";
import "./index.scss";

type YourFollowingCardProps = {
  name: string;
  status: string;
  avatar: string;
};

const YourFollowingCard: React.FC<YourFollowingCardProps> = (props) => {
  return (
    <div className="your-following-card">
      <Avatar src={props.avatar} className="your-following-card__avatar" />
      <p className="your-following-card__name">{props.name}</p>
      <span className="your-following-card__status">{props.status}</span>
      <div className="your-following-card__check">
        <Image src="/icon/tick.svg" />
        <span>Following</span>
      </div>
    </div>
  );
};

export default YourFollowingCard;

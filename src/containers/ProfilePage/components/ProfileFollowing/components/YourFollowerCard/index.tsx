import { Avatar, Image } from "antd";
import React from "react";

import "./index.scss";

type YourFollowerCardProps = {
    name: string,
    status: string,
    avatar: string,
    following: boolean
}

const YourFollowerCard: React.FC<YourFollowerCardProps> = (props) => {
    return (
        <>
            <div className="your-follower-card">
                <div className="your-follower-card__details">
                    <Avatar src={props.avatar} className="your-follower-card__avatar" />
                    <div className="your-follower-card__info">
                        <p>{props.name}</p>
                        <span>{props.status}</span>
                    </div>
                </div>
                <div className={`your-follower-card__following ${props.following ? "your-follower-card__following--active": "your-follower-card__following--inactive"}`}>
                    <Image src={props.following ? "/icon/tick.svg": "/icon/plus.svg"} preview={false} className="your-follower-card__following-icon"/>
                    <span className="your-follower-card__following-txt">{props.following ? "Following": "Follow"}</span>
                </div>
            </div>
            <div className="your-follower-card__divider"></div>
        </>
    )
}

export default YourFollowerCard;
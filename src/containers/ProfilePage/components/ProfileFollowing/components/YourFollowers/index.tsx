import React from "react";

import YourFollowerCard from "../YourFollowerCard";
import "./index.scss";

const followings = [
  {
    name: "Bùi Văn Quyết",
    status: "Người khuyết tật",
    avatar: "/icon/bad-lucker-7.svg",
    following: true,
  },
  {
    name: "Bùi Văn Quyết",
    status: "Người khuyết tật",
    avatar: "/icon/bad-lucker-7.svg",
    following: false,
  },
  {
    name: "Bùi Văn Quyết",
    status: "Người khuyết tật",
    avatar: "/icon/bad-lucker-7.svg",
    following: true,
  },
  {
    name: "Bùi Văn Quyết",
    status: "Người khuyết tật",
    avatar: "/icon/bad-lucker-7.svg",
    following: false,
  },
];

const YourFollowers: React.FC = () => {
  return (
    <div className="your-followers">
      <header className="your-followers__header">
        <p className="your-followers__header-title">Your followers</p>
        <span className="your-followers__header-see">See all</span>
      </header>
      <div className="your-followers__cards">
        {followings.map((following, index) => (
          <React.Fragment key={following.name + index}>
            <YourFollowerCard
              name={following.name}
              status={following.status}
              avatar={following.avatar}
              following={following.following}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default YourFollowers;

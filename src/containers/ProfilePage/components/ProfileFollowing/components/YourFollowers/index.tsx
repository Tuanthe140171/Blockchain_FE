import React from "react";
import { useSelector } from "react-redux";
import useFetch from "../../../../../../hooks/useFetch";

import YourFollowerCard from "../YourFollowerCard";
import "./index.scss";

const YourFollowers: React.FC = () => {
  const { data: followerData } = useFetch<any>(
    "users/get-people-followed-by-user",
    {},
    false,
    [],
    { method: "GET" },
    (e) => {}
  );

  const getUserName = (nameData: any, lastNameData: any) => {
    let name = nameData;
    let lastName = lastNameData;
    if (!lastNameData && !nameData) {
      return "Người dùng";
    }
    if (!lastNameData) {
      lastName = "";
    }
    if (!nameData) {
      name = "";
    }
    return `${lastName} ${name}`;
  };

  return (
    <div className="your-followers">
      <header className="your-followers__header">
        <p className="your-followers__header-title">Your followers</p>
        <span className="your-followers__header-see">See all</span>
      </header>
      <div className="your-followers__cards">
        {followerData?.rows.map((follower: any, index: number) => (
          <React.Fragment key={follower.userIdFrom + index}>
            <YourFollowerCard
              id={follower.userIdFrom} 
              name={getUserName(follower.User.name, follower.User.lastName)}
              status={follower.status}
              avatar={
                follower.User.UserMedia.find(
                  (media: any) => media.active === 1 && media.type === "1"
                )?.link
              }
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default YourFollowers;

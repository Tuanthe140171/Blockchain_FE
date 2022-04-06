import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useFetch from "../../../../../../hooks/useFetch";
import { getUserFollowingData } from "../../../../../../stores/action/user-post.action";
import YourFollowingCard from "../YourFollowingCard";
import "./index.scss";

const YourFollowing: React.FC = () => {
  const dispatch = useDispatch();

  const { data: followingData } = useFetch<any>(
    "users/get-following-people",
    {},
    false,
    [],
    { method: "GET" },
    (e) => {
      const listId = e.data.rows.map((row: any) => row.userIdTo);
      const action = getUserFollowingData(listId);
      dispatch(action);
    }
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
    <div className="your-following">
      <header className="your-following__header">
        <p className="your-following__header-title">Your following</p>
        <span className="your-following__header-see">See all</span>
      </header>
      <div className="your-following__cards">
        {followingData?.rows.map((following: any, index: number) => (
          <React.Fragment key={following.userIdTo + index}>
            <YourFollowingCard
              id={following.userIdTo}
              name={getUserName(following.User.name, following.User.lastName)}
              status={following.status}
              avatar={
                following.User.UserMedia.find(
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

export default YourFollowing;

import React from "react";
import useFetch from "../../../../../../hooks/useFetch";
import YourFollowingCard from "../YourFollowingCard";
import "./index.scss";

const followings = [
  {
    name: "Bùi Văn Quyết",
    status: "Người khuyết tật",
    avatar: "/icon/bad-lucker-7.svg",
  },
  {
    name: "Bùi Văn Quyết",
    status: "Người khuyết tật",
    avatar: "/icon/bad-lucker-7.svg",
  },
  {
    name: "Bùi Văn Quyết",
    status: "Người khuyết tật",
    avatar: "/icon/bad-lucker-7.svg",
  },
  {
    name: "Bùi Văn Quyết",
    status: "Người khuyết tật",
    avatar: "/icon/bad-lucker-7.svg",
  },
];

const YourFollowing: React.FC = () => {
  const { data: followingData } = useFetch<any>(
    "users/get-peole-followed-by-user",
    {},
    false,
    [],
    { method: "GET" },
    (e) => {
      // setCallWithParam(undefined);
      // const action = getUserPostData(e.data);
      // dispatch(action);
      console.log(e);
    }
  );

  return (
    <div className="your-following">
      <header className="your-following__header">
        <p className="your-following__header-title">Your following</p>
        <span className="your-following__header-see">See all</span>
      </header>
      <div className="your-following__cards">
        {followings.map((following, index) => (
          <React.Fragment key={following.name + index}>
            <YourFollowingCard
              name={following.name}
              status={following.status}
              avatar={following.avatar}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default YourFollowing;

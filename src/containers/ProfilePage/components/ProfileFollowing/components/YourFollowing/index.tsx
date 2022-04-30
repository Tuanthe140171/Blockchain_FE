import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserFollowingData } from "../../../../../../stores/action/user-post.action";
import YourFollowingCard from "../YourFollowingCard";
import useFetch from "../../../../../../hooks/useFetch";
import "./index.scss";

const YourFollowing: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        <p className="your-following__header-title">Bạn đang theo dõi</p>
        {followingData?.rows ? (
          <span
            className="your-following__header-see"
            onClick={() => navigate("/follow/1")}
          >
            Xem thêm
          </span>
        ) : null}
      </header>
      <div className="your-following__cards">
        {followingData?.rows ? (
          followingData?.rows.map((following: any, index: number) => (
            <React.Fragment key={following.userIdTo + index}>
              <YourFollowingCard
                id={following.userIdTo}
                name={getUserName(
                  following?.following?.name,
                  following?.following?.lastName
                )}
                status={following.status}
                avatar={
                  following?.following?.UserMedia?.find(
                    (media: any) => media.active === 1 && media.type === "1"
                  )?.link
                }
              />
            </React.Fragment>
          ))
        ) : (
          <div style={{ fontSize: "17px", marginTop: 20, color: '#3156db', fontWeight: 'bold' }}>Bạn chưa theo dõi ai!</div>
        )}
      </div>
    </div>
  );
};

export default YourFollowing;

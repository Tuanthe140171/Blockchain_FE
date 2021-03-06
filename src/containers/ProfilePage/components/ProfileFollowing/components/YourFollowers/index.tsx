import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
        <p className="your-followers__header-title">Người theo dõi bạn</p>

        {followerData?.rows ? (
          <span
            className="your-followers__header-see"
            onClick={() => navigate("/follow/2")}
          >
            Xem thêm
          </span>
        ) : null}
      </header>
      <div className="your-followers__cards">
        {followerData?.rows ? (
          followerData?.rows.map((follower: any, index: number) => (
            <React.Fragment key={follower.userIdFrom + index}>
              <YourFollowerCard
                id={follower.userIdFrom}
                name={getUserName(
                  follower?.follower?.name,
                  follower?.follower?.lastName
                )}
                status={follower.status}
                avatar={
                  follower?.follower?.UserMedia?.find(
                    (media: any) => media.active === 1 && media.type === "1"
                  )?.link
                }
              />
            </React.Fragment>
          ))
        ) : (
          <div style={{ fontSize: "15px" }}>Bạn chưa có người theo dõi nào</div>
        )}
      </div>
    </div>
  );
};

export default YourFollowers;

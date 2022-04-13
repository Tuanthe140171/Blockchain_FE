import React, { useState } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import "./index.scss";

const Followers = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: followerData } = useFetch<any>(
    "users/get-people-followed-by-user",
    {},
    false,
    [],
    { method: "GET" },
    (e) => {
      setData(e.data.rows);
      console.log(e.data.rows);
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
    <div className="follow-followers">
      <p className="follow-followers__header">Được theo dõi</p>
      <div className="follow-followers__body">
        {data?.map((follower: any) => {
          return (
            <div
              className={"follow-followers-confirm"}
              key={follower?.userIdFrom}
            >
              <div className="follow-followers-confirm__top">
                <div className="follow-followers-confirm__top__ava">
                  <Avatar
                    shape="square"
                    size={120}
                    icon={<UserOutlined />}
                    src={
                      follower?.follower?.UserMedia?.find(
                        (media: any) => media.active === 1 && media.type === "1"
                      )?.link
                    }
                  />
                </div>
                <div className="follow-followers-confirm__top__message">
                  <strong
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/profile/${follower?.userIdTo}`)}
                  >
                    {getUserName(
                      follower?.follower?.name,
                      follower?.follower?.lastName
                    )}
                  </strong>
                  <div>{follower?.follower?.country}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Followers;

import React, { useState } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserFollowingData } from "../../../../stores/action/user-post.action";
import useFetch from "../../../../hooks/useFetch";
import "./index.scss";

const Followings = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: followingData } = useFetch<any>(
    "users/get-following-people",
    {},
    false,
    [],
    { method: "GET" },
    (e) => {
      setData(e.data.rows);
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
    <div className="follow-followings">
      <p className="follow-followings__header">Đang theo dõi</p>
      <div className="follow-followings__body">
        {data?.map((following: any) => {
          return (
            <div
              className={"follow-followings-confirm"}
              key={following?.userIdTo}
            >
              <div className="follow-followings-confirm__top">
                <div className="follow-followings-confirm__top__ava">
                  <Avatar
                    shape="square"
                    size={120}
                    icon={<UserOutlined />}
                    src={
                      following?.following?.UserMedia?.find(
                        (media: any) => media.active === 1 && media.type === "1"
                      )?.link
                    }
                  />
                </div>
                <div className="follow-followings-confirm__top__message">
                  <strong
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/profile/${following?.userIdTo}`)}
                  >
                    {getUserName(
                      following?.following?.name,
                      following?.following?.lastName
                    )}
                  </strong>
                  <div>{following?.following?.country}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Followings;

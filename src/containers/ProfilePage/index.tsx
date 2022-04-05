import { Image } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileIntroduction from "./components/ProfileIntroduction";
import ProfileSocial from "./components/ProfileSocial";
import ProfileDonation from "./components/ProfileDonation";
import ProfileFollowing from "./components/ProfileFollowing";
import useFetch from "../../hooks/useFetch";
import { getUserPostData } from "../../stores/action/user-post.action";
import { useDispatch } from "react-redux";
import "./index.scss";

const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const [callWithParam, setCallWithParam] = useState<any>(undefined);
  const [callWithoutParam, setCallWithoutParam] = useState<any>(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      setCallWithParam(true);
    } else {
      setCallWithoutParam(true);
    }
  }, []);

  const { data: userWithParam } = useFetch<any>(
    `users/get-user-by-id-with-params/${id}`,
    {},
    false,
    [callWithParam],
    { method: "GET" },
    (e) => {
      setCallWithParam(undefined);
      const action = getUserPostData(e.data);
      dispatch(action);
    }
  );

  const { data: userWithoutParam } = useFetch<any>(
    "users/get-user-by-id",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [callWithoutParam],
    { method: "GET" },
    (e) => {
      setCallWithoutParam(undefined);
      const action = getUserPostData(e.data);
      dispatch(action);
    }
  );

  return (
    <div className="profile">
      <div className="profile__img-bg">
        <Image src="/icon/testing.jpg" />
      </div>
      <div className="profile__content">
        <ProfileIntroduction isOwner={!id} />
        <ProfileSocial />
        {!id ? <ProfileFollowing /> : <ProfileDonation />}
      </div>
    </div>
  );
};

export default ProfilePage;

import { Image } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileIntroduction from "./components/ProfileIntroduction";
import ProfileSocial from "./components/ProfileSocial";
import ProfileDonation from "./components/ProfileDonation";
import ProfileFollowing from "./components/ProfileFollowing";

import "./index.scss";
import useFetch from "../../hooks/useFetch";

// const IS_ADMIN =

const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const [authenUser, setAuthenUser] = useState<any>(undefined);

  useEffect(() => {
    if (id) {
      setAuthenUser(false);
    }
  }, [id]);

  const { data: userPost } = useFetch<any>(
    "post/test",
    {},
    false,
    [authenUser],
    { method: "GET" },
    (e) => {
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

import { Image } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileIntroduction from "./components/ProfileIntroduction";
import ProfileSocial from "./components/ProfileSocial";
import ProfileDonation from "./components/ProfileDonation";
import ProfileFollowing from "./components/ProfileFollowing";
import useFetch from "../../hooks/useFetch";
import { getUserPostData } from "../../stores/action/user-post.action";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";

const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const { userData } = useSelector((state: any) => state.userLayout);
  const [callWithParam, setCallWithParam] = useState<any>(undefined);
  const [callWithoutParam, setCallWithoutParam] = useState<any>(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setCallWithParam(true);
    } else {
      setCallWithoutParam(true);
    }
  }, [id]);

  useEffect(() => {
    if (userData && id === userData.id) {
      navigate("/profile/");
    }
  }, [userData]);

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

  const [openTabMedia, setOpenTabMedia] = useState(false);
  const handleOpenMedia = () => {
    setOpenTabMedia(true);
  };
  const handleCloseMedia = () => {
    setOpenTabMedia(false);
  };

  return (
    <div className="profile">
      <div className="profile__img-bg">
        <Image src="/icon/testing.jpg" />
      </div>
      <div className="profile__content">
        <ProfileIntroduction isOwner={!id} openTabMedia={handleOpenMedia} />
        <ProfileSocial
          openTabMedia={openTabMedia}
          canCloseMedia={handleCloseMedia}
        />
        {!id ? <ProfileFollowing /> : <ProfileDonation donation={
          userWithParam ? {
            image: (function () {
              const userAvatar = userWithParam.UserMedia.filter(
                (userMedia: any) =>
                  userMedia.type === "1" && userMedia.active === 1
              )
                .slice(-1)
                .pop();
              return userAvatar
                ? userAvatar.link
                : "/icon/bad-lucker.svg";
            })(),
            name: userWithParam.name,
            walletAddress: userWithParam.walletAddress,
            id: userWithParam.id
          } : undefined
        } />}
      </div>
    </div>
  );
};

export default ProfilePage;

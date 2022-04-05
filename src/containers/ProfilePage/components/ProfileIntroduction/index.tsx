import { Avatar, Button, Image } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";

type ProfileIntroductionProps = {
  isOwner: boolean;
};

const ProfileIntroduction: React.FC<ProfileIntroductionProps> = (props) => {
  const { isOwner } = props;
  const { userPostData: userData } = useSelector(
    (state: any) => state.userPostData
  );
  const navigate = useNavigate();
  const avatarLink = userData?.UserMedia.find(
    (media: any) => media.type === "1" && media.active === 1
  )
    ? userData?.UserMedia.find(
        (media: any) => media.type === "1" && media.active === 1
      ).link
    : "/icon/AvatarTmp.png";

  const getUserName = () => {
    let name = userData?.name;
    let lastName = userData?.lastName;
    if (!userData?.lastName && !userData?.name) {
      return "Người dùng";
    }
    if (!userData?.lastName) {
      lastName = "";
    }
    if (!userData?.name) {
      name = "";
    }
    return `${lastName} ${name}`;
  };

  const getDate = () => {
    const today = new Date(userData?.createDate);
    const yyyy = today.getFullYear();
    const mm = today.toLocaleString("default", { month: "long" });
    return `${mm}, ${yyyy}`;
  };

  const renderSideImage = () => {
    console.log(userData?.UserMedia);

    return userData?.UserMedia.map((dt: any, index: number) => {
      <Image src={dt[index]?.link} className="intro-images__gallery-item" />;
    });
  };

  return (
    <div className="profile-intro">
      <div className="profile-intro__details">
        <Avatar src={avatarLink} className="profile-intro__avatar" />
        <p className="profile-intro__name">{getUserName()}</p>
        <span className="profile-intro__status">Người khuyết tật</span>
        <div className="profile-intro__location">
          <Image src="/icon/map.svg" className="profile-intro__location-icon" />
          <span>Hà Nội Việt Nam</span>
        </div>
        <Button
          className="follow-btn"
          onClick={() => {
            isOwner ? navigate("/profile/edit") : console.log("followed");
          }}
        >
          <Image
            src={!isOwner ? "/icon/plus.svg" : "/icon/edit.svg"}
            className="follow-btn__icon"
          />
          <span className="follow-btn__txt">
            {!isOwner ? "Follow" : "Edit your profile"}
          </span>
        </Button>
        <div className="profile-intro__metrics">
          <div className="profile-intro__tier profile-intro__metrics-block">
            <p>Tier of Charity</p>
            <span>{userData?.tierCharity}%</span>
          </div>
          <div className="profile-intro__divider"></div>
          <div className="profile-intro__trust profile-intro__metrics-block">
            <p>Trust Score</p>
            <span>{userData?.trustScore}%</span>
          </div>
        </div>
      </div>
      <div className="profile-intro__desc">
        <div className="intro-desc">
          <p className="intro-desc__title">Introduction</p>
          <p className="intro-desc__txt">Cuộc đời này đã mang tôi tới đây</p>
          <div className="intro-desc__divider"></div>
          <ul className="intro-desc__extras">
            <li className="intro-desc__extra">
              <Image
                src="/icon/map_v2.svg"
                className="intro-desc__extra-icon"
              />
              <p className="intro-desc__extra-txt">
                <span>Sống tại&nbsp;</span>
                <strong>{userData?.currentAddress}</strong>
              </p>
            </li>
            <li className="intro-desc__extra">
              <Image src="/icon/home.svg" className="intro-desc__extra-icon" />
              <p className="intro-desc__extra-txt">
                <span>Đến từ&nbsp;</span>
                <strong>{userData?.baseAddress}</strong>
              </p>
            </li>
            <li className="intro-desc__extra">
              <Image src="/icon/time.svg" className="intro-desc__extra-icon" />
              <p className="intro-desc__extra-txt">
                <span>Tham gia&nbsp;</span>
                <strong>{getDate()}</strong>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="profile-intro__images intro-images">
        <div className="intro-images__header">
          <p className="intro-images__title">Images</p>
          <Link to="/">See all images</Link>
        </div>
        <div className="intro-images__gallery">
          {userData?.UserMedia[0]?.link ? (
            <Image
              src={userData?.UserMedia[0]?.link}
              className="intro-images__gallery-item"
            />
          ) : null}
          {userData?.UserMedia[1]?.link ? (
            <Image
              src={userData?.UserMedia[1]?.link}
              className="intro-images__gallery-item"
            />
          ) : null}
          {userData?.UserMedia[2]?.link ? (
            <Image
              src={userData?.UserMedia[2]?.link}
              className="intro-images__gallery-item"
            />
          ) : null}

          {userData?.UserMedia[3]?.link ? (
            <Image
              src={userData?.UserMedia[3]?.link}
              className="intro-images__gallery-item"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfileIntroduction;

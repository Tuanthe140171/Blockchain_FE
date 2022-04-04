import { Image } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const ProfileSocialPersonal: React.FC = () => {
  const { userData } = useSelector((state: any) => state.userLayout);
  const navigate = useNavigate();

  return (
    <div className="profile-personal-wrapper">
      <div className="profile-personal">
        <header className="profile-personal__header">
          <p className="personal-header__title">Personal Information</p>
          <span
            className="personal-header__edit"
            onClick={() => navigate("/profile/edit")}
          >
            Edit
          </span>
        </header>
        <div className="profile-personal__divider" />
        <ul className="profile-personal__details">
          <li className="profile-personal__detail">
            <div className="profile-personal__detail-label">
              <Image
                src="/icon/user-admin_3.svg"
                className="profile-personal__detail-icon"
                preview={false}
              />
              <span>Họ và Tên</span>
            </div>
            <span className="profile-personal__detail-content">
              {`${userData.lastName ? userData.lastName : "Người"} ${
                userData.name ? userData.name : "dùng"
              }`}
            </span>
          </li>
          <li className="profile-personal__detail">
            <div className="profile-personal__detail-label">
              <Image
                src="/icon/calendar.svg"
                className="profile-personal__detail-icon"
                preview={false}
              />
              <span>Ngày Sinh</span>
            </div>
            <span className="profile-personal__detail-content">
              {userData.dob?.split("T")[0]}
            </span>
          </li>
          <li className="profile-personal__detail">
            <div className="profile-personal__detail-label">
              <Image
                src="/icon/location.svg"
                className="profile-personal__detail-icon"
                preview={false}
              />
              <span>Trú quán</span>
            </div>
            <span className="profile-personal__detail-content">
              {userData.currentAddress}
            </span>
          </li>
          <li className="profile-personal__detail">
            <div className="profile-personal__detail-label">
              <Image
                src="/icon/home_1.svg"
                className="profile-personal__detail-icon"
                preview={false}
              />
              <span>Nguyên quán</span>
            </div>
            <span className="profile-personal__detail-content">
              {userData.baseAddress}
            </span>
          </li>
          <li className="profile-personal__detail">
            <div className="profile-personal__detail-label">
              <Image
                src="/icon/home_1.svg"
                className="profile-personal__detail-icon"
                preview={false}
              />
              <span>Số CMND</span>
            </div>
            <span className="profile-personal__detail-content">
              {userData.identityId}
            </span>
          </li>
          <li className="profile-personal__detail">
            <div className="profile-personal__detail-label">
              <Image
                src="/icon/home_1.svg"
                className="profile-personal__detail-icon"
                preview={false}
              />
              <span>Ngày cấp CMND</span>
            </div>
            <span className="profile-personal__detail-content">
              {userData.identityDate}
            </span>
          </li>
          <li className="profile-personal__detail">
            <div className="profile-personal__detail-label">
              <Image
                src="/icon/home_1.svg"
                className="profile-personal__detail-icon"
                preview={false}
              />
              <span>Nơi cấp CMND</span>
            </div>
            <span className="profile-personal__detail-content">
              {userData.identityPlace}
            </span>
          </li>
        </ul>
        {/* <div className="profile-personal__add-info">
          <Image
            src="/icon/edit.svg"
            preview={false}
            className="profile-personal__add-info-icon"
          />
          <span>Add Personal Information</span>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileSocialPersonal;

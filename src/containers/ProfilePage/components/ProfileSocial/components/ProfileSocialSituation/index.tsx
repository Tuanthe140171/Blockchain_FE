import React from "react";
import { Image } from "antd";
import { Link } from "react-router-dom";
import './index.scss'

const ProfileSocialSituation = () => {
  return (
    <div className="profile-situation">
      <header className="profile-personal__header">
        <p className="personal-header__title">Situation</p>
        <span className="personal-header__edit">Edit</span>
      </header>
      <div className="profile-personal__divider" />
      <ul className="profile-situation__details">
        <li className="profile-situation__detail">
          <div className="profile-situation__detail-label">
            <Image
              src="/icon/identification.svg"
              className="profile-situation__detail-icon"
              preview={false}
            />
            <span>Hoàn Cảnh 1</span>
          </div>
          <div className="profile-situation__detail-content">
            <span>Người nghèo</span>
            <div className="profile-situation__detail-view-more">
              <span>Giấy chứng nhận hộ nghèo có công chứng</span>
              <Link to="/">View</Link>
            </div>
          </div>
        </li>

        <li className="profile-situation__detail">
          <div className="profile-situation__detail-label">
            <Image
              src="/icon/identification.svg"
              className="profile-situation__detail-icon"
              preview={false}
            />
            <span>Hoàn Cảnh 2</span>
          </div>
          <div className="profile-situation__detail-content">
            <span>Thương binh liệt sĩ</span>
            <div className="profile-situation__detail-view-more">
              <span>Giấy chứng nhận hộ nghèo có công chứng</span>
              <Link to="/">View</Link>
            </div>
          </div>
        </li>
      </ul>
      {/* <div className="profile-situation__add-info">
        <Image
          src="/icon/edit.svg"
          preview={false}
          className="profile-situation__add-info-icon"
        />
        <span>Add Situation</span>
      </div> */}
    </div>
  );
};

export default ProfileSocialSituation;

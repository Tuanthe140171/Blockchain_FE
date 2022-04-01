import { Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const ModalProfileHeader = () => {
  const { userData } = useSelector((state: any) => state.userLayout);
  const avatarLink = userData?.UserMedia.find(
    (media: any) => media.type === "1" && media.active === 1
  )
    ? userData?.UserMedia.find(
        (media: any) => media.type === "1" && media.active === 1
      ).link
    : "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";
  const navigate = useNavigate();

  return (
    <div className="modal-profile__header">
      <div className="modal-profile__header__avatar-group">
        <Avatar
          src={avatarLink}
          className="modal-profile__header__avatar-group__avatar"
        />
        <div className="modal-profile__header__avatar-group__name-group">
          <div className="modal-profile__header__avatar-group__name-group__name">
            {`${userData?.lastName ? userData?.lastName : "Người"} ${
              userData?.name ? userData?.name : "dùng"
            }`}
          </div>
          <div className="modal-profile__header__avatar-group__name-group__description">
            Người khuyết tật
          </div>
        </div>
      </div>
      <div
        className="modal-profile__header__profile"
        onClick={() => {
          navigate("/profile/");
        }}
      >
        View Profile
      </div>
    </div>
  );
};

export default ModalProfileHeader;

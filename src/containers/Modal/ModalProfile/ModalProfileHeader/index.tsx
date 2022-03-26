import { Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import "./index.scss";

const ModalProfileHeader = () => {
  const { userData } = useSelector((state: any) => state.userLayout);

  return (
    <div className="modal-profile__header">
      <div className="modal-profile__header__avatar-group">
        <Avatar
          src={
            userData?.UserMedia.find(
              (media: any) => media.type === "1" && media.active === 1
            ).link
          }
          className="modal-profile__header__avatar-group__avatar"
        />
        <div className="modal-profile__header__avatar-group__name-group">
          <div className="modal-profile__header__avatar-group__name-group__name">
            Nguyễn Minh Trí
          </div>
          <div className="modal-profile__header__avatar-group__name-group__description">
            Người khuyết tật
          </div>
        </div>
      </div>
      <div className="modal-profile__header__profile">View Profile</div>
    </div>
  );
};

export default ModalProfileHeader;

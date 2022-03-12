import { Avatar } from "antd";
import React from "react";
import "./index.scss";

const ModalProfileHeader = () => {
  return (
    <div className="modal-profile__header">
      <div className="modal-profile__header__avatar-group">
        <Avatar
          src="https://joeschmoe.io/api/v1/random"
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

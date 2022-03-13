import { LogoutOutlined } from "@ant-design/icons";
import React from "react";
import "./index.scss";

const ModalProfileFooter = () => {
  return (
    <div className="modal-profile__footer">
      <LogoutOutlined className="modal-profile__footer__icon" />
      <div className="modal-profile__footer__text">Log out</div>
    </div>
  );
};

export default ModalProfileFooter;

import {
  SecurityScanOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import React from "react";
import "./index.scss";

const ModalProfileBody = () => {
  return (
    <div className="modal-profile__body">
      <div className="modal-profile__body__line">
        <UserOutlined
          className="modal-profile__body__line__icon"
          width={21}
          height={21}
        />
        <div className="modal-profile__body__line__text">
          Personal Information
        </div>
      </div>
      <div className="modal-profile__body__line">
        <WalletOutlined className="modal-profile__body__line__icon" />
        <div className="modal-profile__body__line__text">Payment Method</div>
      </div>
      <div className="modal-profile__body__line">
        <SecurityScanOutlined className="modal-profile__body__line__icon" />
        <div className="modal-profile__body__line__text">Security</div>
      </div>
    </div>
  );
};

export default ModalProfileBody;

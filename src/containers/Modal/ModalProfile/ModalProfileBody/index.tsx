import {
  FileTextOutlined,
  SecurityScanOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import React from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const ModalProfileBody = () => {
  const navigate = useNavigate();

  return (
    <div className="modal-profile__body">
      <div
        className="modal-profile__body__line"
        onClick={() => {
          navigate("/profile-edit/1");
        }}
      >
        <UserOutlined
          className="modal-profile__body__line__icon"
          width={21}
          height={21}
        />
        <div className="modal-profile__body__line__text">Thông tin cá nhân</div>
      </div>
      <div
        className="modal-profile__body__line"
        onClick={() => {
          navigate("/profile-edit/2");
        }}
      >
        <WalletOutlined className="modal-profile__body__line__icon" />
        <div className="modal-profile__body__line__text">
          Phương thức thanh toán
        </div>
      </div>
      <div
        className="modal-profile__body__line"
        onClick={() => {
          navigate("/profile-edit/3");
        }}
      >
        <FileTextOutlined className="modal-profile__body__line__icon" />
        <div className="modal-profile__body__line__text">
          Hoàn cảnh
        </div>
      </div>
    </div>
  );
};

export default ModalProfileBody;

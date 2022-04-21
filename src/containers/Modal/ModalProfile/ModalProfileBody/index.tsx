import {
  FileTextOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const ModalProfileBody = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state: any) => state.userLayout);

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
      {userData?.type > 2 ? (
        <div
          className="modal-profile__body__line"
          onClick={() => {
            navigate("/profile-edit/3");
          }}
        >
          <FileTextOutlined className="modal-profile__body__line__icon" />
          <div className="modal-profile__body__line__text">Hoàn cảnh</div>
        </div>
      ) : null}
    </div>
  );
};

export default ModalProfileBody;

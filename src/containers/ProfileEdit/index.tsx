import { Breadcrumb, Button, Divider } from "antd";
import React, { useState } from "react";
import AppDialog from "../../components/AppDialog";
import ProfileModal from "./component/ProfileEditModal";
import ProfilePayment from "./component/ProfileEditPayment";
import ProfilePerson from "./component/ProfileEditPersonal";
import "./index.scss";

const Dashboard = () => {
  const [isSystem, setIsSystem] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="profile-edit">
      <div className="profile-edit__header">
        <Button
          className="profile-edit__header__confirm"
          onClick={() => setIsModalVisible(true)}
          disabled={isSubmit}
        >
          Xác nhận hộ nghèo
        </Button>
        <Breadcrumb separator=">" className="profile-edit__header__breadcrumb">
          <Breadcrumb.Item className="profile-edit__header__breadcrumb__from">
            Profile
          </Breadcrumb.Item>
          <Breadcrumb.Item className="profile-edit__header__breadcrumb__to">
            Personal Information
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="divide">
          <div className="profile-edit__header__buttons">
            <button
              className={
                isSystem ? `profile-edit__header__buttons__button` : ""
              }
              onClick={() => setIsSystem(true)}
            >
              Personal Information
            </button>
            <button
              className={
                isSystem ? "" : `profile-edit__header__buttons__button`
              }
              onClick={() => setIsSystem(false)}
            >
              Payment Method
            </button>
          </div>
          <div className="profile-edit__header__date"></div>
        </div>
        <Divider className="profile-edit__divider" />
      </div>
      <div className="profile-edit__body">
        {isSystem ? <ProfilePerson /> : <ProfilePayment />}
      </div>
      <ProfileModal isVisible={isModalVisible} closeModal={closeModal} />
    </div>
  );
};

export default Dashboard;

import { Breadcrumb, Button, Divider } from "antd";
import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import ProfileModal from "./component/ProfileEditModal";
import ProfilePayment from "./component/ProfileEditPayment";
import ProfilePerson from "./component/ProfileEditPersonal";
import ProfileSituation from "./component/ProfileEditSituation";
import "./index.scss";

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);

  const { data: userData } = useFetch<any>(
    "users/type",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [],
    {}
  );

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const dataSubmitted = () => {
    setIsSubmit(true);
  };

  const renderTab = () => {
    if (selectedTab === 1) return <ProfilePerson />;
    else if (selectedTab === 2) return <ProfilePayment />;
    else return <ProfileSituation />;
  };

  return (
    <div className="profile-edit">
      <div className="profile-edit__header">
        {selectedTab === 1 && userData === 2 ? (
          <Button
            className="profile-edit__header__confirm"
            onClick={() => setIsModalVisible(true)}
            disabled={isSubmit}
          >
            Xác nhận hộ nghèo
          </Button>
        ) : null}
        <Breadcrumb separator=">" className="profile-edit__header__breadcrumb">
          <Breadcrumb.Item className="profile-edit__header__breadcrumb__from">
            Profile
          </Breadcrumb.Item>
          <Breadcrumb.Item className="profile-edit__header__breadcrumb__to">
            {selectedTab === 1
              ? "Personal Information"
              : selectedTab === 2
              ? "Payment Method"
              : "Situation"}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="divide">
          <div className="profile-edit__header__buttons">
            <button
              className={
                selectedTab === 1 ? `profile-edit__header__buttons__button` : ""
              }
              onClick={() => setSelectedTab(1)}
            >
              Personal Information
            </button>
            <button
              className={
                selectedTab === 2 ? `profile-edit__header__buttons__button` : ""
              }
              onClick={() => setSelectedTab(2)}
            >
              Payment Method
            </button>
            {userData > 2 ? (
              <button
                className={
                  selectedTab === 3
                    ? `profile-edit__header__buttons__button`
                    : ""
                }
                onClick={() => setSelectedTab(3)}
              >
                Situation
              </button>
            ) : null}
          </div>
          <div className="profile-edit__header__date"></div>
        </div>
        <Divider className="profile-edit__divider" />
      </div>
      <div className="profile-edit__body">{renderTab()}</div>
      <ProfileModal
        isVisible={isModalVisible}
        closeModal={closeModal}
        submitted={dataSubmitted}
      />
    </div>
  );
};

export default Dashboard;

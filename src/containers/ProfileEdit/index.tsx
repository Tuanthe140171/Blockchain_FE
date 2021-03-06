import { Breadcrumb, Button, Divider } from "antd";
import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useSelector, useDispatch } from "react-redux";
import ProfileModal from "./component/ProfileEditModal";
import ProfilePayment from "./component/ProfileEditPayment";
import ProfilePerson from "./component/ProfileEditPersonal";
import ProfileSituation from "./component/ProfileEditSituation";
import { getUserById } from "../../stores/action/user-layout.action";
import { useNavigate, useParams } from "react-router-dom";
import "./index.scss";

const Dashboard = () => {
  const { id } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmit, setIsSubmit] = useState<any>(undefined);
  const [selectedTab, setSelectedTab] = useState(1);
  const { userData } = useSelector((state: any) => state.userLayout);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: userOriginData } = useFetch<any>(
    "users/get-user-by-id",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [isSubmit],
    {},
    (e) => {
      setIsSubmit(undefined);
      const action = getUserById(e.data);
      dispatch(action);
    }
  );

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const dataSubmitted = () => {
    setIsSubmit(true);
  };

  useEffect(() => {
    if (id) {
      setSelectedTab(+id);
    }
  }, [id]);

  const renderTab = () => {
    if (selectedTab === 1) return <ProfilePerson />;
    else if (selectedTab === 2) return <ProfilePayment />;
    else return <ProfileSituation />;
  };

  return (
    <div className="profile-edit">
      <div className="profile-edit__header">
        {selectedTab === 1 && userData?.type === 2 && !isSubmit ? (
          <Button
            className="profile-edit__header__confirm"
            onClick={() => setIsModalVisible(true)}
            // disabled={isSubmit}
          >
            Xác nhận hộ nghèo
          </Button>
        ) : null}
        <Breadcrumb separator=">" className="profile-edit__header__breadcrumb">
          <Breadcrumb.Item className="profile-edit__header__breadcrumb__from">
            Trang cá nhân
          </Breadcrumb.Item>
          <Breadcrumb.Item className="profile-edit__header__breadcrumb__to">
            {selectedTab === 1
              ? "Thông tin cá nhân"
              : selectedTab === 2
              ? "Phương thức thanh toán"
              : "Hoàn cảnh"}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="divide">
          <div className="profile-edit__header__buttons">
            <button
              className={
                selectedTab === 1 ? `profile-edit__header__buttons__button` : ""
              }
              onClick={() => {
                setSelectedTab(1);
                navigate("/profile-edit/1");
              }}
            >
              Thông tin cá nhân
            </button>
            <button
              className={
                selectedTab === 2 ? `profile-edit__header__buttons__button` : ""
              }
              onClick={() => {
                setSelectedTab(2);
                navigate("/profile-edit/2");
              }}
            >
              Phương thức thanh toán
            </button>
            {userData?.type > 2 || isSubmit ? (
              <button
                className={
                  selectedTab === 3
                    ? `profile-edit__header__buttons__button`
                    : ""
                }
                onClick={() => {
                  setSelectedTab(3);
                  navigate("/profile-edit/3");
                }}
              >
                Hoàn cảnh
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

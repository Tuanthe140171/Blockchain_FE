import { Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const ModalProfileHeader = () => {
  const { userData, badluckerType } = useSelector(
    (state: any) => state.userLayout
  );
  const avatarLink = userData?.UserMedia?.find(
    (media: any) => media.type === "1" && media.active === 1
  )
    ? userData?.UserMedia?.find(
        (media: any) => media.type === "1" && media.active === 1
      ).link
    : "/icon/AvatarTmp.png";
  const navigate = useNavigate();

  const getSituation = () => {
    if (userData?.BadLuckTypes?.length === 0) {
      return "";
    } else {
      return badluckerType?.find(
        (type: any) => type.id === userData?.BadLuckTypes[0]?.situationId
      )?.name;
    }
  };

  const getUserName = () => {
    let name = userData?.name;
    let lastName = userData?.lastName;
    if (!userData?.lastName && !userData?.name) {
      return "Người dùng";
    }
    if (!userData?.lastName) {
      lastName = "";
    }
    if (!userData?.name) {
      name = "";
    }
    return `${lastName} ${name}`;
  };

  return (
    <div className="modal-profile__header">
      <div className="modal-profile__header__avatar-group">
        <Avatar
          src={avatarLink}
          className="modal-profile__header__avatar-group__avatar"
        />
        <div className="modal-profile__header__avatar-group__name-group">
          <div className="modal-profile__header__avatar-group__name-group__name">
            {getUserName()}
          </div>
          <div className="modal-profile__header__avatar-group__name-group__description">
            {getSituation()}
          </div>
        </div>
      </div>
      <div
        className="modal-profile__header__profile"
        onClick={() => {
          navigate("/profile/");
        }}
      >
        Hồ sơ của tôi
      </div>
    </div>
  );
};

export default ModalProfileHeader;

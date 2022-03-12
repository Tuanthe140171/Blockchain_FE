import React from "react";
import "./index.scss";
import ModalProfileBody from "./ModalProfileBody";
import ModalProfileFooter from "./ModalProfileFooter";
import ModalProfileHeader from "./ModalProfileHeader";

const ModalProfile = () => {
  return (
    <div className="modal-profile">
      <ModalProfileHeader />
      <hr className="modal-profile__divider" />
      <ModalProfileBody />
      <hr className="modal-profile__divider" />
      <ModalProfileFooter />
    </div>
  );
};

export default ModalProfile;

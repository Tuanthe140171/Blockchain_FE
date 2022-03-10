import React from "react";
import "./index.scss";
import ModalNoti from "./ModalNoti";
import ModalProfile from "./ModalProfile";

type IModalType = {
  type: number;
};

const ModalHeader: React.FC<IModalType> = (props) => {
  const { type } = props;

  return type === 0 ? <ModalNoti /> : <ModalProfile />;
};

export default ModalHeader;

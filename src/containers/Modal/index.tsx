import React from "react";
import "./index.scss";
import ModalNoti from "./ModalNoti";
import ModalProfile from "./ModalProfile";
import { useContext, useState } from "react";
import { NotificationContext } from "../../layout/UserLayout";

type IModalType = {
  type: number;
};

const ModalHeader: React.FC<IModalType> = (props) => {
  const { type } = props;
  const [notifications, setNotifications] = useState([]);
  const notificationData = useContext(NotificationContext);

  return type === 0 ? <ModalNoti notifications={notificationData || []} /> : <ModalProfile />;
};

export default ModalHeader;

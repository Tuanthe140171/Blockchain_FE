import { Button, Card, Cascader, Dropdown, Menu, Modal, Tag } from "antd";
import React, { useState } from "react";
import "./index.scss";

type ProfileTagProps = {
  isVisible: boolean;
  closeModal: any;
};

const ProfileTag: React.FC<ProfileTagProps> = (props) => {
  const { isVisible, closeModal } = props;

  //   const handleOk = () => {
  //     setIsModalVisible(false);
  //   };
  return <div></div>;
};

export default ProfileTag;

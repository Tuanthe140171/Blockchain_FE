import { ArrowLeftOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import React from "react";
import "./index.scss";

type AppDrawerProps = {
  title: string;
  isVisible: boolean;
  closeModal: any;
  className: string;
  content: any;
};

const AppDrawer: React.FC<AppDrawerProps> = (props) => {
  const { title, isVisible, closeModal, className, content } = props;

  return (
    <Drawer
      title={title}
      placement="right"
      visible={isVisible}
      mask={true}
      onClose={closeModal}
      closeIcon={<ArrowLeftOutlined />}
      width="45%"
      className={`${className} app-drawer`}
      headerStyle={{ height: "98px", padding: "24px 65px 0 39px" }}
      bodyStyle={{ padding: "24px 65px 0 39px" }}
    >
      {content}
    </Drawer>
  );
};

export default AppDrawer;

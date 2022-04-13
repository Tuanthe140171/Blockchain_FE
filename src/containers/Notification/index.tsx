import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotificationActivity from "./components/NotiActivity";
import NotificationFollow from "./components/NotiFollow";
import NotificationSelection from "./components/NotiSelection";
import NotificationVoting from "./components/NotiVoting";
import "./index.scss";

export type BreadCrumbItem = {
  title: string;
  id: number;
  component: React.ElementType;
};

const BREAD_CRUMBS: { [id: number]: BreadCrumbItem } = {
  1: {
    title: "Bỏ phiếu",
    id: 1,
    component: NotificationVoting,
  },
  2: {
    title: "Người theo dõi",
    id: 2,
    component: NotificationFollow,
  },

  3: {
    title: "Hoạt động",
    id: 3,
    component: NotificationActivity,
  },
};

type INotificationProps = {
  openTabMedia: boolean;
  canCloseMedia: any;
};

const Notification: React.FC<INotificationProps> = (props) => {
  const { openTabMedia, canCloseMedia } = props;
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if (id) {
      setActiveTab(+id);
    }
  }, [id]);

  const handleActiveTabChange = (activeTab: number) => {
    setActiveTab(activeTab);
  };

  const showActiveComponent = () => {
    const MyComponent = BREAD_CRUMBS[activeTab].component;
    return <MyComponent />;
  };

  return (
    <div className="notification">
      <Breadcrumb separator=">" className="notification__breadcrumb">
        <Breadcrumb.Item className="notification__breadcrumb__from">
          Thông báo
        </Breadcrumb.Item>
        <Breadcrumb.Item className="notification__breadcrumb__to">
          {BREAD_CRUMBS[activeTab].title}
        </Breadcrumb.Item>
      </Breadcrumb>
      <NotificationSelection
        breadCrumbs={Object.keys(BREAD_CRUMBS).map((key: string) => ({
          ...BREAD_CRUMBS[+key],
        }))}
        onActiveTabChange={handleActiveTabChange}
        activeTab={activeTab}
      />
      {showActiveComponent()}
    </div>
  );
};

export default Notification;

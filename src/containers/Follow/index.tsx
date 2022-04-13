import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Followers from "./components/Followers";
import Followings from "./components/Followings";
import FollowSelection from "./components/FollowSelection";
import "./index.scss";

export type BreadCrumbItem = {
  title: string;
  id: number;
  component: React.ElementType;
};

const BREAD_CRUMBS: { [id: number]: BreadCrumbItem } = {
  1: {
    title: "Đang theo dõi",
    id: 1,
    component: Followings,
  },
  2: {
    title: "Được theo dõi",
    id: 2,
    component: Followers,
  },
};

type IfollowProps = {
  openTabMedia: boolean;
  canCloseMedia: any;
};

const Follow: React.FC<IfollowProps> = (props) => {
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
    <div className="follow">
      <Breadcrumb separator=">" className="follow__breadcrumb">
        <Breadcrumb.Item className="follow__breadcrumb__from">
          Thông báo
        </Breadcrumb.Item>
        <Breadcrumb.Item className="follow__breadcrumb__to">
          {BREAD_CRUMBS[activeTab].title}
        </Breadcrumb.Item>
      </Breadcrumb>
      <FollowSelection
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

export default Follow;

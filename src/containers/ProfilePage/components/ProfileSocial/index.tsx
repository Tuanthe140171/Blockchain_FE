import React, { useState } from "react";
import { useEffect } from "react";
import ProfileSocialMedia from "./components/ProfileSocialMedia";
import ProfileSocialPayment from "./components/ProfileSocialPayment";
import ProfileSocialPersonal from "./components/ProfileSocialPersonal";
import ProfileSocialPosts from "./components/ProfileSocialPosts";
import ProfileSocialSelection from "./components/ProfileSocialSelection";
import ProfileSocialSituation from "./components/ProfileSocialSituation";
import "./index.scss";

// const ProfileSocialPersonal = lazy(() => import("./components/ProfileSocialPersonal"));
// const ProfileSocialPosts = lazy(() => import("./components/ProfileSocialPosts"));

export type BreadCrumbItem = {
  title: string;
  id: number;
  component: React.ElementType;
};

const BREAD_CRUMBS: { [id: number]: BreadCrumbItem } = {
  1: {
    title: "Bài đăng",
    id: 1,
    component: ProfileSocialPosts,
  },
  2: {
    title: "Thanh toán",
    id: 2,
    component: ProfileSocialPayment,
  },

  3: {
    title: "Thông tin cá nhân",
    id: 3,
    component: ProfileSocialPersonal,
  },
  4: {
    title: "Ảnh",
    id: 4,
    component: ProfileSocialMedia,
  },
  5: {
    title: "Hoàn cảnh",
    id: 5,
    component: ProfileSocialSituation,
  },
};

type ProfileSocialProps = {
  openTabMedia: boolean;
  canCloseMedia: any;
};

const ProfileSocial: React.FC<ProfileSocialProps> = (props) => {
  const { openTabMedia, canCloseMedia } = props;
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if (openTabMedia) {
      setActiveTab(4);
      canCloseMedia();
    }
  }, [openTabMedia]);

  const handleActiveTabChange = (activeTab: number) => {
    setActiveTab(activeTab);
  };

  const showActiveComponent = () => {
    const MyComponent = BREAD_CRUMBS[activeTab].component;
    return <MyComponent />;
  };

  return (
    <div className="profile-social">
      <ProfileSocialSelection
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

export default ProfileSocial;

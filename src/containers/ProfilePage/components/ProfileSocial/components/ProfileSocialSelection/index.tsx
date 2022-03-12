import React, { useState } from "react";
import { BreadCrumbItem } from "../../";
import "./index.scss";

type ProfileSocialSelectionProps = {
  onActiveTabChange: (activeTab: number) => void;
  breadCrumbs: BreadCrumbItem[];
  activeTab: number;
};

const ProfileSocialSelection: React.FC<ProfileSocialSelectionProps> = (
  props
) => {
  return (
    <header className="profile-social-selection">
      {props.breadCrumbs.map((breadCrumb) => (
        <div
          className={`${
            props.activeTab === breadCrumb.id
              ? "profile-social-selection__item profile-social-selection__item--active"
              : "profile-social-selection__item"
          }`}
          key={breadCrumb.id}
          onClick={() => {
            props.onActiveTabChange && props.onActiveTabChange(breadCrumb.id);
          }}
        >
          {breadCrumb.title}
        </div>
      ))}
    </header>
  );
};

export default ProfileSocialSelection;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BreadCrumbItem } from "../../";
import "./index.scss";

type INotificationSelectionProps = {
  onActiveTabChange: (activeTab: number) => void;
  breadCrumbs: BreadCrumbItem[];
  activeTab: number;
};

const NotificationSelection: React.FC<INotificationSelectionProps> = (
  props
) => {
  const navigate = useNavigate();
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
            navigate(`/notification/${breadCrumb.id}`);
          }}
        >
          {breadCrumb.title}
        </div>
      ))}
    </header>
  );
};

export default NotificationSelection;

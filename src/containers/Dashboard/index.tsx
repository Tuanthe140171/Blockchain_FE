import { Divider } from "antd";
import React, { useState } from "react";
import DashDate from "./component/DashDate";
import DashSystem from "./component/DashSystem";
import DashUser from "./component/DashUser";
import "./index.scss";

const Dashboard = () => {
  const [isSystem, setIsSystem] = useState(true);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__header__title">Dashboard</h1>
        <div className="divide">
          <div className="dashboard__header__buttons">
            <button
              className={isSystem ? `dashboard__header__buttons__button` : ""}
              onClick={() => setIsSystem(true)}
            >
              System
            </button>
            <button
              className={isSystem ? "" : `dashboard__header__buttons__button`}
              onClick={() => setIsSystem(false)}
            >
              User
            </button>
          </div>
          <div className="dashboard__header__date">
            <DashDate />
          </div>
        </div>
      </div>
      <Divider className="dashboard__divider" />
      <div className="dashboard__body">
        {isSystem ? <DashSystem /> : <DashUser />}
      </div>
    </div>
  );
};

export default Dashboard;

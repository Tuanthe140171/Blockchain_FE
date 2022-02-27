import { Divider } from "antd";
import React from "react";
import DashSystem from "./component/DashSystem";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <div>
        <button>System</button>
        <button>User</button>
      </div>
      <Divider />
      <DashSystem />
    </>
  );
};

export default Dashboard;

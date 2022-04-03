import { Divider } from "antd";
import React, { useState } from "react";
import DashDate from "./component/DashDate";
import DashSystem from "./component/DashSystem";
import DashUser from "./component/DashUser";
import "./index.scss";

const Dashboard = () => {
  const [isSystem, setIsSystem] = useState(true);
  const [pickedDate, setPickedDate] = useState<{
    from: number,
    to: number
  } | undefined>(undefined)

  const handleDatePickerChange = (dates: any, dateStrings: any) => {
    setPickedDate({
      from: parseInt(`${dates[0].toDate().getTime()}`),
      to: parseInt(`${dates[1].toDate().getTime()}`),
    });
  }

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__header__title">Bảng điều khiển</h1>
        <div className="divide">
          <div className="dashboard__header__buttons">
            <button
              className={isSystem ? `dashboard__header__buttons__button` : ""}
              onClick={() => setIsSystem(true)}
            >
              Hệ thống
            </button>
            <button
              className={isSystem ? "" : `dashboard__header__buttons__button`}
              onClick={() => setIsSystem(false)}
            >
              Tôi
            </button>
          </div>
          <div className="dashboard__header__date">
            <DashDate onChange={handleDatePickerChange} />
          </div>
        </div>
      </div>
      <Divider className="dashboard__divider" />
      <div className="dashboard__body">
        {isSystem ? <DashSystem pickedDate={pickedDate} /> : <DashUser pickedDate={pickedDate} />}
      </div>
    </div>
  );
};

export default Dashboard;

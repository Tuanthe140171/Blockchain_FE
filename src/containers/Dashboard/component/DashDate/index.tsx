import { DatePicker, Divider, Space } from "antd";
import React, { useState } from "react";
import "./index.scss";

const { RangePicker } = DatePicker;

const DashDate = () => {
  const [dateOption, setDateOption] = useState("date");

  return (
    <>
      <Space direction="horizontal" size={12} className="dash-date">
        <div
          className={
            dateOption === "date"
              ? "dash-date__group"
              : "dash-date__group-hidden"
          }
        >
          <button onClick={() => setDateOption("date")}>Date</button>
          <div className="divider"></div>
          <RangePicker className="picker" clearIcon={true} />
        </div>
        <div
          className={
            dateOption === "week"
              ? "dash-date__group"
              : "dash-date__group-hidden"
          }
        >
          <button onClick={() => setDateOption("week")}>Week</button>
          <Divider type="vertical" className="divider" />
          <RangePicker picker="week" className="picker" clearIcon={true} />
        </div>
        <div
          className={
            dateOption === "month"
              ? "dash-date__group"
              : "dash-date__group-hidden"
          }
        >
          <button onClick={() => setDateOption("month")}>Month</button>
          <Divider type="vertical" className="divider" />
          <RangePicker picker="month" className="picker" clearIcon={true} />
        </div>
        <div
          className={
            dateOption === "year"
              ? "dash-date__group"
              : "dash-date__group-hidden"
          }
        >
          <button onClick={() => setDateOption("year")}>Year</button>
          <Divider type="vertical" className="divider" />
          <RangePicker picker="year" className="picker" clearIcon={true} />
        </div>
      </Space>
    </>
  );
};

export default DashDate;

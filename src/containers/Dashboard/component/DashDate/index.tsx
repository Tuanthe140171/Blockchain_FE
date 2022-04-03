import { DatePicker, Divider, Space } from "antd";
import React, { useState } from "react";
import "./index.scss";

type DashDateProps = {
  onChange?: (dates: any, dateStrings: any) => void;
}

const { RangePicker } = DatePicker;

const DashDate: React.FC<DashDateProps> = (props) => {
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
          <button onClick={() => setDateOption("date")}>Ngày</button>
          <div className="divider"></div>
          <RangePicker onChange={props?.onChange} className="picker" clearIcon={true} />
        </div>
        <div
          className={
            dateOption === "week"
              ? "dash-date__group"
              : "dash-date__group-hidden"
          }
        >
          <button onClick={() => setDateOption("week")}>Tuần</button>
          <Divider type="vertical" className="divider" />
          <RangePicker onChange={props?.onChange} picker="week" className="picker" clearIcon={true} />
        </div>
        <div
          className={
            dateOption === "month"
              ? "dash-date__group"
              : "dash-date__group-hidden"
          }
        >
          <button onClick={() => setDateOption("month")}>Tháng</button>
          <Divider type="vertical" className="divider" />
          <RangePicker onChange={props?.onChange} picker="month" className="picker" clearIcon={true} />
        </div>
        <div
          className={
            dateOption === "year"
              ? "dash-date__group"
              : "dash-date__group-hidden"
          }
        >
          <button onClick={() => setDateOption("year")}>Năm</button>
          <Divider type="vertical" className="divider" />
          <RangePicker onChange={props?.onChange} picker="year" className="picker" clearIcon={true} />
        </div>
      </Space>
    </>
  );
};

export default DashDate;

import { Input } from "antd";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import "./index.scss";

const { Search } = Input;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ProfilePayment = () => {
  return (
    <div className="profile-payment">
      <div className="profile-payment__title">Pay</div>
    </div>
  );
};

export default ProfilePayment;

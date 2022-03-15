import React from "react";
import { Typography } from "antd";
import DoneeSearchFilter from "./components/DoneeSearchFilter";
import DoneeList from "./components/DoneeList";
import "./index.scss";

const DoneePage: React.FC = () => {
    return (
        <div className="donee">
            <Typography.Title level={3} className="donee__title">
                Donee
            </Typography.Title>
            <div className="donee__content">
                <DoneeSearchFilter />  
                <DoneeList />
            </div>
        </div>
    )
}

export default DoneePage;
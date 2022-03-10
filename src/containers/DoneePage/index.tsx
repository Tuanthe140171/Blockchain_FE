import React from "react";
import { Typography } from "antd";
import DoneeSearchFilter from "./components/DoneeSearchFilter";
import DoneeList from "./components/DoneeList";
import useFetch from "../../hooks/useFetch";
import "./index.scss";

const DoneePage: React.FC = () => {
    const { data: provincesResp, loading} = useFetch("https://provinces.open-api.vn/api/");
    console.log(provincesResp, loading);
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
import React, { useState } from "react";
import { Typography } from "antd";
import DoneeSearchFilter from "./components/DoneeSearchFilter";
import DoneeList from "./components/DoneeList";
import useFetch from "../../hooks/useFetch";
import "./index.scss";

const DoneePage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { data, loading } = useFetch<any>(`users/donees?page=${currentPage}`, {
        "Content-Type": "application/json",
        Accept: "application/json"
    });

    return (
        <div className="donee">
            <Typography.Title level={3} className="donee__title">
                Donee
            </Typography.Title>
            <div className="donee__content">
                <DoneeSearchFilter />
                <DoneeList 
                    defaultPageSize={ data ? data.limit : 10}
                    pageSize={data ? data.limit: 10}
                    total={data ? data.count: 0}
                    current={currentPage}
                    loading={loading} 
                    setCurrentPage={setCurrentPage}
                    donees={(data && data.rows) ? data.rows.map((data: any) => ({
                    avatar: "/icon/bad-lucker.svg",
                    name: data.name,
                    circumstances: data["BadLuckerSituations"].map((badLucker: any) => badLucker.name),
                    tierCharity: data.tierCharity,
                    trustScore: data.trustScore,
                    desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với sức đối với",
                    id: data.walletAddress,
                    location: data.country
                })) : []} />
            </div>
        </div>
    )
}

export default DoneePage;
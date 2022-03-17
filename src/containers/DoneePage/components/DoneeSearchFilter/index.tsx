import React from "react";
import DonationFieldsSearch from "../DoneeFieldsSearch"
import useFetch from "../../../../hooks/useFetch";
import "./index.scss";

const DoneeSearchFilter: React.FC = () => {
    const CIRCUMSTANCES = ["Trẻ em mồ côi", "Người dân tộc thiểu số ", "Người dân tộc thiểu số", "Người cao tuổi", "Người khuyết tật"];
    const { loading, data: provincesData } = useFetch<[{ code: number, name: string }]>("https://provinces.open-api.vn/api/", {
        "Content-Type": "application/json",
        Accept: "application/json"
    }, true);

    return (
        <div className="donee-filter">
            <span className="donee-filter__title">Bộ lọc tìm kiếm</span>
            <div className="donee-filter__divider"></div>
            <DonationFieldsSearch title="Theo hoàn cảnh" fields={CIRCUMSTANCES.map((CIRCUMSTANCE, key) => ({
                id: key,
                name: CIRCUMSTANCE
            }))} />
            <div className="donee-filter__divider"></div>
            <DonationFieldsSearch loading={loading} title="Theo địa điểm" fields={provincesData ? provincesData.map(provinceData => ({
                id: provinceData.code,
                name: provinceData.name
            })) : []} />

        </div>
    )
}

export default DoneeSearchFilter;
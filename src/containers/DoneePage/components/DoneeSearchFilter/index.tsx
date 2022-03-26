import React from "react";
import DonationFieldsSearch from "../DoneeFieldsSearch"
import useFetch from "../../../../hooks/useFetch";
import "./index.scss";

type DoneeSearchFilterProps = {
    setSituations: React.Dispatch<React.SetStateAction<number[]>>,
    setProvinces: React.Dispatch<React.SetStateAction<number[]>>
}

const DoneeSearchFilter: React.FC<DoneeSearchFilterProps> = (props) => {
    const { loading, data: provincesData } = useFetch<[{ code: number, name: string }]>("assets/province", {
        "Content-Type": "application/json",
        Accept: "application/json"
    });
    const { data: situations, loading: situationsLoading } = useFetch<any>(
        "bad-lucker/get-badlucker-situation"
    );

    return (
        <div className="donee-filter">
            <span className="donee-filter__title">Bộ lọc tìm kiếm</span>
            <div className="donee-filter__divider"></div>
            <DonationFieldsSearch propagateSelectedFields={props.setSituations} loading={situationsLoading} title="Theo hoàn cảnh" fields={situations ? situations.map((situation: any) => ({
                id: situation.id,
                name: situation.name
            })): []} />
            <div className="donee-filter__divider"></div>
            <DonationFieldsSearch propagateSelectedFields={props.setProvinces} loading={loading} title="Theo địa điểm" fields={provincesData ? provincesData.map(provinceData => ({
                id: provinceData.code,
                name: provinceData.name
            })) : []} />
        </div>
    )
}

export default DoneeSearchFilter;
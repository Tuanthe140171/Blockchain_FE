import { Input, Select } from 'antd';
import React from "react";
import AppPagination from '../../../../components/AppPagination';
import DoneeCard from '../DoneeCard';
import "./index.scss";

const { Search } = Input;
const { Option } = Select;

const mockData = [
    {
        image: "/icon/bad-lucker.svg",
        name: "Nguyễn Minh Thảo",
        desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với sức đối với",
        circumstances: ["Người khuyết tật", "Trẻ mồ côi"],
        more: 2,
        tierOfCharity: 72,
        trustScore: 86,
        id: 1
    },
    {
        image: "/icon/bad-lucker-2.svg",
        name: "Nguyễn Minh Thảo",
        desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với",
        circumstances: ["Người khuyết tật", "Trẻ mồ côi"],
        more: 1,
        tierOfCharity: 76,
        trustScore: 69,
        id: 2
    },
    {
        image: "/icon/bad-lucker.svg",
        name: "Nguyễn Diên Vĩ",
        desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với",
        circumstances: ["Người khuyết tật", "Trẻ mồ côi"],
        more: 2,
        tierOfCharity: 76,
        trustScore: 69,
        id: 3
    },
    {
        image: "/icon/bad-lucker.svg",
        name: "Nguyễn Diên Vĩ",
        desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với",
        circumstances: ["Người khuyết tật", "Trẻ mồ côi"],
        more: 2,
        tierOfCharity: 76,
        trustScore: 69,
        id: 4
    },
    {
        image: "/icon/bad-lucker.svg",
        name: "Nguyễn Diên Vĩ",
        desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với",
        circumstances: ["Người khuyết tật", "Trẻ mồ côi"],
        more: 2,
        tierOfCharity: 76,
        trustScore: 69,
        id: 5
    },
    {
        image: "/icon/bad-lucker.svg",
        name: "Nguyễn Diên Vĩ",
        desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với",
        circumstances: ["Người khuyết tật", "Trẻ mồ côi"],
        more: 2,
        tierOfCharity: 76,
        trustScore: 69,
        id: 6
    },
];


const DoneeList: React.FC = () => {
    return (
        <div className="donee-list">
            <header className="donee-list__header">
                <Search className="donee-list__search" placeholder="Search donee, location..." />
                <div className="donee-list__orderBy">
                    <span>Sắp xếp theo</span>
                    <Select
                        defaultValue="TS"
                        style={{ width: 230 }}
                        onChange={() => {

                        }}
                        className="donee-list__selection"
                    >
                        <Option value="TS">Trusted Score</Option>
                        <Option value="TOS">Tier Of Charity</Option>
                    </Select>
                </div>
            </header>
            <div className="donee-list__content">
                {mockData.map(data => (
                    <DoneeCard
                        image={data.image}
                        name={data.name}
                        desc={data.desc}
                        circumstances={data.circumstances}
                        more={data.more}
                        tierOfCharity={data.tierOfCharity}
                        trustScore={data.trustScore}
                        key={data.id}
                    />
                ))}
            </div>
            <div className="donee-list__pagination-wrapper">
                <AppPagination />
            </div>
        </div>
    )
}

export default DoneeList;
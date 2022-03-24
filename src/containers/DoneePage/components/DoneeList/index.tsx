import { Input, Select, Skeleton } from 'antd';
import React from "react";
import AppPagination from '../../../../components/AppPagination';
import DoneeCard from '../DoneeCard';
import "./index.scss";

const { Search } = Input;
const { Option } = Select;

type Donee = {
    avatar: string,
    name: string,
    desc: string,
    circumstances: string[],
    tierCharity: number | undefined,
    trustScore: number | undefined,
    id: string,
    location: string
}

type DoneeListProps = {
    donees: Donee[],
    loading: boolean | undefined,
    defaultPageSize: number,
    pageSize: number,
    current: number,
    total: number,
    setCurrentPage: (page: number) => void;
}

const DoneeList: React.FC<DoneeListProps> = (props) => {
    const { donees, loading } = props;
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
            {
                loading ? (
                    <>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', marginTop: 30 }}>
                            {
                                Array.from(new Array(5)).map(_ => (
                                    <Skeleton avatar={true} paragraph={true} />
                                ))
                            }
                        </div>

                    </>
                ) : (
                    <div className="donee-list__content">
                        {

                            donees.map(data => (
                                <DoneeCard
                                    image={data.avatar}
                                    name={data.name}
                                    desc={data.desc}
                                    circumstances={data.circumstances}
                                    more={data.circumstances.length > 2 ? data.circumstances.length - 2 : 0}
                                    tierOfCharity={data.tierCharity || 0}
                                    trustScore={data.trustScore || 0}
                                    location={data.location}
                                    key={data.id}
                                />
                            ))
                        }
                    </div>
                )
            }
            <div className="donee-list__pagination-wrapper">
                <AppPagination 
                    defaultPageSize={props.defaultPageSize}
                    current={props.current}
                    totalPage={props.total}
                    pageSize={props.pageSize}
                    onChange={(page: number) => props.setCurrentPage(page)}
                />
            </div>
        </div>
    )
}

export default DoneeList;
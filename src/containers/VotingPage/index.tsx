import React, { useState } from "react";
import { Typography, Table, Button, Input, Avatar } from "antd";
import moment from 'moment';
import VotingConfirmation from "./components/VotingConfirmation";
import { SelectedUser } from "./components/VotingConfirmation";
import useDebounce from "../../hooks/useDebounce";
import useFetch from "../../hooks/useFetch";

import "./index.scss";


const { Search } = Input;

const VotingPage: React.FC = () => {
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [inputSearch, setInputSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<SelectedUser | undefined>();

    const debouncedKeyword = useDebounce<string>(inputSearch, 500);
    
    let url = `users/donees?page=${currentPage}&limit=8&keyword=${debouncedKeyword}&userType=3`;

    const { data, loading } = useFetch<any>(url, {
        "Content-Type": "application/json",
        Accept: "application/json"
    });

    const doneeData = data ? data.rows.map((donee: any) => ({
        donee: `${donee.lastName || ""} ${donee.name}`,
        dob: moment(donee.dob).format("DD-MM-yy"),
        createDate: moment(donee.createDate).format("DD-MM-yy"),
        address: `${donee.country} ${donee.baseAddress} ${donee.currentAddress}`,
        id: donee.identityId,
        situations: donee.BadLuckerSituations,
        avatar: (function(){
            const userAvatar = donee.UserMedia.filter((userMedia: any) => userMedia.type === "1" && userMedia.active === 1).slice(0, 1).pop();
            return userAvatar ? userAvatar.link: null;
        }()),
        identityPlace: donee.identityPlace,
        identityDate: donee.identityDate,
        status: "check"
    })): [];


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '10%',
        },
        {
            title: 'Donee',
            dataIndex: 'donee',
            width: '15%',
            render: (text: any, row: any, index: any) => {
                return (
                    <div className="voting__donee">
                        <Avatar src={row.avatar} />
                        <span>{text}</span>
                    </div>
                )
            }
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            width: '10%'
        },
        {
            title: 'Hoàn cảnh',
            dataIndex: 'situations',
            width: '25%',
            render: (text: any, row: any, index: any) => {
                return (
                    <div className="voting__situation">
                        <span>{row.situations[0].message}</span>
                        <div>
                            {
                                row.situations.length >= 2 && <span className="voting__situation-more">{row.situations.length - 1} more</span>
                            }
                        </div>
                    </div>
                )
            }
        },
        {
            title: 'Time summit',
            dataIndex: 'createDate',
            width: '10%'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: '15%',
            render: (text: any, row: any, index: any) => {
                return (
                    <Button
                        className={`voting__check-btn voting__check-btn--${text.toLowerCase()}`}
                        onClick={() => {
                            setSelectedUser(row);
                            setConfirmationVisible(true);
                        }}
                    >
                        {text}
                    </Button>
                )
            }
        },
    ];

    const { Title } = Typography;
   
    return (
        <div className="voting">
            <Title level={3} className="voting__title">
                Voting
            </Title>
            <div className="voting__list">
                <div className="voting__list-header">
                    <Title level={4} className="voting__list-title">
                        Pre-Donee list
                    </Title>
                    <Search 
                        placeholder="Search donee, history..." 
                        onChange={(e: any) => { setInputSearch(e.target.value) }} 
                        style={{ width: 260 }} 
                        className="voting__list-input" 
                    />
                </div>
                <Table loading={loading} className="voting__table" bordered={false} columns={columns} dataSource={doneeData} scroll={{ y: 400 }} />
                <VotingConfirmation 
                    visible={confirmationVisible} 
                    onClose={() => setConfirmationVisible(false)} 
                    setConfirmationVisible={setConfirmationVisible}
                    selectedUser={selectedUser}
                />
            </div>
        </div>
    )
}

export default VotingPage;
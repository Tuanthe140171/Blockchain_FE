import React, { useState } from "react";
import { Typography, Table, Button, Input } from "antd";
import VotingConfirmation from "./components/VotingConfirmation";
import AppPagination from "../../components/AppPagination";
import "./index.scss";

const { Search } = Input;

const VotingPage: React.FC = () => {
    const [confirmationVisible, setConfirmationVisible] = useState(false);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '10%',
        },
        {
            title: 'Donee',
            dataIndex: 'donee',
            width: '10%'
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'date',
            width: '10%'
        },
        {
            title: 'Hoàn cảnh',
            dataIndex: 'situation',
            width: '20%',
            render: (text: any, row: any, index: any) => {
                return (
                    <div className="voting__situation">
                        <span>{text}</span>
                        {
                            row.more % 2 === 0 && <span className="voting__situation-more">3 more</span>
                        }
                    </div>
                )
            }
        },
        {
            title: 'Time summit',
            dataIndex: 'time',
            width: '10%'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: '20%',
            render: (text: any, row: any, index: any) => {
                return (
                    <Button
                        className={`voting__check-btn voting__check-btn--${text.toLowerCase()}`}
                        onClick={() => text.toLowerCase() === "check" && setConfirmationVisible(true)}
                    >
                        {text}
                    </Button>
                )
            }
        },
    ];

    const { Title } = Typography;
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            id: i,
            donee: `Edward King ${i}`,
            address: `London, Park Lane no. ${i}`,
            date: "10/01/2020",
            situation: i % 2 === 0 ? "Người khuyết tật" : "Người nghèo",
            time: "02/02/1990",
            status: i % 2 === 0 ? "Claimed" : "Check",
            more: i
        });
    }
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
                    <Search placeholder="Search donee, history..." onSearch={() => { }} style={{ width: 260 }} className="voting__list-input" />
                </div>
                <Table className="voting__table" bordered={false} columns={columns} dataSource={data} scroll={{ y: 400 }} />
                <VotingConfirmation 
                    visible={confirmationVisible} 
                    onClose={() => setConfirmationVisible(false)} 
                    setConfirmationVisible={setConfirmationVisible}
                />
            </div>
        </div>
    )
}

export default VotingPage;
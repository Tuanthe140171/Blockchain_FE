import React from "react";
import { Typography, Table, Button, Image, Tooltip } from "antd";
import "./index.scss";

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Donee',
        dataIndex: 'donee',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Date of Birth',
        dataIndex: 'date',
    },
    {
        title: 'Hoàn cảnh',
        dataIndex: 'situation',
    },
    {
        title: 'Time summit',
        dataIndex: 'time',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render:  (text: any, row: any, index: any) => {
            if (text === "Checked") {
                return <Tooltip title="Checked">
                    <Image src="/icon/tick.svg" preview={false}/>
                </Tooltip>
            } 

            return <Button className="voting__check-btn">{text}</Button>
        }
    },
];

const VotingPage: React.FC = () => {
    const { Title } = Typography;
    const data = [];
    for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        id: i,
        donee: `Edward King ${i}`,
        address: `London, Park Lane no. ${i}`,
        date: "10/01/2020",
        situation: i %  2 === 0 ? "Người khuyết tật": "Người nghèo",
        time: "02/02/1990",
        status: i % 2 === 0 ? "Checked": "Check"
    });
    }
    return (
        <div className="voting">
            <Title level={3} className="voting__title">
                Voting
            </Title>
            <div className="voting__list">
                <Title level={4} className="voting__list-title">
                    Pre-Donee list
                </Title>
                <Table className="voting__table" bordered={false} columns={columns} dataSource={data} scroll={{ y: 400 }} />
            </div>
        </div>
    )
}

export default VotingPage;
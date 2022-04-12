import { Table, Typography, Input, Avatar, Tooltip, Checkbox, message } from 'antd';
import moment from 'moment';
//@ts-ignore
import currencyFormatter from 'currency-formatter';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3React } from 'web3-react-core';
import AppDialog from '../../components/AppDialog';
import AppLoading from '../../components/AppLoading';
import { CHAIN_INFO } from '../../constants/chainInfo';
import { SupportedChainId } from '../../constants/chains';
import useDebounce from '../../hooks/useDebounce';
import useFetch from '../../hooks/useFetch';
import { shortenTx } from '../../utils';
import "./index.scss";

const TokenTransferManagement: React.FC = () => {
    const [inputSearch, setInputSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<any>();
    const [reloadRedeemData, setReloadRedeemData] = useState<undefined | boolean>(undefined);
    const [startPaymentConfirm, setStartPaymentConfirm] = useState<boolean | undefined>(undefined);
    const [hasRedeemed, setHasRedeemed] = useState<boolean>(false);

    const { chainId, account } = useWeb3React();
    const {
        explorer
    } = CHAIN_INFO[
        chainId ? (chainId as SupportedChainId) : SupportedChainId.CHARITY
    ]
    
    const navigate = useNavigate();
    const debouncedKeyword = useDebounce<string>(inputSearch, 500);

    const { data, loading } = useFetch<any>(
        `redeems?page=${currentPage}&limit=8&keyword=${debouncedKeyword}${hasRedeemed ? `&hasRedeemed=1`: ''}`,
        {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        false,
        [selectedUser ?  reloadRedeemData: true],
        {
            method: "GET",
        },
        () => {
            setReloadRedeemData(undefined)
        },
        () => {
            setReloadRedeemData(undefined)
        }
    );

    const { data: paymentConfirmData, loading: paymentConfirmLoading } = useFetch<any>(
        `redeems`,
        {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        false,
        [selectedUser, startPaymentConfirm],
        {
            method: "POST",
            body: JSON.stringify({
                id: [selectedUser?.id],
                hasRedeemed: selectedUser?.checked ? 1: 0
            })
        },
        () => {
            message.success(`Bạn đã xác nhận là ${selectedUser.checked ? "đã" : "chưa"} chuyển tiền cho ${selectedUser?.receiver}`)
            setReloadRedeemData(true);
            setStartPaymentConfirm(undefined);
            setSelectedUser(undefined);
        },
        () => {
            setSelectedUser(undefined);
            setStartPaymentConfirm(undefined);
            setReloadRedeemData(true);
        }
    );


    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            width: "10%",
            sorter: (a: any, b: any) => a.id - b.id,
            render: (name: any, others: any) => (
                <Tooltip title={name}><span style={{ cursor: 'pointer' }} onClick={() => window.open(`${explorer}/tx/${name}`, '_blank')}>{shortenTx(name)}</span></Tooltip>
            )
        },
        {
            title: "Thời gian thực hiện",
            dataIndex: "createDate",
            width: "15%",
        },
        {
            title: "Người nhận",
            dataIndex: "receiver",
            width: "15%",
            render: (text: any, row: any, index: any) => {
                return (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        onClick={() => navigate(`/profile/${row.userId}`)}
                    >
                        <Avatar src={row.avatar} />
                        <span style={{ marginLeft: 10 }}>{text}</span>
                    </div>
                );
            },
        },
        {
            title: "Phương thức",
            dataIndex: "paymentMethod",
            render: (text: any, row: any, index: any) => {
                return `${text}`
            }
        },
        {
            title: "Số tiền nhận",
            dataIndex: "amount",
            render: (text: any, row: any, index: any) => {
                return `${currencyFormatter.format(text, { code: 'VND' })}`
            }
        },
        {
            title: "Thời gian chuyển",
            dataIndex: "modifyDate",
            width: "15%",
            render: (text: any, row: any, index: any) => {
                return row.hasRedeemed ? text : "chưa chuyển"
            },
        },
        {
            title: "Đã chuyển",
            dataIndex: "hasRedeemed",
            width: "15%",
            render: (text: any, row: any, index: any) => {
                return <div>
                    <Checkbox onChange={(e: any) => {
                        setSelectedUser({
                            ...row,
                            checked: e.target.checked
                        });
                        setOpenDialog(true);
                    }} checked={text}></Checkbox>
                </div>
            },
        },
    ];

    const redeemData = data
        ? data.rows.map((redeem: any) => ({
            id: redeem.id,
            avatar: (function () {
                const userAvatar = redeem.User.UserMedia.filter(
                    (userMedia: any) => userMedia.type === "1" && userMedia.active === 1
                )
                    .slice(0, 1)
                    .pop();
                return userAvatar ? userAvatar.link : null;
            })(),
            status: redeem.hasRedeemed,
            amount: redeem.amount,
            createDate: moment(redeem.redeemedAt).format("hh:mm:ss DD-MM-YYYY"),
            modifyDate: moment(redeem.modifyDate).format("hh:mm:ss DD-MM-YYYY"),
            receiver: `${redeem.User.lastName} ${redeem.User.name}`,
            hasRedeemed: redeem.hasRedeemed,
            paymentMethod: redeem.User.PaymentMethods.length > 0 ? redeem.User.PaymentMethods[0].number: "Chưa có",
            userId: redeem.User.id
        }))
        : [];

    return (
        <div className="transfer-management">
            <Typography.Title level={3} className="transfer-management__title">
                Quản trị
            </Typography.Title>
            <div className="transfer-management__list">
                <div className="transfer-management__list-header">
                    <Typography.Title level={4} className="transfer-management__list-title">
                        Danh sách giao dịch chờ chuyển tiền
                    </Typography.Title>
                    <Input.Search
                        placeholder="Tìm kiếm"
                        onChange={(e: any) => {
                            setInputSearch(e.target.value);
                        }}
                        style={{ width: 260 }}
                        className="voting__list-input"
                    />
                </div>
                <div className="transfer-management__filter">
                    <Checkbox onChange={(e: any) => { setHasRedeemed(e.target.checked) }} className="transfer-management__checkbox" checked={hasRedeemed}>Đã chuyển</Checkbox>
                </div>
                <Table
                    rowKey="id"
                    loading={loading}
                    className="transfer-management__table"
                    bordered={false}
                    columns={columns}
                    dataSource={redeemData}
                    scroll={{ y: 400 }}
                    pagination={{ pageSize: 8, current: currentPage, total: data?.count }}
                    onChange={((props: any) => setCurrentPage(props.current))}
                />
                {openDialog ? (
                    <AppDialog
                        type="confirm"
                        title={`Bạn muốn xác nhận là ${selectedUser.checked ? "đã" : "chưa"} chuyển tiền cho ${selectedUser?.receiver} ?`}
                        description="Nếu chưa xem xét hết thông tin, hãy xem lại"
                        confirmText={"Đồng ý"}
                        cancelText={"Trở về"}
                        onConfirm={() => {
                            setOpenDialog(false);
                            setStartPaymentConfirm(true);
                        }}
                        onClose={() => {
                            setOpenDialog(false);
                            setSelectedUser(undefined);
                        }}
                    />
                ) : null}
            </div>
            {paymentConfirmLoading && <AppLoading loadingContent={<div></div>} showContent={false} />}
        </div>
    )
}

export default TokenTransferManagement;
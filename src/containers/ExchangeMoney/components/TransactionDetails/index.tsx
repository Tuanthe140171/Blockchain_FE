import React from 'react';
import { Image, Avatar, Skeleton, Tooltip } from 'antd';
import { BigNumber } from 'bignumber.js';
//@ts-ignore
import currencyFormatter from 'currency-formatter';
import "./index.scss";

type TransactionDetailsProps = {
    inputAmount: string,
    chosenPaymentMethod: {
        label: string,
        title: string,
        account: string,
        accountNumber: string,
    },
    loading: boolean | undefined,
    account: string,
    accountNumber: string,
    isBuy: boolean
}

const TransactionDetails: React.FC<TransactionDetailsProps> = (props) => {
    const { isBuy, loading, inputAmount, chosenPaymentMethod, account, accountNumber } = props;

    return (
        <div className="transaction-details">
            <p className="transaction-details__title">Chi tiết giao dịch</p>
            {
                loading ? (
                    <div>
                        {
                            Array.from(new Array(2)).map(_ => (
                                <Skeleton paragraph={true} />
                            ))
                        }
                    </div>
                ) : (
                    <>
                        <div className="transaction-details__info">
                            <div className="details-info__block">
                                <span className="details-info__label">
                                    Số coin {isBuy ? 'mua': 'bán'}
                                </span>
                                <span className="details-info__text">
                                    <Tooltip title={inputAmount ? (!isBuy ? new BigNumber(inputAmount).toFixed(0): new BigNumber(inputAmount).div(1000).toFixed(0)): 0}><strong>{inputAmount ? (!isBuy ? new BigNumber(inputAmount).toFixed(0): new BigNumber(inputAmount).div(1000).toFixed(0)): 0}</strong></Tooltip>
                                    <Image src="/icon/ethereum_3.svg" preview={false} />
                                </span>
                            </div>
                            {/* <div className="details-info__block">
                            <span className="details-info__label">
                                Fee giao dịch ({donateFee * 100}%)
                            </span>
                            <span className="details-info__text">
                                <strong>{inputAmount * donateFee}</strong>
                                <Image src="/icon/ethereum_2.svg" preview={false} />
                            </span>
                        </div> */}
                            <div className="details-info__block">
                                <span className="details-info__label">
                                    Số tiền {isBuy ? 'phải chuyển': 'nhận được'}
                                </span>
                                <span className="details-info__text">
                                    <Tooltip title={inputAmount ? (isBuy ? new BigNumber(inputAmount).toFixed(0): new BigNumber(inputAmount).multipliedBy(1000).toFixed(0)): 0}><strong>{currencyFormatter.format(inputAmount ? (isBuy ? new BigNumber(inputAmount).toFixed(0): new BigNumber(inputAmount).multipliedBy(1000).toFixed(0)): 0, { code: 'VND' })}</strong></Tooltip>
                                </span>
                            </div>
                        </div>
                        <div className="transaction-details__account">
                            <p className="details-account__title">Tài khoản nhận tiền</p>
                            <div className="details-account__details">
                                <Avatar src={chosenPaymentMethod.label} />
                                <div className="details-account__personal">
                                    <p className="details-account__banking">{chosenPaymentMethod.title}</p>
                                    <p className="details-account__banking-owner">{account}</p>
                                    <p className="details-account__banking-number">{accountNumber}</p>
                                </div>
                            </div>
                        </div>
                        <div className="transaction-details__receipt details-receipt">
                            <span className="details-receipt__label">
                                Tổng số {isBuy ? 'coin mua': 'tiền nhận'}
                            </span>
                            <span className="details-receipt__text">
                                <Tooltip title={inputAmount ? (isBuy ? new BigNumber(inputAmount).div(1000).toFixed(0): currencyFormatter.format(new BigNumber(inputAmount).multipliedBy(1000).toFixed(0), { code: 'VND' })): 0}><strong>{inputAmount ? (isBuy ? new BigNumber(inputAmount).div(1000).toFixed(0): currencyFormatter.format(new BigNumber(inputAmount).multipliedBy(1000).toFixed(0), { code: 'VND' })): 0}</strong></Tooltip>
                                {isBuy && <Image src="/icon/ethereum_3.svg" preview={false} />}
                            </span>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default TransactionDetails;
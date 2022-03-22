import React from 'react';
import { Image, Avatar } from 'antd';
import "./index.scss";

type TransactionDetailsProps = {
    inputAmount: number
}

const TransactionDetails: React.FC<TransactionDetailsProps> = (props) => {
    const { inputAmount } = props;
    return (
        <div className="transaction-details">
            <p className="transaction-details__title">Your transaction details</p>
            <div className="transaction-details__info">
                <div className="details-info__block">
                    <span className="details-info__label">
                        Số coin mua
                    </span>
                    <span className="details-info__text">
                        <strong>{inputAmount}</strong>
                        <Image src="/icon/ethereum_2.svg" preview={false} />
                    </span>
                </div>
                {/* <div className="details-info__block">
                    <span className="details-info__label">
                        Fee giao dịch
                    </span>
                    <span className="details-info__text">
                        <strong>{inputAmountFee}</strong>
                        <Image src="/icon/ethereum_2.svg" preview={false} />
                    </span>
                </div> */}
                <div className="details-info__block">
                    <span className="details-info__label">
                        Số tiền phải chuyển
                    </span>
                    <span className="details-info__text">
                        <strong>{inputAmount} VND</strong>
                    </span>
                </div>
            </div>
            <div className="transaction-details__account">
                <p className="details-account__title">Tài khoản nhận tiền</p>
                <div className="details-account__details">
                    <Avatar src="/icon/user-admin.svg" />
                    <div className="details-account__personal">
                        <p className="details-account__banking">TEN NGAN HANG</p>
                        <p className="details-account__banking-owner">Chu Tai Khoan</p>
                        <p className="details-account__banking-number">So tai khoan</p>
                    </div>
                </div>
            </div>
            <div className="transaction-details__receipt details-receipt">
                <span className="details-receipt__label">
                    Tổng số coin nhận
                </span>
                <span className="details-receipt__text">
                    <strong>{inputAmount}</strong>
                    <Image src="/icon/ethereum_2.svg" preview={false} />
                </span>
            </div>
        </div>
    )
}

export default TransactionDetails;
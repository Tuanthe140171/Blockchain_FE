import React, { useState } from 'react';
import { Typography, Button, Avatar, Image } from 'antd';
import "./index.scss";

type PaymentMethodProps = {
    setCurrentStep: () => void
}

enum SUPPORTED_METHODS {
    MOMO,
    BIDV,
    TECHCOMBANK
}

const PaymentMethod: React.FC<PaymentMethodProps> = (props) => {
    const [selectedMethod, setSelectedMethod] = useState(SUPPORTED_METHODS.MOMO);
    
    const ALL_SUPPORTED_METHODS = [
        {
            label: "/icon/bidv.svg",
            id: SUPPORTED_METHODS.BIDV,
            title: "BIDV",
            account: "Mai Thi Chuyen",
            accountNumber: "42710000387624"
        },
        {
            label: "/icon/momo.svg",
            id: SUPPORTED_METHODS.MOMO,
            title: "MOMO",
            account: "Mai Thi Chuyen",
            accountNumber: "42710000387624"
        },
        {
            label: "/icon/techcombank.svg",
            id: SUPPORTED_METHODS.TECHCOMBANK,
            title: "TECHCOMBANK",
            account: "Mai Thi Chuyen",
            accountNumber: "42710000387624"
        }
    ]

    return (
        <div className="payment">
            <Typography.Title level={4} className="payment__title">
                2. Chọn phương thức thanh toán của hệ thống
            </Typography.Title>
            <div className="payment__methods">
                {
                    ALL_SUPPORTED_METHODS.map(METHOD => (
                        <div className={`payment__method ${selectedMethod === METHOD.id ? 'payment__method--active': ''}`} key={METHOD.id} onClick={() => setSelectedMethod(METHOD.id)}>
                            <Avatar className="payment__method-avatar" src={METHOD.label} />
                            <div className="payment__info">
                                <p className="payment__banking">{METHOD.title}</p>
                                <p className="payment__account">{METHOD.account}</p>
                                <p className="payment__account-number">{METHOD.accountNumber}</p>
                            </div>
                            {
                                selectedMethod === METHOD.id && <Image src="/icon/tick_1.svg" preview={false} className="payment__tick" />
                            }
                        </div>
                    ))
                }
            </div>
            <Button className="payment__btn" onClick={props.setCurrentStep}>Confirm</Button>
        </div>
    )
}

export default PaymentMethod;
import React, { useState } from 'react';
import { Typography, Button, Avatar, Image } from 'antd';
import { SUPPORTED_METHODS } from '../Buy';
import "./index.scss";


type PaymentMethodProps = {
    setCurrentStep: () => void,
    supportedPaymentMethods: { [methodId in SUPPORTED_METHODS]: {
        label: string,
        title: string,
        account: string,
        accountNumber: string,
        id: number
    }},
    setPaymentMethod: (method: number) => void,
    chosenPaymentMethod: number
}



const PaymentMethod: React.FC<PaymentMethodProps> = (props) => {
    const { chosenPaymentMethod, supportedPaymentMethods, setPaymentMethod } = props;
    return (
        <div className="payment">
            <Typography.Title level={4} className="payment__title">
                2. Chọn phương thức thanh toán của hệ thống
            </Typography.Title>
            <div className="payment__methods">
                {
                    // Object.keys(supportedPaymentMethods).map((methodId: SUPPORTED_METHODS) => {
                    //     const method = supportedPaymentMethods[methodId] as any; 
                    //     return (
                    //         <div className={`payment__method ${chosenPaymentMethod === method ? 'payment__method--active': ''}`} key={METHOD.id} onClick={() => setSelectedMethod(METHOD.id)}>
                    //             <Avatar className="payment__method-avatar" src={method.label} />
                    //             <div className="payment__info">
                    //                 <p className="payment__banking">{method.title}</p>
                    //                 <p className="payment__account">{method.account}</p>
                    //                 <p className="payment__account-number">{method.accountNumber}</p>
                    //             </div>
                    //             {
                    //                 chosenPaymentMethod === methodId && <Image src="/icon/tick_1.svg" preview={false} className="payment__tick" />
                    //             }
                    //         </div>
                    //     )
                    // })
                }
            </div>
            <Button className="payment__btn" onClick={props.setCurrentStep}>Confirm</Button>
        </div>
    )
}

export default PaymentMethod;
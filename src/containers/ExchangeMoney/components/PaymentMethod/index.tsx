import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../../../hooks/useFetch';
import { useSearchParams } from "react-router-dom";
import { Typography, Button, Avatar, Image } from 'antd';
import { SUPPORTED_METHODS } from '../Buy';
import "./index.scss";
import AppLoading from '../../../../components/AppLoading';

type PaymentMethodProps = {
    setCurrentStep: () => void,
    supportedPaymentMethods: { [methodId in SUPPORTED_METHODS]: {
        label: string,
        title: string,
        account: string,
        accountNumber: string,
    }},
    setPaymentMethod: (method: number) => void,
    chosenPaymentMethod: number
}

type ProperMethod = SUPPORTED_METHODS.MOMO;

const PaymentMethod: React.FC<PaymentMethodProps> = (props) => {
    const { chosenPaymentMethod, supportedPaymentMethods, setPaymentMethod } = props;
    const [searchParams] = useSearchParams();
    const [paymentURI, setPaymentURI] = useState<undefined | string>(undefined);

    const inputAmount = searchParams.get("amount");

    const { data, loading } = useFetch<string>(`payment/get-pay-url?amount=${inputAmount}`, 
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        }, 
        false, 
        [inputAmount], 
        {}
    );

    useEffect(() => {
        data && setPaymentURI(data);
    }, [data]);

    return (
        <div className="payment">
            <Typography.Title level={4} className="payment__title">
                2. Chọn phương thức thanh toán của hệ thống
            </Typography.Title>
            <div className="payment__methods">
                {
                    Object.keys(supportedPaymentMethods).map((methodId) => {
                        const parsedMethodId = parseInt(methodId) as ProperMethod;
                        const method = supportedPaymentMethods[parsedMethodId] as any; 
                        
                        return (
                            <div className={`payment__method ${chosenPaymentMethod === parsedMethodId ? 'payment__method--active': ''}`} key={parsedMethodId} onClick={() => setPaymentMethod(parsedMethodId)}>
                                <Avatar className="payment__method-avatar" src={method.label} />
                                <div className="payment__info">
                                    <p className="payment__banking">{method.title}</p>
                                    <p className="payment__account">{method.account}</p>
                                    <p className="payment__account-number">{method.accountNumber}</p>
                                </div>
                                {
                                    chosenPaymentMethod === parseInt(methodId) && <Image src="/icon/tick_1.svg" preview={false} className="payment__tick" />
                                }
                            </div>
                        )
                    })
                }
            </div>
            {
                paymentURI && <p className="payment__uri"  onClick={() => window.open(paymentURI, "_self")}>{paymentURI}</p>
            }
            <Button disabled={loading} className="payment__btn" onClick={props.setCurrentStep}>Back</Button>
            {
                loading && (
                    <AppLoading loadingContent={<div></div>} showContent={false} />
                )
            }
        </div>
    )
}

export default PaymentMethod;
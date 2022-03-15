import { Typography, InputNumber, Image, Button } from 'antd';
import React from 'react';
import "./index.scss";

type SelectBuyAmountProps = {
    setCurrentStep: () => void,
}

const SelectBuyAmount: React.FC<SelectBuyAmountProps> = (props) => {
    return (
        <div className="select-buy-amount">
            <Typography.Title level={4} className="select-buy-amount__title">
                1. Select an amount you want to buy
            </Typography.Title>
            <Typography.Paragraph className="select-buy-amount__input-title">
                Amount
            </Typography.Paragraph>
            <InputNumber
                addonAfter={
                    <div className="select-buy-amount__icon">
                        <Image src="/icon/ethereum_1.svg" preview={false} />
                        <p>CRV</p>
                    </div>
                }
                defaultValue={0}
                controls={false}
                className="select-buy-amount__input"
            />
            <Button className="select-buy-amount__btn" onClick={props.setCurrentStep}>Confirm</Button>
        </div>
    )
}

export default SelectBuyAmount;
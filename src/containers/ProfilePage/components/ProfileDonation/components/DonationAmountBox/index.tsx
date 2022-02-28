import React from "react";
import { Image } from "antd";

import "./index.scss";

type DonationAmountBoxProps = {
    amount: number
}

const DonationAmountBox: React.FC<DonationAmountBoxProps> = (props) => {
    const { amount = 0} = props;
    return (
        <div className="donation-amount-box">
            <Image src="/icon/ethereum_1.svg" className="donation-amount-box__icon" preview={false}/>
            <span className="donation-amount-box__txt">{amount}</span>
        </div>
    )
}

export default DonationAmountBox;
import React from "react";
import { InputNumber, Button, Image, Avatar } from "antd";
import DonationAmountBox from "./components/DonationAmountBox";

import "./index.scss";

const DONATE_AMOUNT_QUICK_SELECTS = [50, 100, 200, 500, 1000];
const TOP_PEOPLE_DONATED = [
    {
        name: "Bùi Văn Quyết",
        lastDonated: "3 hours ago",
        amount: 250,
        icon: "/icon/bad-lucker-2.svg"
    },
    {
        name: "Bùi Hoàng Xuân Bách",
        lastDonated: "3 hours ago",
        amount: 10,
        icon: "/icon/bad-lucker-4.svg"
    },
    {
        name: "Nguyễn Lâm Thảo My",
        lastDonated: "2 hours ago",
        amount: 10,
        icon: "/icon/bad-lucker-5.svg"
    },
]

const ProfileDonation: React.FC = () => {

    return (
        <div className="profile-donation">
            <div className="direct-donation">
                <div className="direct-donation__title">
                    Select an donation amount
                </div>
                <p className="direct-donation__quick-select">Quick select</p>
                <div className="direct-donation__amounts">
                    {
                        DONATE_AMOUNT_QUICK_SELECTS.map(QUICK_SELECT => <DonationAmountBox amount={QUICK_SELECT} />)
                    }
                </div>
                <p className="direct-donation__input-title">Or enter an amount to give</p>
                <InputNumber placeholder="Custom amount" className="direct-donation__input" />
                <Button className="direct-donation__btn">Donate</Button>
            </div>
            <div className="people-donated">
                <header className="people-donated__header">
                    <Image src="/icon/user-admin.svg" className="people-donated__icon" preview={false} />
                    <span className="people-donated__total">2,713 people just donated</span>
                </header>
                <ul className="people-donated__list">
                    {
                        TOP_PEOPLE_DONATED.map(TOP_DONATED => (
                            <>
                                <div className="people-donated__divider"></div>
                                <li className="people-donated__list-item">
                                    <Avatar src={TOP_DONATED.icon} className="people-donated__avatar" />
                                    <div className="people-donated__details">
                                        <p className="people-donated__name">{TOP_DONATED.name}</p>
                                        <p className="people-donated__last-donated">{TOP_DONATED.lastDonated}</p>
                                    </div>
                                    <div className="people-donated__amount">
                                        <Image src="/icon/ethereum_1.svg" preview={false}/>
                                        <span>{TOP_DONATED.amount}</span>
                                    </div>
                                </li>
                            </>
                        ))
                    }
                </ul>
                <Button className="people-donated__see-all">Sell all donations</Button>
            </div>
        </div>
    )
}

export default ProfileDonation;
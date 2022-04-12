import React from "react";
import { Avatar, Typography, Image } from "antd";

import "./index.scss";

type TopDonationCardProps = {
    image: string,
    name: string,
    lastDonation: string,
    totalDonation: string
}

const { Title } = Typography;

const TopDonationCard: React.FC<TopDonationCardProps> = (props: TopDonationCardProps) => {
    const { image, name, lastDonation, totalDonation } = props;
    return (
        <div className="top-donation-card">
            <div className="top-donation-card__avatar">
                <Avatar src={image} size="large" />
            </div>
            <div className="top-donation-card__content">
                <Title level={3} className="top-donation-card__name">{name}</Title>
                <span className="top-donation-card__last-donation">Last donation: {lastDonation}</span>
                <p className="top-donation-card__total-donation">
                    <Image
                        src="/icon/ethereum_1.svg"
                        preview={false}
                    />
                    <span>{totalDonation} VNC</span>
                </p>
            </div>
        </div>
    )
}

export default TopDonationCard;
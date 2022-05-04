import React from "react";
import { Avatar, Typography, Image } from "antd";
import { useNavigate } from "react-router-dom";

import "./index.scss";

type TopDonationCardProps = {
    image: string,
    name: string,
    lastDonation: string,
    totalDonation: string,
    id: string
}

const { Title } = Typography;

const TopDonationCard: React.FC<TopDonationCardProps> = (props: TopDonationCardProps) => {
    const { id, image, name, lastDonation, totalDonation } = props;
    const navigate = useNavigate();
    
    return (
        <div className="top-donation-card">
            <div className="top-donation-card__avatar">
                <Avatar src={image} size="large" />
            </div>
            <div className="top-donation-card__content">
                <Title level={3} className="top-donation-card__name" onClick={() => navigate(`/profile/${id}`)}>{name}</Title>
                <span className="top-donation-card__last-donation">Ủng hộ lần cuối: {lastDonation}</span>
                <p className="top-donation-card__total-donation">
                    <Image
                        src="/icon/ethereum_1.svg"
                        preview={false}
                    />
                    <span>{totalDonation} CRV</span>
                </p>
            </div>
        </div>
    )
}

export default TopDonationCard;
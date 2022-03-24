import React from "react";
import { Image, Card, Typography, Tooltip } from "antd";
import Button from "../../../../components/Button";

import "./index.scss";

const { Title } = Typography;

type DoneeCardProps = {
    image: string,
    name: string,
    desc: string,
    circumstances: string[],
    more: number,
    tierOfCharity: number,
    trustScore: number,
    location: string
}

const DoneeCard: React.FC<DoneeCardProps> = (props: DoneeCardProps) => {
    const { image, location, more, circumstances, name, desc, tierOfCharity, trustScore } = props;
    return (
        <Card className="donee-card" id="donee-card">
            <Image src={image} preview={false} />
            <div className="donee-card__body">
                <Title level={3} className="donee-card__name">{name}</Title>
                <div className="donee-card__location">
                    <Image src="/icon/location.svg" preview={false} className="donee-card__location-icon"/>    
                    <span>Hà Nội, {location}</span>
                </div>
                <div className="donee-card__circumstances">
                    {
                        (more > 0 ? circumstances.slice(2): circumstances).map(circumstance => (
                            <div className="donee-card__circumstance" key={circumstance}><Tooltip title={circumstance}>{circumstance}</Tooltip></div>
                        ))
                    }
                    {
                        more > 0 && <div className="donee-card__more">+{more} more</div>
                    }
                </div>
                {/* <p className="donee-card__desc">{desc}</p> */}
                <div className="donee-card__metrics">
                    <div className="donee-card__tier donee-card__metrics-block">
                        <span>{tierOfCharity}%</span>
                        <p>Tier of Charity</p>
                    </div>
                    <div className="donee-card__divider"></div>
                    <div className="donee-card__trust donee-card__metrics-block">
                        <span>{trustScore}%</span>
                        <p>Trust Score</p>
                    </div>
                </div>
                <Button width="100%" maxWidth="100%" content="Donate" bgColor="#F0CF27" className="donee-card__cta" />
            </div>
        </Card>
    )
}

export default DoneeCard;
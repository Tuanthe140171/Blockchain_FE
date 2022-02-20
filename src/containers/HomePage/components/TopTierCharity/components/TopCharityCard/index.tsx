import React from "react";
import { Image, Card, Typography } from "antd";
import Button from "../../../../../../components/Button";

import "./index.scss";

const { Title } = Typography;

type TopTierCharityCardProps = {
    image: string,
    name: string,
    desc: string,
    circumstances: string[],
    more: number,
    tierOfCharity: number,
    trustScore: number,
}

const TopTierCharityCard: React.FC<TopTierCharityCardProps> = (props: TopTierCharityCardProps) => {
    const { image, circumstances, name, desc, tierOfCharity, trustScore } = props;
    return (
        <Card className="charity-card">
            <Image src={image} preview={false} />
            <div className="charity-card__body">
                <div className="charity-card__circumstances">
                    {
                        circumstances.map(circumstance => (
                            <div className="charity-card__circumstance" key={circumstance}>{circumstance}</div>
                        ))
                    }
                </div>
                <Title level={3} className="charity-card__name">{name}</Title>
                <p className="charity-card__desc">{desc}</p>
                <div className="charity-card__metrics">
                    <div className="charity-card__tier charity-card__metrics-block">
                        <span>{tierOfCharity}%</span>
                        <p>Tier of Charity</p>
                    </div>
                    <div className="charity-card__divider"></div>
                    <div className="charity-card__trust charity-card__metrics-block">
                        <span>{trustScore}%</span>
                        <p>Trust Score</p>
                    </div>
                </div>
            </div>
            <Button width="100%" maxWidth="100%" content="Donate" />
        </Card>
    )
}

export default TopTierCharityCard;
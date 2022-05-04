import React, { useContext } from "react";
import { Image, Card, Typography } from "antd";
import Button from "../../../../../../components/Button";

import "./index.scss";
import { useNavigate } from "react-router-dom";
import { AuthorizationContext } from "../../../../../../components/Web3ReactManager";
import useLocalStorage from "../../../../../../hooks/useLocalStorage";
import { AuthorizeErrorType } from "../../../../../../hooks/useAuthorization";

const { Title } = Typography;

type TopTierCharityCardProps = {
    image: string,
    name: string,
    desc: string,
    id: string,
    // circumstances: string[],
    more: number,
    tierOfCharity: number,
    trustScore: number,
    style?: any
}

const CategoryCard: React.FC<TopTierCharityCardProps> = (props: TopTierCharityCardProps) => {
    const { id, image, name, desc, tierOfCharity, trustScore, style = {} } = props;
    const { error: authorizeError } = useContext(AuthorizationContext);
    const [_, setSelectedKey] = useLocalStorage("activeTab", "Dashboard");
    const navigate = useNavigate();
    return (
        <Card className="category-card" style={style}>
            <div className="category-card__avatar">
                <Image src={image} preview={false} />
            </div>
            <div className="category-card__body">
                {/* <div className="category-card__circumstances">
                    {
                        circumstances.map(circumstance => (
                            <div className="category-card__circumstance" key={circumstance}>{circumstance}</div>
                        ))
                    }
                </div> */}
                <Title level={3} className="category-card__name" onClick={() => navigate(`/profile/${id}`)}>{name}</Title>
                <p className="category-card__desc">{desc}</p>
                <div className="category-card__metrics">
                    <div className="category-card__tier category-card__metrics-block">
                        <span>{tierOfCharity}</span>
                        <p>Tier of Charity</p>
                    </div>
                    <div className="category-card__divider"></div>
                    <div className="category-card__trust category-card__metrics-block">
                        <span>{trustScore}%</span>
                        <p>Trust Score</p>
                    </div>
                    <Button width="100%" maxWidth="104px" fontSize="16px" padding="20px 24px" content="Ủng hộ" onClick={() => {
                        if (authorizeError === AuthorizeErrorType.NONE) {
                            setSelectedKey("Dashboard");
                            navigate(`/profile/${id}`);
                        }
                    }} />
                </div>
            </div>
        </Card>
    )
}

export default CategoryCard;
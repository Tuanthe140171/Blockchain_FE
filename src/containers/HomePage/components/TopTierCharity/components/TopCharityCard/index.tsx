import React, { useContext } from "react";
import { Image, Card, Typography, Tooltip } from "antd";
import Button from "../../../../../../components/Button";

import "./index.scss";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../../../../../hooks/useLocalStorage";
import { AuthorizationContext } from "../../../../../../components/Web3ReactManager";
import { AuthorizeErrorType } from "../../../../../../hooks/useAuthorization";

const { Title } = Typography;

type TopTierCharityCardProps = {
    avatar: string,
    name: string,
    desc: string,
    circumstances: string[],
    more: number,
    tierOfCharity: number,
    trustScore: number,
    id: string
}

const TopTierCharityCard: React.FC<TopTierCharityCardProps> = (props: TopTierCharityCardProps) => {
    const { error: authorizeError } = useContext(AuthorizationContext);
    const [_, setSelectedKey] = useLocalStorage("activeTab", "Dashboard");
    const navigate = useNavigate();

    const { id, more, avatar, circumstances, name, desc, tierOfCharity, trustScore } = props;
    return (
        <Card className="charity-card">
            <div className="charity-card__images">
                <Image src={avatar} preview={false} className="charity-card__avatar" />
            </div>
            <div className="charity-card__body">
                <div className="charity-card__circumstances">
                    {(more > 0 ? circumstances.slice(0, 2) : circumstances).map(
                        (circumstance) => (
                            <div className="charity-card__circumstance" key={circumstance}>
                                <Tooltip title={circumstance}>{circumstance}</Tooltip>
                            </div>
                        )
                    )}
                    {more > 0 && <div className="charity-card__more">+{more} more</div>}
                </div>
                <Title level={3} className="charity-card__name">{name}</Title>
                <p className="charity-card__desc">{desc}</p>
                <div className="charity-card__metrics">
                    <div className="charity-card__tier charity-card__metrics-block">
                        <span>{tierOfCharity || 0}%</span>
                        <p>Tier of Charity</p>
                    </div>
                    <div className="charity-card__divider"></div>
                    <div className="charity-card__trust charity-card__metrics-block">
                        <span>{trustScore || 0}%</span>
                        <p>Trust Score</p>
                    </div>
                </div>
            </div>
            <Button width="100%" maxWidth="100%" content="Ủng hộ" onClick={() => {
                if (authorizeError === AuthorizeErrorType.NONE) {
                    setSelectedKey("Dashboard");
                    navigate(`/profile/${id}`);
                }
            }}/>
        </Card>
    )
}

export default TopTierCharityCard;
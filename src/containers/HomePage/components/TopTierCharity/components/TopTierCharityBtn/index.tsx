import React from "react";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import "./index.scss";

export enum Direction {
    LEFT,
    RIGHT
}

type TopTierCharityBtnProps = {
    direction: Direction,
    disabled: boolean,
    onClick: React.MouseEventHandler<HTMLDivElement>
}

const TopTierCharityBtn: React.FC<TopTierCharityBtnProps> = (props) => {
    const { direction, disabled, onClick } = props;

    const disabledClass = disabled ? 'top-charity-carousel-btn--disabled': '';

    return (
        <div className={`top-charity-carousel-btn ${disabledClass}`} onClick={(e) => {
            if (!disabled) {
                console.log('CLICKED');
                onClick(e);
            }

            return;
        }}>
            {
                direction === Direction.LEFT ?  <ArrowLeftOutlined />: <ArrowRightOutlined />
            }
        </div>
    )
}

export default TopTierCharityBtn
import React from "react";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import "./index.scss";

export enum Direction {
    LEFT,
    RIGHT
}

type MyCarouselBtnProps = {
    direction: Direction,
    disabled: boolean,
    onClick: React.MouseEventHandler<HTMLDivElement>,
    transparent?: boolean 
}

const MyCarouselBtn: React.FC<MyCarouselBtnProps> = (props) => {
    const { direction, disabled, transparent = false, onClick } = props;

    const disabledClass = disabled ? 'my-carousel-btn--disabled': '';
    const transparentClass = transparent ? 'my-carousel-btn--transparent': '';

    return (
        <div className={`my-carousel-btn ${disabledClass} ${transparentClass}`} onClick={(e) => {
            if (!disabled) {
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

export default MyCarouselBtn;
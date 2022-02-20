import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import "./index.scss";

type DonationCategoryItemProps = {
    linkForward: string,
    title: string,
    active: boolean,
    onClick: React.MouseEventHandler<HTMLDivElement>,
}

const DonationCategoryItem: React.FC<DonationCategoryItemProps> = (props) => {
    const { active, onClick } = props;
    const activeClass = active ? "donation-category--active": "";
    return (
        <div className={`donation-category ${activeClass}`} onClick={(e) => {
            if (!active) {
                onClick(e);
            }

            return;
        }}>
            <p className="donation-category__title">{props.title}</p>
            {
                active && (
                    <div className="donation-category__link">
                        <Link className="donation-category__view-more" to="/donate">Tìm hiểu thêm</Link>
                        <ArrowRightOutlined color="white" className="donation-category__icon"/>
                    </div>
                )
            }
        </div>
    )
}

export default DonationCategoryItem;
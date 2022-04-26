import React, { useState, useRef } from "react";
import { Typography, Carousel } from "antd";
import {CarouselRef} from "antd/lib/carousel";

import MyCarouselBtn, { Direction } from "../../../../components/MyCarouselBtn";
import TopDonationCard from "./components/TopDonationCard";
import "./index.scss";

const { Title } = Typography;

type TopDonationProps = {
    donations: {
        id: string,
        lastName: string,
        name: string,
        image: string,
        totalDonation: string,
        lastDonation: string
    }[]
}

const TopDonation: React.FC<TopDonationProps> = (props) => {
    const { donations } = props;

    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef<CarouselRef | undefined>();

    const renderCarouselCards = (cards: any) => {
        if (cards.length > 0) {
            let cardGroups = [];
            for (let i = 0; i < donations.length; i++) {
                if (i % 4 === 0) {
                    let tempCategory = [];
                    tempCategory.push(
                        <TopDonationCard
                            id={donations[i].id}
                            image={donations[i].image}
                            name={donations[i].name}
                            lastDonation={donations[i].lastDonation}
                            totalDonation={donations[i].totalDonation}
                            key={i}
                        />
                    );

                    i + 1 <= donations.length - 1 &&
                        tempCategory.push(
                            <TopDonationCard
                                id={donations[i + 1].id}
                                image={donations[i + 1].image}
                                name={donations[i + 1].name}
                                lastDonation={donations[i + 1].lastDonation}
                                totalDonation={donations[i + 1].totalDonation}
                                key={i + 1}
                            />
                        );

                    i + 2 <= donations.length - 1 &&
                        tempCategory.push(
                            <TopDonationCard
                                id={donations[i + 2].id}
                                image={donations[i + 2].image}
                                name={donations[i + 2].name}
                                lastDonation={donations[i + 2].lastDonation}
                                totalDonation={donations[i + 2].totalDonation}
                                key={i + 2}
                            />
                        );

                    i + 3 <= donations.length - 1 &&
                        tempCategory.push(
                            <TopDonationCard
                                id={donations[i + 3].id}
                                image={donations[i + 3].image}
                                name={donations[i + 3].name}
                                lastDonation={donations[i + 3].lastDonation}
                                totalDonation={donations[i + 3].totalDonation}
                                key={i + 3}
                            />
                        );

                    cardGroups.push(
                        <div className="top-donation__card-group" key={i}>
                            {tempCategory}
                        </div>
                    );
                }
            }

            return cardGroups;
        }

        return;
    };

    return (
        <div className="top-donation">
            <span className="top-donation__monthly">CVERSE Vinh Danh Hàng Tháng</span>
            <Title level={3} className="top-donation__desc">
                Top những người quyên góp nhiều nhất
            </Title>
            <div className="top-donation__cards">
                <Carousel 
                    className="top-donation__carousel" 
                    pauseOnHover={true} 
                    // autoplay
                    ref={(el: any) => carouselRef.current = el}
                    afterChange={(slide) => {
                        setCurrentSlide(slide);
                    }}    
                >
                    {renderCarouselCards(donations)}
                </Carousel>
                <div className="top-donation__cards-btns">
                    <MyCarouselBtn direction={Direction.LEFT} disabled={currentSlide === 0} transparent={true} onClick={() => carouselRef.current?.goTo(currentSlide > 1 ? currentSlide - 1: 0)}/>
                    <MyCarouselBtn direction={Direction.RIGHT} disabled={false} transparent={true} onClick={() => carouselRef.current?.goTo(currentSlide + 1 <= donations.length - 2 ? currentSlide + 1: 0)}/>
                </div>
            </div>
        </div>
    );
};

export default TopDonation;

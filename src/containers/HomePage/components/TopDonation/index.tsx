import React, { useState, useRef } from "react";
import { Typography, Carousel } from "antd";
import {CarouselRef} from "antd/lib/carousel";

import MyCarouselBtn, { Direction } from "../../../../components/MyCarouselBtn";
import TopDonationCard from "./components/TopDonationCard";
import "./index.scss";

const { Title } = Typography;

const TopDonation: React.FC = () => {
    const topDonations = [
        {
            name: "Hoàng Lê Kim",
            lastDonation: "3m ago",
            totalDonation: "1,307,000",
            image: "/icon/bad-lucker-1.svg",
        },
        {
            name: "Nguyễn Xuyến",
            lastDonation: "3m ago",
            totalDonation: "1,627,000",
            image: "/icon/bad-lucker-2.svg",
        },
        {
            name: "Hoàng Lê Bảo",
            lastDonation: "3m ago",
            totalDonation: "3,307,000",
            image: "/icon/bad-lucker-4.svg",
        },
        {
            name: "Nguyễn Thị Minh",
            lastDonation: "3m ago",
            totalDonation: "5,307,000",
            image: "/icon/bad-lucker-5.svg",
        },
        {
            name: "Nguyễn Thị Minh",
            lastDonation: "3m ago",
            totalDonation: "5,307,000",
            image: "/icon/bad-lucker-5.svg",
        },
        {
            name: "Nguyễn Thị Minh",
            lastDonation: "3m ago",
            totalDonation: "5,307,000",
            image: "/icon/bad-lucker-5.svg",
        },
        {
            name: "Nguyễn Thị Minh",
            lastDonation: "3m ago",
            totalDonation: "5,307,000",
            image: "/icon/bad-lucker-5.svg",
        },
        {
            name: "Nguyễn Thị Minh",
            lastDonation: "3m ago",
            totalDonation: "5,307,000",
            image: "/icon/bad-lucker-5.svg",
        },
        {
            name: "Nguyễn Thị Minh",
            lastDonation: "3m ago",
            totalDonation: "5,307,000",
            image: "/icon/bad-lucker-5.svg",
        },
        {
            name: "Nguyễn Thị Minh",
            lastDonation: "3m ago",
            totalDonation: "5,307,000",
            image: "/icon/bad-lucker-5.svg",
        },
        {
            name: "Nguyễn Thị Minh",
            lastDonation: "3m ago",
            totalDonation: "5,307,000",
            image: "/icon/bad-lucker-5.svg",
        },
        {
            name: "Nguyễn Thị Minh",
            lastDonation: "3m ago",
            totalDonation: "5,307,000",
            image: "/icon/bad-lucker-5.svg",
        },
        {
            name: "Nguyễn Thị Minh",
            lastDonation: "3m ago",
            totalDonation: "5,307,000",
            image: "/icon/bad-lucker-5.svg",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef<CarouselRef | undefined>();

    const renderCarouselCards = (cards: any) => {
        if (cards.length > 0) {
            let cardGroups = [];
            for (let i = 0; i < topDonations.length; i++) {
                if (i % 4 === 0) {
                    let tempCategory = [];
                    tempCategory.push(
                        <TopDonationCard
                            image={topDonations[i].image}
                            name={topDonations[i].name}
                            lastDonation={topDonations[i].lastDonation}
                            totalDonation={topDonations[i].totalDonation}
                            key={i}
                        />
                    );

                    i + 1 <= topDonations.length - 1 &&
                        tempCategory.push(
                            <TopDonationCard
                                image={topDonations[i + 1].image}
                                name={topDonations[i + 1].name}
                                lastDonation={topDonations[i + 1].lastDonation}
                                totalDonation={topDonations[i + 1].totalDonation}
                                key={i + 1}
                            />
                        );

                    i + 2 <= topDonations.length - 1 &&
                        tempCategory.push(
                            <TopDonationCard
                                image={topDonations[i + 2].image}
                                name={topDonations[i + 2].name}
                                lastDonation={topDonations[i + 2].lastDonation}
                                totalDonation={topDonations[i + 2].totalDonation}
                                key={i + 2}
                            />
                        );

                    i + 3 <= topDonations.length - 1 &&
                        tempCategory.push(
                            <TopDonationCard
                                image={topDonations[i + 3].image}
                                name={topDonations[i + 3].name}
                                lastDonation={topDonations[i + 3].lastDonation}
                                totalDonation={topDonations[i + 3].totalDonation}
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
            <span className="top-donation__monthly">CVERSE MONTHLY HONOR</span>
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
                        // console.log(slide);
                        setCurrentSlide(slide);
                    }}    
                >
                    {renderCarouselCards(topDonations)}
                </Carousel>
                <div className="top-donation__cards-btns">
                    <MyCarouselBtn direction={Direction.LEFT} disabled={currentSlide === 0} transparent={true} onClick={() => carouselRef.current?.goTo(currentSlide > 1 ? currentSlide - 1: 0)}/>
                    <MyCarouselBtn direction={Direction.RIGHT} disabled={false} transparent={true} onClick={() => carouselRef.current?.goTo(currentSlide + 1 <= topDonations.length - 2 ? currentSlide + 1: 0)}/>
                </div>
            </div>
        </div>
    );
};

export default TopDonation;

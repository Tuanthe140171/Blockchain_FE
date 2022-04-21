import React, { useState, useRef } from "react";
import { Typography, Image } from "antd";
//@ts-ignore
import { Fade } from 'react-reveal';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import TopTierCharityCard from "./components/TopCharityCard";
import MyCarouselBtn, { Direction } from "../../../../components/MyCarouselBtn";
import "./index.scss";

type TopTierCharityProps = {
  topTierOfCharity: {
    id: string,
    name: string,
    desc: string,
    avatar: string,
    circumstances: string[],
    trustScore: number,
    tierOfCharity: number
  }[]
}

const { Title } = Typography;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const mockData = [
  {
    image: "/icon/bad-lucker.svg",
    name: "Nguyễn Minh Thảo",
    desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với sức đối với",
    circumstances: ["Người khuyết tật", "Trẻ mồ côi"],
    more: 2,
    tierOfCharity: 72,
    trustScore: 86,
    id: 1
  },
  {
    image: "/icon/bad-lucker-2.svg",
    name: "Nguyễn Minh Thảo",
    desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với",
    circumstances: ["Người khuyết tật", "Trẻ mồ côi"],
    more: 1,
    tierOfCharity: 76,
    trustScore: 69,
    id: 2
  },
  {
    image: "/icon/bad-lucker.svg",
    name: "Nguyễn Diên Vĩ",
    desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với",
    circumstances: ["Người khuyết tật", "Trẻ mồ côi"],
    more: 2,
    tierOfCharity: 76,
    trustScore: 69,
    id: 3
  },
  {
    image: "/icon/bad-lucker.svg",
    name: "Nguyễn Diên Vĩ",
    desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với",
    circumstances: ["Người khuyết tật", "Trẻ mồ côi"],
    more: 2,
    tierOfCharity: 76,
    trustScore: 69,
    id: 4
  },
  {
    image: "/icon/bad-lucker.svg",
    name: "Nguyễn Diên Vĩ",
    desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với",
    circumstances: ["Người khuyết tật", "Trẻ mồ côi"],
    more: 2,
    tierOfCharity: 76,
    trustScore: 69,
    id: 5
  },
  {
    image: "/icon/bad-lucker.svg",
    name: "Nguyễn Diên Vĩ",
    desc: "Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với Thảo gặp nhiều khó khăn trong cuộc sống, mọi thứ quá sức đối với",
    circumstances: ["Người khuyết tật", "Trẻ mồ côi"],
    more: 2,
    tierOfCharity: 76,
    trustScore: 69,
    id: 6
  },
];

const TopTierCharity: React.FC<TopTierCharityProps> = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<Carousel | null>();
  const { topTierOfCharity } = props;
  return (
    <div className="top-charity">
      <Image
        src="/icon/top-charity.svg"
        preview={false}
        className="top-charity__img"
      />
      <div className="top-charity__header">
        <Fade left>
          <p className="header-charity__top-tier">TOP TIER OF CHARITY</p>
          <Title level={2} className="header-charity__title">
            Những đối tượng gặp hoàn cảnh khó khăn nhất
          </Title>
          <p className="header-charity__desc">
            Trong số 3.000 gia đình mà chương trình Mỗi Ngày Một Quả Trứng (MNMQT)
          </p>
          <div className="header-charity__carousel-btns">
            <MyCarouselBtn direction={Direction.LEFT} disabled={currentSlide === 0} onClick={() => carouselRef.current?.goToSlide(currentSlide > 1 ? currentSlide - 1 : 0)} />
            <MyCarouselBtn direction={Direction.RIGHT} disabled={false} onClick={() => carouselRef.current?.goToSlide(currentSlide + 1 <= mockData.length - 2 ? currentSlide + 1 : 0)} />
          </div>
        </Fade>
      </div>
      <div className="top-charity__cards">
        <Carousel
          responsive={responsive}
          showDots={false}
          className="top-charity__carousel"
          removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
          keyBoardControl={true}
          pauseOnHover={true}
          autoPlay={false}
          afterChange={(_nextSlide, { currentSlide }) => {
            setCurrentSlide(currentSlide);
          }}
          ref={el => (carouselRef.current = el)}
        >
          {topTierOfCharity.map(data => (
            <TopTierCharityCard
              id={data.id}
              avatar={data.avatar}
              name={data.name}
              desc={data.desc}
              circumstances={data.circumstances}
              more={
                data.circumstances.length > 2
                  ? data.circumstances.length - 2
                  : 0
              }
              tierOfCharity={data.tierOfCharity}
              trustScore={data.trustScore}
              key={data.id}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TopTierCharity;

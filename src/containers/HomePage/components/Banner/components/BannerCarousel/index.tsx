import React from "react";
import { Carousel, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import "./index.scss";

const { Title } = Typography;

type BannerProps = {
  posts: {
    id: string,
    title: string,
    content: string,
    userName: string
  }[]
}

const BannerCarousel: React.FC<BannerProps> = (props) => {
  const { posts } = props;

  const renderCarouselCards = (cards: any) => {
    if (cards.length > 0) {
      let cardGroups = [];
      for (let i = 0; i < posts.length; i++) {
        if (i % 2 === 0) {
          let tempCategory = [];

          tempCategory.push(
            <>
              <div className="banner-carousel__item--first">
                <Title className="carousel-item__title" level={3}>
                  {posts[i].userName}
                </Title>
                <p className="carousel-item__desc">
                  {posts[i].content}
                </p>
                <div className="carousel-item__link">
                  <Link className="carousel-item__view-more" to="/donate">
                    Đọc thêm
                  </Link>
                  <ArrowRightOutlined color="white" className="carousel-item__icon" />
                </div>
              </div>
            </>
          );

          i + 1 <= posts.length - 1 &&
            tempCategory.push(
              <>
                <div className="banner-carousel__divider"></div>
                <div className="banner-carousel__item--second">
                  <Title className="carousel-item__title" level={3}>
                    {posts[i + 1].userName}
                  </Title>
                  <p className="carousel-item__desc">
                    {posts[i + 1].content}
                  </p>
                  <div className="carousel-item__link">
                    <Link className="carousel-item__view-more" to="/donate">
                      Đọc thêm
                    </Link>
                    <ArrowRightOutlined color="white" className="carousel-item__icon" />
                  </div>
                </div>
              </>
            );

          cardGroups.push(
            <div className="banner-carousel__item">
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
    <div className="banner-carousel">
      <Carousel dotPosition="right" autoplay>
        {renderCarouselCards(posts)}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;

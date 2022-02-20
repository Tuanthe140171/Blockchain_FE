import React from "react";
import { Carousel, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import "./index.scss";

const { Title } = Typography;

const BannerCarousel: React.FC = () => {
  return (
    <div className="banner-carousel">
      <Carousel dotPosition="right" autoplay>
        <div className="banner-carousel__item">
          <div className="banner-carousel__item--first">
            <Title className="carousel-item__title" level={3}>
              Giang Minh- Trẻ nghèo Hà Giang
            </Title>
            <p className="carousel-item__desc">
              Trong số 3.000 gia đình mà chương trình Mỗi Ngày Một Quả Trứng
              (MNMQT) đang hỗ trợ lương

              Trong số 3.000 gia đình mà chương trình Mỗi Ngày Một Quả Trứng
              (MNMQT) đang hỗ trợ lương

              Trong số 3.000 gia đình mà chương trình Mỗi Ngày Một Quả Trứng
              (MNMQT) đang hỗ trợ lương
            </p>
            <div className="carousel-item__link">
              <Link className="carousel-item__view-more" to="/donate">
                Đọc thêm
              </Link>
              <ArrowRightOutlined color="white" className="carousel-item__icon" />
            </div>
          </div>

          <div className="banner-carousel__divider"></div>

          <div className="banner-carousel__item--second">
            <Title className="carousel-item__title" level={3}>
              Hồng Hạnh- Trẻ nghèo vượt khó
            </Title>
            <p className="carousel-item__desc">
              Trong số 3.000 gia đình mà chương trình Mỗi Ngày Một Quả Trứng
              (MNMQT) đang hỗ trợ lương
            </p>
            <div className="carousel-item__link">
              <Link className="carousel-item__view-more" to="/donate">
                Đọc thêm
              </Link>
              <ArrowRightOutlined color="white" className="carousel-item__icon" />
            </div>
          </div>
        </div>

        <div className="banner-carousel__item">
          <div className="banner-carousel__item--first">
            <Title className="carousel-item__title" level={3}>
              Giang Vadymus- Trẻ nghèo Hà Giang
            </Title>
            <p className="carousel-item__desc">
              Trong số 3.000 gia đình mà chương trình Mỗi Ngày Một Quả Trứng
              (MNMQT) đang hỗ trợ lương
            </p>
            <div className="carousel-item__link">
              <Link className="carousel-item__view-more" to="/donate">
                Đọc thêm
              </Link>
              <ArrowRightOutlined color="white" className="carousel-item__icon" />
            </div>
          </div>

          <div className="banner-carousel__item--second">
            <Title className="carousel-item__title" level={3}>
              HồnG Ly- Trẻ nghèo vượt khó
            </Title>
            <p className="carousel-item__desc">
              Trong số 3.000 gia đình mà chương trình Mỗi Ngày Một Quả Trứng
              (MNMQT) đang hỗ trợ lương
            </p>
            <div className="carousel-item__link">
              <Link className="carousel-item__view-more" to="/donate">
                Đọc thêm
              </Link>
              <ArrowRightOutlined color="white" className="carousel-item__icon" />
            </div>
          </div>
        </div>

        <div className="banner-carousel__item">
          <div className="banner-carousel__item--first">
            <Title className="carousel-item__title" level={3}>
              Giang Vadymus- Trẻ nghèo Hà Giang
            </Title>
            <p className="carousel-item__desc">
              Trong số 3.000 gia đình mà chương trình Mỗi Ngày Một Quả Trứng
              (MNMQT) đang hỗ trợ lương
            </p>
            <div className="carousel-item__link">
              <Link className="carousel-item__view-more" to="/donate">
                Đọc thêm
              </Link>
              <ArrowRightOutlined color="white" className="carousel-item__icon" />
            </div>
          </div>

          <div className="banner-carousel__item--second">
            <Title className="carousel-item__title" level={3}>
              HồnG Ly- Trẻ nghèo vượt khó
            </Title>
            <p className="carousel-item__desc">
              Trong số 3.000 gia đình mà chương trình Mỗi Ngày Một Quả Trứng
              (MNMQT) đang hỗ trợ lương
            </p>
            <div className="carousel-item__link">
              <Link className="carousel-item__view-more" to="/donate">
                Đọc thêm
              </Link>
              <ArrowRightOutlined color="white" className="carousel-item__icon" />
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default BannerCarousel;

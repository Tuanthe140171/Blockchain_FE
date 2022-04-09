import React from "react";
import { Image, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import BannerCarousel from "./components/BannerCarousel";

import "./index.scss";

const { Title } = Typography;

const Banner: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="banner">
      <Image src="/icon/banner.svg" preview={false} className="banner__img" />
      <div className="banner__content">
        <div className="banner__header">
          <Title level={2} className="banner__title">
            Quyên góp cho trẻ em nghèo Việt Nam
          </Title>
          <div className="donate-cta">
            <Button content="Donate" onClick={() => navigate("/donee")} />
            <div className="donate-cta__link">
                <Link className="donate-cta__view-more" to="/donate">Tìm hiểu thêm</Link>
                <RightOutlined color="white" className="donate-cta__icon"/>
            </div>
          </div>
        </div>
      </div>
      <BannerCarousel />
    </div>
  );
};

export default Banner;

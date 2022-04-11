import React from "react";
import { Image, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import BannerCarousel from "./components/BannerCarousel";
import { useContext } from "react";
import "./index.scss";
import { AuthorizationContext } from "../../../../components/Web3ReactManager";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import { AuthorizeErrorType } from "../../../../hooks/useAuthorization";

const { Title } = Typography;

type BannerProps = {
  posts: {
    id: string,
    title: string,
    content: string
  }[]
}

const Banner: React.FC<BannerProps> = (props) => {
  const { posts } = props;
  const { error: authorizeError } = useContext(AuthorizationContext);
  const [_, setSelectedKey] = useLocalStorage("activeTab", "Dashboard");
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
            <Button content="Donate" onClick={() => {
              if (authorizeError === AuthorizeErrorType.NONE) {
                setSelectedKey("Donee");
                navigate("/donee");
              }
            }} />
            <div className="donate-cta__link">
              <Link className="donate-cta__view-more" to="/donate">Tìm hiểu thêm</Link>
              <RightOutlined color="white" className="donate-cta__icon" />
            </div>
          </div>
        </div>
      </div>
      <BannerCarousel posts={posts} />
    </div>
  );
};

export default Banner;

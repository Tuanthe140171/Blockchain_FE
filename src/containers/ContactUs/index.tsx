import { Typography, Image } from "antd";
import React from "react";
import "./index.scss";

const ContactUs: React.FC = () => {
  return (
    <div className="contact-us">
      <Typography.Title level={3} className="contact-us__title">
        Thông tin liên hệ
      </Typography.Title>
      <div className="contact-us__content">
        <div className="contact-us__bg">
          <Image src="/icon/top-charity.svg" preview={false} />
        </div>
        <div className="contact-us__block">
          <span>Người liên hệ: </span>
          <div>Trần Quý Ban</div>
        </div>
        <div className="contact-us__block">
          <span>Số điện thoại: </span>
          <div>0988091804</div>
        </div>
        <div className="contact-us__block">
          <span>Gmail: </span>
          <div>
            <a href="#">quybanbk@gmail.com</a>
          </div>
        </div>
        <div className="contact-us__block">
          <span>Tên công ty: </span>
          <div>Công ty cổ phần tư vấn và đào tạo Mặt Trời Xanh</div>
        </div>  
        <div className="contact-us__block">
          <span>Mã số thuế: </span>
          <div>0107160133</div>
        </div>
        <div className="contact-us__block">
          <span>Địa chỉ: </span>
          <div>Tầng 4 Tòa nhà D2 Giảng Võ, Ba Đình, Hà Nội</div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

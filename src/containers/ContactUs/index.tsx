import { Typography, Image } from 'antd';
import React from 'react';
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
                    <span>Tên công ty: </span>
                    <div>Công ty 3 chú ngỗng</div>
                </div>
                <div className="contact-us__block">
                    <span>CEO: </span>
                    <div>Nguyễn Quang Trường</div>
                </div>
                <div className="contact-us__block">
                    <span>Số điện thoại: </span>
                    <div>0332089984</div>
                </div>
                <div className="contact-us__block">
                    <span>Địa chỉ: </span>
                    <div>Số 5 ngõ 80 Trung Kính Trung Hòa Hà Nội</div>
                </div>
                <div className="contact-us__block">
                    <span>Gmail: </span>
                    <div><a href="#">truong020900@gmail.com</a></div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs;
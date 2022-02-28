import { Image } from 'antd';
import { Link } from "react-router-dom";
import React from 'react'

import "./index.scss";

const ProfileSocialPersonal: React.FC = () => {
    return (
        <div className="profile-personal-wrapper">
            <div className="profile-personal">
                <header className="profile-personal__header">
                    <p className="personal-header__title">Personal Information</p>
                    <span className="personal-header__edit">Edit</span>
                </header>
                <div className="profile-personal__divider" />
                <ul className="profile-personal__details">
                    <li className="profile-personal__detail">
                        <div className="profile-personal__detail-label">
                            <Image src="/icon/user-admin_3.svg" className="profile-personal__detail-icon" preview={false} />
                            <span>Họ và Tên</span>
                        </div>
                        <span className="profile-personal__detail-content">Mai Thị Mây</span>
                    </li>
                    <li className="profile-personal__detail">
                        <div className="profile-personal__detail-label">
                            <Image src="/icon/calendar.svg" className="profile-personal__detail-icon" preview={false} />
                            <span>Ngày Sinh</span>
                        </div>
                        <span className="profile-personal__detail-content">5/ 10/ 2000</span>
                    </li>
                    <li className="profile-personal__detail">
                        <div className="profile-personal__detail-label">
                            <Image src="/icon/location.svg" className="profile-personal__detail-icon" preview={false} />
                            <span>Trú quán</span>
                        </div>
                        <span className="profile-personal__detail-content">Hà Nội, Việt Nam</span>
                    </li>
                    <li className="profile-personal__detail">
                        <div className="profile-personal__detail-label">
                            <Image src="/icon/home_1.svg" className="profile-personal__detail-icon" preview={false} />
                            <span>Nguyên quán</span>
                        </div>
                        <span className="profile-personal__detail-content">Hà Giang, Việt Nam</span>
                    </li>
                    <li className="profile-personal__detail">
                        <div className="profile-personal__detail-label">
                            <Image src="/icon/home_1.svg" className="profile-personal__detail-icon" preview={false} />
                            <span>Số CMND</span>
                        </div>
                        <span className="profile-personal__detail-content">0312 0908 1123</span>
                    </li>
                    <li className="profile-personal__detail">
                        <div className="profile-personal__detail-label">
                            <Image src="/icon/home_1.svg" className="profile-personal__detail-icon" preview={false} />
                            <span>Ngày cấp CMND</span>
                        </div>
                        <span className="profile-personal__detail-content">3/2/2019</span>
                    </li>
                    <li className="profile-personal__detail">
                        <div className="profile-personal__detail-label">
                            <Image src="/icon/home_1.svg" className="profile-personal__detail-icon" preview={false} />
                            <span>Nơi cấp CMND</span>
                        </div>
                        <span className="profile-personal__detail-content">Cục Cảnh Sát</span>
                    </li>
                </ul>
                <div className="profile-personal__add-info">
                    <Image src="/icon/edit.svg" preview={false} className="profile-personal__add-info-icon" />
                    <span>Add Personal Information</span>
                </div>
            </div>
            <div className="profile-situation">
                <header className="profile-personal__header">
                    <p className="personal-header__title">Situation</p>
                    <span className="personal-header__edit">Edit</span>
                </header>
                <div className="profile-personal__divider" />
                <ul className="profile-situation__details">
                    <li className="profile-situation__detail">
                        <div className="profile-situation__detail-label">
                            <Image src="/icon/identification.svg" className="profile-situation__detail-icon" preview={false} />
                            <span>Hoàn Cảnh 1</span>
                        </div>
                        <div className="profile-situation__detail-content">
                            <span>Người nghèo</span>
                            <div className="profile-situation__detail-view-more">
                                <span>Giấy chứng nhận hộ nghèo có công chứng</span>
                                <Link to="/">View</Link>
                            </div>
                        </div>
                    </li>

                    <li className="profile-situation__detail">
                        <div className="profile-situation__detail-label">
                            <Image src="/icon/identification.svg" className="profile-situation__detail-icon" preview={false} />
                            <span>Hoàn Cảnh 2</span>
                        </div>
                        <div className="profile-situation__detail-content">
                            <span>Thương binh liệt sĩ</span>
                            <div className="profile-situation__detail-view-more">
                                <span>Giấy chứng nhận hộ nghèo có công chứng</span>
                                <Link to="/">View</Link>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="profile-situation__add-info">
                    <Image src="/icon/edit.svg" preview={false} className="profile-situation__add-info-icon" />
                    <span>Add Situation</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileSocialPersonal;
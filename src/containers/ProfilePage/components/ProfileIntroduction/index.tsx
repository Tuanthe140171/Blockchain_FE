import { Avatar, Button, Image } from "antd";
import { Link } from "react-router-dom";
import React from "react";

import "./index.scss";

const ProfileIntroduction: React.FC = () => {
    return (
        <div className="profile-intro">
            <div className="profile-intro__details">
                <Avatar src="/icon/bad-lucker-5.svg" className="profile-intro__avatar" />
                <p className="profile-intro__name">Nguyễn Minh Trí</p>
                <span className="profile-intro__status">Người khuyết tật</span>
                <p className="profile-intro__location">
                    <Image src="/icon/map.svg" className="profile-intro__location-icon" />
                    <span>Hà Nội Việt Nam</span>
                </p>
                <Button className="follow-btn">
                    <Image src="/icon/plus.svg" className="follow-btn__icon" />
                    <span className="follow-btn__txt">Follow</span>
                </Button>
                <div className="profile-intro__metrics">
                    <div className="profile-intro__tier profile-intro__metrics-block">
                        <p>Tier of Charity</p>
                        <span>56%</span>
                    </div>
                    <div className="profile-intro__divider"></div>
                    <div className="profile-intro__trust profile-intro__metrics-block">
                        <p>Trust Score</p>
                        <span>70%</span>
                    </div>
                </div>
            </div>
            <div className="profile-intro__desc">
                <div className="intro-desc">
                    <p className="intro-desc__title">Introduction</p>
                    <p className="intro-desc__txt">
                        Cuộc đời này đã mang tôi tới đây
                    </p>
                    <div className="intro-desc__divider"></div>
                    <ul className="intro-desc__extras">
                        <li className="intro-desc__extra">
                            <Image src="/icon/map_v2.svg" className="intro-desc__extra-icon" />
                            <p className="intro-desc__extra-txt">
                                <span>Sống tại&nbsp;</span>
                                <strong>Hà Nội, Việt Nam</strong>
                            </p>
                        </li>
                        <li className="intro-desc__extra">
                            <Image src="/icon/home.svg" className="intro-desc__extra-icon" />
                            <p className="intro-desc__extra-txt">
                                <span>Đến từ&nbsp;</span>
                                <strong>Hà Giang Việt Nam</strong>
                            </p>
                        </li>
                        <li className="intro-desc__extra">
                            <Image src="/icon/time.svg" className="intro-desc__extra-icon" />
                            <p className="intro-desc__extra-txt">
                                <span>Tham gia&nbsp;</span>
                                <strong>Tháng 7, 2020</strong>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="profile-intro__images intro-images">
                <div className="intro-images__header">
                    <p className="intro-images__title">Images</p>
                    <Link to="/">See all images</Link>
                </div>
                <div className="intro-images__gallery">
                    <Image src="/icon/bad-lucker-2.svg" className="intro-images__gallery-item" />
                    <Image src="/icon/bad-lucker-6.svg" className="intro-images__gallery-item" />
                    <Image src="/icon/bad-lucker-4.svg" className="intro-images__gallery-item" />
                    <Image src="/icon/bad-lucker-5.svg" className="intro-images__gallery-item" />
                </div>
            </div>
        </div>
    )
}

export default ProfileIntroduction;
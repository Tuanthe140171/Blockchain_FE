import { Image } from "antd";
import React from "react";

import ProfileIntroduction from "./components/ProfileIntroduction";
import ProfileSocial from "./components/ProfileSocial";
import ProfileDonation from "./components/ProfileDonation";

import "./index.scss";

const ProfilePage: React.FC = () => {
    return (
        <div className="profile">
            <div className="profile__img-bg">
                <Image src="/icon/testing.jpg" />
            </div>
            <div className="profile__content">
                <ProfileIntroduction />
                <ProfileSocial />
                <ProfileDonation />
            </div>
        </div>
    )
}

export default ProfilePage;
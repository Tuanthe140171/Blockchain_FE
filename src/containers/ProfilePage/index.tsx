import { Image } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

import ProfileIntroduction from "./components/ProfileIntroduction";
import ProfileSocial from "./components/ProfileSocial";
import ProfileDonation from "./components/ProfileDonation";
import ProfileFollowing from "./components/ProfileFollowing";

import "./index.scss";

// const IS_ADMIN = 

const ProfilePage: React.FC = () => {
    const { id } = useParams();
    const isAdmin = parseInt(id || "1") % 2 === 0 ? true: false;

    return ( 
        <div className="profile">
            <div className="profile__img-bg">
                <Image src="/icon/testing.jpg" />
            </div>
            <div className="profile__content">
                <ProfileIntroduction isOwner={isAdmin} />
                <ProfileSocial />
                {
                    isAdmin ? <ProfileFollowing /> : <ProfileDonation />
                }
            </div>
        </div>
    )
}

export default ProfilePage;
import React from "react";
import YourFollowers from "./components/YourFollowers";
import YourFollowing from "./components/YourFollowing";

import "./index.scss";

const ProfileFollowing: React.FC = () => {
    return (
        <div className="following">
            <YourFollowing />
            <YourFollowers />
        </div>
    )
}

export default ProfileFollowing;
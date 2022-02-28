import React from 'react'
import ProfileSocialPost from "../ProfileSocialPost";

import "./index.scss";


const ProfileSocialPosts: React.FC = (props) => {
    const posts = [
        {
            images: [],
            poster: {
                name: "Nguyễn Minh Chí",
                avatar: "/icon/user-admin.svg"
            },
            timestamp: "20 h",
            content: `A woman is an adult female human.[1][2] Prior to adulthood, a female human is referred to as a girl (a female child or adolescent).[3] The plural women is sometimes used in certain phrases such as "women's rights" to denote female humans regardless of age.`,
            contentShortcut: `A woman is an adult female human.[1][2] Prior to adulthood, a female human is referred to as a girl (a female child or adolescent).[3] The plural women is sometimes used in certain phrases such as "women's rights" to denote female humans regardless of age.`,
            likes: 88,
            comments: 4
        },
        {
            images: ["/icon/bad-lucker-2.svg", "/icon/bad-lucker-5.svg", "/icon/bad-lucker-6.svg", "/icon/bad-lucker-6.svg"],
            poster: {
                name: "Nguyễn Minh Chí",
                avatar: "/icon/user-admin.svg"
            },
            timestamp: "20 h",
            content: `A woman is an adult female human.[1][2] Prior to adulthood, a female human is referred to as a girl (a female child or adolescent).[3] The plural women is sometimes used in certain phrases such as "women's rights" to denote female humans regardless of age.`,
            contentShortcut: ``,
            likes: 88,
            comments: 4
        }
    ]

    return (
        <div className="profile-social__posts">
            {
                posts.map(post => {
                    const { images, poster, timestamp, content, contentShortcut, likes, comments } = post;
                    return (
                        <ProfileSocialPost
                            images={images}
                            poster={poster}
                            timestamp={timestamp}
                            content={content}
                            contentShortcut={contentShortcut}
                            likes={likes}
                            comments={comments}
                            seeMore={contentShortcut.length > 0}
                        />
                    )
                })
            }
        </div>
    )
}

export default ProfileSocialPosts
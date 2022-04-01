import React, { useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../../../../../hooks/useFetch";
import ProfileSocialPost from "../ProfileSocialPost";

import "./index.scss";

const ProfileSocialPosts: React.FC = (props) => {
  const { userData, badluckerType } = useSelector(
    (state: any) => state.userLayout
  );
  const [postList, setPostList] = useState([]);
  const avatarLink = userData?.UserMedia.find(
    (media: any) => media.type === "1" && media.active === 1
  )
    ? userData?.UserMedia.find(
        (media: any) => media.type === "1" && media.active === 1
      ).link
    : "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";

  const getTimeDiff = (time: any) => {
    var now = new Date();
    var then = new Date(time);
    return "20h";
  };

  const { data: userPost } = useFetch<any>(
    "post/get-post-all-time?limit=10&offset=0",
    {},
    false,
    [],
    { method: "GET" },
    (e) => {
      const formatPosts = e.data.map((post: any) => {
        return {
          images: post.PostMedia?.map((p: any) => {
            return p.link;
          }),
          poster: {
            name: `${userData?.lastName ? userData?.lastName : "Người"} ${
              userData?.name ? userData?.name : "dùng"
            }`,
            avatar: avatarLink,
          },
          timestamp: getTimeDiff(post.createDate),
          content: post.content,
          contentShortcut: post.content?.substring(0, 200),
          likes: 100,
          comments: 0,
        };
      });

      setPostList(formatPosts);
    }
  );

  const posts = [
    {
      images: [],
      poster: {
        name: "Nguyễn Minh Chí",
        avatar: "/icon/user-admin.svg",
      },
      timestamp: "20 h",
      content: `A woman is an adult female human.[1][2] Prior to adulthood, a female human is referred to as a girl (a female child or adolescent).[3] The plural women is sometimes used in certain phrases such as "women's rights" to denote female humans regardless of age.`,
      contentShortcut: `A woman is an adult female human.[1][2] Prior to adulthood, a female human is referred to as a girl (a female child or adolescent).[3] The plural women is sometimes used in certain phrases such as "women's rights" to denote female humans regardless of age.`,
      likes: 88,
      comments: 4,
    },
    {
      images: [
        "/icon/bad-lucker-2.svg",
        "/icon/bad-lucker-5.svg",
        "/icon/bad-lucker-6.svg",
        "/icon/bad-lucker-6.svg",
      ],
      poster: {
        name: "Nguyễn Minh Chí",
        avatar: "/icon/user-admin.svg",
      },
      timestamp: "20 h",
      content: `A woman is an adult female human.[1][2] Prior to adulthood, a female human is referred to as a girl (a female child or adolescent).[3] The plural women is sometimes used in certain phrases such as "women's rights" to denote female humans regardless of age.`,
      contentShortcut: ``,
      likes: 88,
      comments: 4,
    },
  ];

  return (
    <div className="profile-social__posts">
      {postList.map((post, index) => {
        const {
          images,
          poster,
          timestamp,
          content,
          contentShortcut,
          likes,
          comments,
        } = post;
        return (
          <React.Fragment key={content + index}>
            <ProfileSocialPost
              images={images}
              poster={poster}
              timestamp={timestamp}
              content={content}
              contentShortcut={contentShortcut}
              likes={likes}
              comments={comments}
              seeMore={contentShortcut}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProfileSocialPosts;

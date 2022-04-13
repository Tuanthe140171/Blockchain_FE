import React, { useState } from "react";
import { Avatar, Image } from "antd";
import "./index.scss";
import { ReactPictureGrid } from "react-picture-grid";
import { useSelector } from "react-redux";
import {
  HeartFilled,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import useFetch from "../../../../../../hooks/useFetch";

export type ProfileSocialPostProps = {
  images: [];
  timestamp: string;
  content: string;
  contentShortcut: string;
  seeMore: boolean;
  likes: number;
  id: string;
  isLike: boolean;
};

const ProfileSocialPost: React.FC<ProfileSocialPostProps> = (props) => {
  const {
    images,
    timestamp,
    content,
    contentShortcut,
    likes,
    id,
    isLike: liked,
  } = props;
  const [seeMore, setSeeMore] = useState(false);
  const { userPostData: userData } = useSelector(
    (state: any) => state.userPostData
  );
  const avatarLink = userData?.UserMedia?.find(
    (media: any) => media.type === "1" && media.active === 1
  )
    ? userData?.UserMedia?.find(
        (media: any) => media.type === "1" && media.active === 1
      ).link
    : "/icon/AvatarTmp.png";

  const [likeCount, setLikeCount] = useState(likes);

  const getUserName = () => {
    let name = userData?.name;
    let lastName = userData?.lastName;
    if (!userData?.lastName && !userData?.name) {
      return "Người dùng";
    }
    if (!userData?.lastName) {
      lastName = "";
    }
    if (!userData?.name) {
      name = "";
    }
    return `${lastName} ${name}`;
  };

  const [isLike, setIsLike] = useState<boolean>(liked);
  const [like, setLike] = useState<any>(undefined);
  const [dislike, setDislike] = useState<any>(undefined);

  const { data: dislikeData } = useFetch<any>(
    "post/like-pages",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [dislike],
    {
      method: "POST",
      body: JSON.stringify({
        id: id,
        isLike: false,
      }),
    },
    (e) => {
      setDislike(undefined);
      setIsLike(false);
      setLikeCount(e.data.likeCount);
    }
  );

  const { data: likeData } = useFetch<any>(
    "post/like-pages",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [like],
    {
      method: "POST",
      body: JSON.stringify({
        id: id,
        isLike: true,
      }),
    },
    (e) => {
      setLike(undefined);
      setIsLike(true);
      setLikeCount(e.data.likeCount);
    }
  );

  return (
    <div className="profile-post" key={props.content}>
      <div className="profile-post__poster">
        <Avatar src={avatarLink} className="poster__avatar" />
        <div className="poster__info">
          <p className="poster__name">{getUserName()}</p>
          <div className="poster__timestamp">
            <span>{timestamp}</span>
            <Image
              src="/icon/globe.svg"
              className="poster__timestamp-icon"
              preview={false}
            />
          </div>
        </div>
      </div>
      <div className="profile-post__content">
        {contentShortcut?.length > 0 && !seeMore ? contentShortcut : content}
      </div>
      {contentShortcut?.length < content?.length && (
        <div
          className="profile-post__see-more"
          onClick={() => setSeeMore(true)}
        >
          <span>... Xem thêm</span>
        </div>
      )}
      {images.length > 0 && (
        <div className="profile-post__images">
          {
            <ReactPictureGrid
              data={images}
              showTitle={false}
              gap={10}
              showPreview
              closeOnClick
            />
          }
        </div>
      )}
      {/* <div className="profile-post__metrics">
        <div className="metrics__likes">
          <Image src="/icon/1.svg" preview={false} />
          <Image src="/icon/2.svg" preview={false} />
          <Image src="/icon/3.svg" preview={false} />
          <span>{likeCount}</span>
        </div>
      </div> */}
      <div className="profile-post__divider"></div>
      <div className="profile-post__cta">
        <div
          className="cta__like"
          onClick={() => {
            if (isLike) {
              setDislike(true);
            } else {
              setLike(true);
            }
          }}
        >
          {isLike ? <HeartFilled /> : <HeartOutlined />}
          <span className="cta__like-txt">Thích</span>
        </div>
        <div className="cta__share">
          {likeCount === 0
            ? "Hãy là người đầu tiên thích bài viết này"
            : `Có ${likeCount} người thích bài viết của bạn`}
        </div>
      </div>
    </div>
  );
};

export default ProfileSocialPost;

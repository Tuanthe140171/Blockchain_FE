import React, { useState } from "react";
import { Avatar, Image } from "antd";
import "./index.scss";
import { ReactPictureGrid } from "react-picture-grid";
import { useSelector } from "react-redux";

export type ProfileSocialPostProps = {
  images: [];
  timestamp: string;
  content: string;
  contentShortcut: string;
  seeMore: boolean;
  likes: number;
};

const ProfileSocialPost: React.FC<ProfileSocialPostProps> = (props) => {
  const [seeMore, setSeeMore] = useState(false);
  const { userPostData: userData } = useSelector(
    (state: any) => state.userPostData
  );

  const { images, timestamp, content, contentShortcut, likes } = props;

  const avatarLink = userData?.UserMedia?.find(
    (media: any) => media.type === "1" && media.active === 1
  )
    ? userData?.UserMedia?.find(
        (media: any) => media.type === "1" && media.active === 1
      ).link
    : "/icon/AvatarTmp.png";

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

  return (
    <div className="profile-post" key={props.content}>
      <div className="profile-post__poster">
        <Avatar src={avatarLink} className="poster__avatar" />
        <div className="poster__info">
          <p className="poster__name">{getUserName()}</p>
          <div className="poster__timestamp">
            <span>{timestamp}</span>
            <Image src="/icon/globe.svg" className="poster__timestamp-icon" />
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
          <span>... see more</span>
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
      <div className="profile-post__metrics">
        <div className="metrics__likes">
          <Image src="/icon/1.svg" preview={false} />
          <Image src="/icon/2.svg" preview={false} />
          <Image src="/icon/3.svg" preview={false} />
          <span>{likes}</span>
        </div>
      </div>
      <div className="profile-post__divider"></div>
      <div className="profile-post__cta">
        <div className="cta__like">
          <Image src="/icon/like.svg" className="cta__icon cta__like-icon" />
          <span className="cta__like-txt">Like</span>
        </div>
        <div className="cta__share">
          <Image src="/icon/share.svg" className="cta__icon cta__share-icon" />
          <span className="cta__share-txt">Share</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSocialPost;

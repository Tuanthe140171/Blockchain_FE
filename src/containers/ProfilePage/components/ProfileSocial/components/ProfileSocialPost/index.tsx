import React, { useState } from "react";
import { Avatar, Image } from "antd";
import "./index.scss";
import { ReactPictureGrid } from "react-picture-grid";

export type ProfileSocialPostProps = {
  images: [];
  poster: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  content: string;
  contentShortcut: string;
  seeMore: boolean;
  likes: number;
  comments: number;
};

const ProfileSocialPost: React.FC<ProfileSocialPostProps> = (props) => {
  const [seeMore, setSeeMore] = useState(false);

  const {
    images,
    poster,
    timestamp,
    content,
    contentShortcut,
    likes,
    comments,
  } = props;

  // const customRenderImage = () => {
  //   if (images.length === 1) {
  //     return (
  //       <div className="profile-post__images__one">
  //         <Image
  //           preview={true}
  //           // width={200}
  //           src={images[0]}
  //           // onClick={() => setVisible(true)}
  //         />
  //       </div>
  //     );
  //   } else if (images.length === 2) {
  //     return (
  //       <div className="profile-post__images__two">
  //         <Image
  //           preview={true}
  //           src={images[0]}
  //           // onClick={() => setVisible(true)}
  //         />
  //         <Image
  //           preview={true}
  //           // width={200}
  //           src={images[1]}
  //           // onClick={() => setVisible(true)}
  //         />
  //       </div>
  //     );
  //   } else if (images.length === 3) {
  //     return (
  //       <div className="profile-post__images__three">
  //         <Image
  //           preview={true}
  //           src={images[0]}
  //           // onClick={() => setVisible(true)}
  //         />{" "}
  //         <div>
  //           <Image
  //             preview={true}
  //             src={images[1]}
  //             // onClick={() => setVisible(true)}
  //           />
  //           <Image
  //             preview={true}
  //             src={images[2]}
  //             // onClick={() => setVisible(true)}
  //           />{" "}
  //         </div>
  //       </div>
  //     );
  //   } else if (images.length === 4) {
  //     return (
  //       <div className="profile-post__images__four">
  //         <div>
  //           <Image
  //             preview={true}
  //             src={images[1]}
  //             // onClick={() => setVisible(true)}
  //           />{" "}
  //           <Image
  //             preview={true}
  //             src={images[2]}
  //             // onClick={() => setVisible(true)}
  //           />{" "}
  //         </div>
  //         <div>
  //           <Image
  //             preview={true}
  //             src={images[3]}
  //             // onClick={() => setVisible(true)}
  //           />{" "}
  //           <Image
  //             preview={true}
  //             src={images[4]}
  //             // onClick={() => setVisible(true)}
  //           />{" "}
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="profile-post__images__five">
  //         <div>
  //           <Image
  //             preview={true}
  //             src={images[0]}
  //             // onClick={() => setVisible(true)}
  //           />{" "}
  //           <Image
  //             preview={true}
  //             src={images[0]}
  //             // onClick={() => setVisible(true)}
  //           />{" "}
  //         </div>
  //         <div>
  //           <Image
  //             preview={true}
  //             src={images[0]}
  //             // onClick={() => setVisible(true)}
  //           />{" "}
  //           <Image
  //             preview={true}
  //             src={images[0]}
  //             // onClick={() => setVisible(true)}
  //           />{" "}
  //         </div>
  //       </div>
  //     );
  //   }
  // };

  return (
    <div className="profile-post" key={props.content}>
      <div className="profile-post__poster">
        <Avatar src={poster.avatar} className="poster__avatar" />
        <div className="poster__info">
          <p className="poster__name">{poster.name}</p>
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
              showTitle
              gap={10}
            />
          }
        </div>
        // <div className="profile-post__images">{customRenderImage()}</div>
      )}
      <div className="profile-post__metrics">
        <div className="metrics__likes">
          <Image src="/icon/1.svg" preview={false} />
          <Image src="/icon/2.svg" preview={false} />
          <Image src="/icon/3.svg" preview={false} />
          <span>{likes}</span>
        </div>
        <span className="metrics__comments">{comments} comments</span>
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

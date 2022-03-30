import {
  CommentOutlined,
  DeleteOutlined,
  DownloadOutlined,
  HeartOutlined,
  PictureOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Image, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./index.scss";

const ProfileSocialMedia = () => {
  const { userData } = useSelector((state: any) => state.userLayout);

  // console.log(userData?.UserMedia);

  // useEffect(()=>{
  //   if(userData){

  //   }
  // }, [userData])

  const listImage = [
    {
      id: 0,
      url: "/icon/badlucker-demo.jpg",
      like: 69,
      comment: 20,
      share: 120,
    },
    {
      id: 1,
      url: "/icon/badlucker-demo.jpg",
      like: 1300,
      comment: 60,
      share: 10,
    },
    {
      id: 2,
      url: "/icon/badlucker-demo.jpg",
      like: 1509,
      comment: 980,
      share: 1150,
    },
    {
      id: 3,
      url: "/icon/badlucker-demo.jpg",
      like: 96,
      comment: 210,
      share: 180,
    },
    {
      id: 4,
      url: "/icon/badlucker-demo.jpg",
      like: 96,
      comment: 210,
      share: 180,
    },
    {
      id: 5,
      url: "/icon/badlucker-demo.jpg",
      like: 124,
      comment: 210,
      share: 180,
    },
    {
      id: 6,
      url: "/icon/badlucker-demo.jpg",
      like: 21,
      comment: 420,
      share: 10,
    },
    {
      id: 7,
      url: "/icon/badlucker-demo.jpg",
      like: 961,
      comment: 20,
      share: 180,
    },
    {
      id: 8,
      url: "/icon/badlucker-demo.jpg",
      like: 96,
      comment: 2410,
      share: 180,
    },
  ];

  const renderOptions = () => {
    return (
      <div className="profile-media__popup-option__wrapper">
        <div className="profile-media__popup-option__wrapper__body">
          <div>
            <DownloadOutlined className="icon" />
            <div>Tải ảnh xuống</div>
          </div>
          <div>
            <UserOutlined className="icon" />
            <div>Đặt làm ảnh đại diện</div>
          </div>
          <div>
            <PictureOutlined className="icon" />
            <div>Đặt làm ảnh bìa</div>
          </div>
        </div>
        <hr />
        <div className="profile-media__popup-option__wrapper__footer">
          <DeleteOutlined className="icon" />
          <div>Xóa ảnh</div>
        </div>
      </div>
    );
  };

  const [activeImage, setActiveImage] = useState<any>(null);
  const [isFocusItem, setIsFocusItem] = useState<any>(null);

  const renderImage = () => {
    return listImage.map((image, index) => {
      return (
        <div
          className="profile-media__images__image"
          onMouseOver={() => setActiveImage(index)}
          onMouseLeave={() => setActiveImage(null)}
          key={image.id}
        >
          <Image
            src="/icon/badlucker-demo.jpg"
            className="profile-media__images__image__pic"
            preview
          />
          <div
            className={`profile-media__images__image__mask ${
              activeImage === index ? "" : "hidden"
            }`}
          >
            <Popover
              placement="bottomRight"
              title={null}
              content={renderOptions()}
              trigger="click"
              overlayClassName="profile-media__popup-option"
            >
              <div onClick={() => setIsFocusItem(index)}>...</div>
            </Popover>
            <div className="profile-media__images__image__mask__info">
              <div>
                <HeartOutlined className="icon" />
                <div>{image.like}</div>
              </div>
              <div>
                <CommentOutlined className="icon" />
                <div>{image.comment}</div>
              </div>
              <div>
                <ShareAltOutlined className="icon" />
                <div>{image.share}</div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="profile-media">
      <header className="profile-media__header">
        <p className="profile-media__header__title">Media</p>
      </header>
      <div className="profile-media__divider" />
      <div className="profile-media__images">{renderImage()}</div>
    </div>
  );
};

export default ProfileSocialMedia;

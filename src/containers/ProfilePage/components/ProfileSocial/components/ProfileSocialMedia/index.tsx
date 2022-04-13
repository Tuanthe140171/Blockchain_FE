import {
  DeleteOutlined,
  DownloadOutlined,
  HeartOutlined,
  PictureOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Image, Popover } from "antd";
import React, { useEffect, useState } from "react";
import useFetch from "../../../../../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../../../../stores/action/user-layout.action";
import "./index.scss";
import AppDialog from "../../../../../../components/AppDialog";
import AppLoading from "../../../../../../components/AppLoading";
import { useParams } from "react-router-dom";
import { getUserPostData } from "../../../../../../stores/action/user-post.action";

const ProfileSocialMedia = () => {
  const { userPostData: userData } = useSelector(
    (state: any) => state.userPostData
  );
  const [listImage, setListImage] = useState([]);
  const [dataUpdateAva, setDataUpdateAva] = useState<any>(undefined);
  const { id } = useParams();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const formatList = userData?.UserMedia?.map((data: any) => ({
      id: data.id,
      url: data.link,
      like: 100,
    }));
    setListImage(formatList);
  }, []);

  const { data: submitImg, loading } = useFetch<any>(
    "users/update-user-profile",
    {
      "Content-Type": "application/json",
    },
    false,
    [dataUpdateAva],
    {
      method: "POST",
      body: JSON.stringify(dataUpdateAva),
    },
    (e) => {
      setDataUpdateAva(undefined);
      const action = getUserById(e.data);
      dispatch(action);
      const action_2 = getUserPostData(e.data);
      dispatch(action_2);
      setOpenDialog(true);
    }
  );

  const handleSetAvatar = (url: string) => {
    setDataUpdateAva({ ...userData, image: [{ link: url, type: "1" }] });
  };

  const renderOptions = (image: any) => {
    return (
      <div className="profile-media__popup-option__wrapper">
        <div className="profile-media__popup-option__wrapper__body">
          <div>
            <DownloadOutlined className="icon" />
            <div>Tải ảnh xuống</div>
          </div>
          <div onClick={() => handleSetAvatar(image.url)}>
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
    return listImage?.map((image: any, index) => {
      return (
        <div
          className="profile-media__images__image"
          onMouseOver={() => setActiveImage(index)}
          onMouseOut={() => {
            if (!isFocusItem) {
              setActiveImage(false);
            }
          }}
          key={image.url + index}
        >
          <Image
            src={image.url}
            className="profile-media__images__image__pic"
            preview
          />
          {id ? null : (
            <div
              className={`profile-media__images__image__mask ${
                activeImage === index ? "" : "hidden"
              }`}
            >
              <Popover
                placement="bottomRight"
                title={null}
                content={renderOptions(image)}
                trigger="click"
                overlayClassName="profile-media__popup-option"
                onVisibleChange={(e) => {
                  setActiveImage(e);
                  setIsFocusItem(e);
                }}
              >
                <div onClick={() => setIsFocusItem(index)}>...</div>
              </Popover>
              <div className="profile-media__images__image__mask__info">
                <div>
                  <HeartOutlined className="icon" />
                  <div>{image.like}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <AppDialog
        type="infor"
        title={"Cập nhật ảnh đại diện thành công"}
        confirmText={"Ok"}
        onConfirm={() => {
          setOpenDialog(false);
        }}
        onCancel={() => setOpenDialog(false)}
        visible={openDialog}
      />
      {loading && (
        <AppLoading loadingContent={<div></div>} showContent={false} />
      )}
      <div className="profile-media">
        <header className="profile-media__header">
          <p className="profile-media__header__title">Ảnh</p>
        </header>
        <div className="profile-media__divider" />
        <div className="profile-media__images">{renderImage()}</div>
      </div>
    </>
  );
};

export default ProfileSocialMedia;

import React, { useEffect, useState } from "react";
import { Button, Image, Upload } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { getUserPostData } from "../../stores/action/user-post.action";
import ProfileIntroduction from "./components/ProfileIntroduction";
import ProfileSocial from "./components/ProfileSocial";
import ProfileDonation from "./components/ProfileDonation";
import ProfileFollowing from "./components/ProfileFollowing";
import useFetch from "../../hooks/useFetch";
import AppDialog from "../../components/AppDialog";
import AppLoading from "../../components/AppLoading";
import "./index.scss";

const dummyRequest = ({ file, onSuccess }: any) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const { userData } = useSelector((state: any) => state.userLayout);
  const { userPostData } = useSelector((state: any) => state.userPostData);
  const { userPostBanner } = useSelector((state: any) => state.userPostData);
  const [callWithParam, setCallWithParam] = useState<any>(undefined);
  const [callWithoutParam, setCallWithoutParam] = useState<any>(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [bannerLink, setBannerLink] = useState<any>(
    userPostData?.UserMedia?.find(
      (media: any) => media.type === "2" && media.active === 1
    )
      ? userPostData?.UserMedia?.find(
          (media: any) => media.type === "2" && media.active === 1
        ).link
      : "/icon/testing.jpg"
  );
  const [originLink, setOriginLink] = useState<any>(
    userPostData?.UserMedia?.find(
      (media: any) => media.type === "2" && media.active === 1
    )
      ? userPostData?.UserMedia?.find(
          (media: any) => media.type === "2" && media.active === 1
        ).link
      : "/icon/testing.jpg"
  );

  console.log(bannerLink, "banner");
  console.log(originLink, "origin");

  useEffect(() => {
    if (userData?.id) {
      if (id && id !== userData.id) {
        setCallWithParam(true);
      } else {
        setCallWithoutParam(true);
      }
    }
  }, [id, userData]);

  useEffect(() => {
    if (userData && id === userData.id) {
      navigate("/profile/");
    }
  }, [userData]);

  const { data: userWithParam, loading: loadingGetUserWithParam } =
    useFetch<any>(
      `users/get-user-by-id-with-params/${id}`,
      {},
      false,
      [callWithParam],
      { method: "GET" },
      (e) => {
        setCallWithParam(undefined);
        const action = getUserPostData(e.data);
        dispatch(action);
        setBannerLink(
          e.data.UserMedia?.find(
            (media: any) => media.type === "2" && media.active === 1
          )?.link
            ? e.data.UserMedia?.find(
                (media: any) => media.type === "2" && media.active === 1
              )?.link
            : "/icon/testing.jpg"
        );
        setOriginLink(
          e.data.UserMedia?.find(
            (media: any) => media.type === "2" && media.active === 1
          )?.link
            ? e.data.UserMedia?.find(
                (media: any) => media.type === "2" && media.active === 1
              )?.link
            : "/icon/testing.jpg"
        );
      }
    );

  const { data: userWithoutParam, loading: loadingGetUserWithoutParam } =
    useFetch<any>(
      "users/get-user-by-id",
      {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      false,
      [callWithoutParam],
      { method: "GET" },
      (e) => {
        setCallWithoutParam(undefined);
        const action = getUserPostData(e.data);
        dispatch(action);
        setBannerLink(
          e.data.UserMedia?.find(
            (media: any) => media.type === "2" && media.active === 1
          )
            ? e.data.UserMedia?.find(
                (media: any) => media.type === "2" && media.active === 1
              ).link
            : "/icon/testing.jpg"
        );
        setOriginLink(
          e.data.UserMedia?.find(
            (media: any) => media.type === "2" && media.active === 1
          )?.link
            ? e.data.UserMedia?.find(
                (media: any) => media.type === "2" && media.active === 1
              )?.link
            : "/icon/testing.jpg"
        );
      }
    );

  const [openTabMedia, setOpenTabMedia] = useState(false);
  const handleOpenMedia = () => {
    setOpenTabMedia(true);
  };
  const handleCloseMedia = () => {
    setOpenTabMedia(false);
  };

  const [isUpload, setIsUpload] = useState(false);
  const [isSubmit, setIsSubmit] = useState<any>(undefined);

  const [tempFileUpload, setTempFileUpload] = useState<any>(undefined);
  const onChange = ({ fileList: newFileList }: any) => {
    const data = new FormData();
    data.append("files", newFileList[0].originFileObj);
    setTempFileUpload(data);
  };

  const { data: uploadImg, loading: loadingUpload } = useFetch<any>(
    "image/upload-multiple-file",
    {},
    false,
    [tempFileUpload],
    {
      method: "POST",
      body: tempFileUpload,
    },
    (e) => {
      setTempFileUpload(undefined);
      setBannerLink(e.data[0]);
      setIsUpload(true);
    }
  );

  const { data: deleteImgData, loading: loadingDeleteImg } = useFetch<any>(
    "users/update-image",
    {
      "Content-Type": "application/json",
    },
    false,
    [isSubmit],
    {
      method: "POST",
      body: JSON.stringify({
        type: 2,
        imageList: [
          {
            action: "insert",
            link: bannerLink,
            active: 1,
          },
        ],
      }),
    },
    (e) => {
      // console.log(e.data);
      setIsUpload(false);
      setIsSubmit(undefined);
      setOpenDialog(true);
    }
  );

  useEffect(() => {
    if (userPostBanner) {
      setOriginLink(bannerLink);
      setBannerLink(userPostBanner);
      setIsUpload(true);
    }
  }, [userPostBanner]);

  return (
    <>
      {(loadingDeleteImg ||
        loadingGetUserWithParam ||
        loadingGetUserWithoutParam ||
        loadingUpload) && (
        <AppLoading showContent={false} loadingContent={<div></div>} />
      )}
      <AppDialog
        type="infor"
        title={"Cập nhật ảnh bìa thành công!"}
        confirmText={"Ok"}
        onConfirm={() => {
          setOpenDialog(false);
        }}
        onCancel={() => setOpenDialog(false)}
        visible={openDialog}
      />
      <div className="profile">
        <div className="profile__img-bg">
          <Image src={bannerLink} />
          {id ? null : isUpload ? (
            <div
              style={{ position: "absolute", right: "15px", bottom: "15px" }}
            >
              <Button
                onClick={() => {
                  setBannerLink(originLink);
                  setIsUpload(false);
                }}
                style={{ marginRight: "10px", borderRadius: "15px" }}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                onClick={() => setIsSubmit(true)}
                style={{ borderRadius: "15px" }}
              >
                Lưu
              </Button>
            </div>
          ) : (
            <Upload
              name="logo"
              maxCount={1}
              defaultFileList={[]}
              onChange={onChange}
              className="profile__img-bg__upload-bg"
              isImageUrl={(file: any) => true}
              customRequest={dummyRequest}
              showUploadList={false}
            >
              <Button
                type="ghost"
                icon={<UploadOutlined />}
                className="profile__img-bg__upload-bg__button"
              >
                Tải ảnh bìa
              </Button>
            </Upload>
          )}
        </div>
        <div className="profile__content">
          <ProfileIntroduction isOwner={!id} openTabMedia={handleOpenMedia} />
          <ProfileSocial
            openTabMedia={openTabMedia}
            canCloseMedia={handleCloseMedia}
          />
          {!id ? (
            <ProfileFollowing />
          ) : (
            <ProfileDonation
              donation={
                userWithParam
                  ? {
                      image: (function () {
                        const userAvatar = userWithParam.UserMedia.filter(
                          (userMedia: any) =>
                            userMedia.type === "1" && userMedia.active === 1
                        )
                          .slice(-1)
                          .pop();
                        return userAvatar
                          ? userAvatar.link
                          : "/icon/bad-lucker.svg";
                      })(),
                      name: userWithParam.name,
                      walletAddress: userWithParam.walletAddress,
                      id: userWithParam.id,
                    }
                  : undefined
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

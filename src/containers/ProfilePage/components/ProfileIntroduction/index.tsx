import { Avatar, Button, Image, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppDialog from "../../../../components/AppDialog";
import AppLoading from "../../../../components/AppLoading";
import useFetch from "../../../../hooks/useFetch";
import "./index.scss";

type ProfileIntroductionProps = {
  isOwner: boolean;
  openTabMedia: any;
};

const ProfileIntroduction: React.FC<ProfileIntroductionProps> = (props) => {
  const { id } = useParams();
  const { isOwner, openTabMedia } = props;
  const { userPostData: userData } = useSelector(
    (state: any) => state.userPostData
  );
  const { badluckerType } = useSelector((state: any) => state.userLayout);
  const navigate = useNavigate();
  const avatarLink = userData?.UserMedia?.find(
    (media: any) => media.type === "1" && media.active === 1
  )
    ? userData?.UserMedia?.find(
        (media: any) => media.type === "1" && media.active === 1
      ).link
    : "/icon/AvatarTmp.png";

  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [unfollow, setUnfollow] = useState<any>(undefined);
  const [follow, setFollow] = useState<any>(undefined);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [titleDialog, setTitleDialog] = useState("");

  const { data: followingData, loading: loadingFollowing } = useFetch<any>(
    "users/get-following-people",
    {},
    false,
    [],
    { method: "GET" },
    (e) => {
      const list = e.data.rows.map((row: any) => row.userIdTo);
      setIsFollowing(list.includes(id));
    }
  );

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

  const getDate = () => {
    if (userData?.createDate) {
      const today = new Date(userData?.createDate);
      const yyyy = today.getFullYear();
      const mm = today.toLocaleString("default", { month: "long" });
      return `${mm}, ${yyyy}`;
    } else {
      return 2022;
    }
  };

  const { data: unfollowData, loading: loadingUnfollow } = useFetch<any>(
    "users/follow-people",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [unfollow],
    {
      method: "POST",
      body: JSON.stringify({
        id: id,
        enable: false,
      }),
    },
    (e) => {
      setUnfollow(undefined);
      setOpenConfirmDialog(false);
      setTitleDialog("Hủy theo dõi thành công!");
      setOpenDialog(true);
    }
  );

  const { data: followData, loading: loadingFollow } = useFetch<any>(
    "users/follow-people",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [follow],
    {
      method: "POST",
      body: JSON.stringify({
        id: id,
        enable: true,
      }),
    },
    (e) => {
      setFollow(undefined);
      setIsFollowing(true);
    }
  );

  const handleFollowUser = () => {
    if (isFollowing) {
      setOpenConfirmDialog(true);
    } else {
      setFollow(true);
    }
  };

  const getSituation = () => {
    if (userData?.BadLuckTypes?.length === 0) {
      return "";
    } else {
      return badluckerType?.find(
        (type: any) => type.id === userData?.BadLuckTypes[0].situationId
      )?.name;
    }
  };

  const [canWrite, setCanWrite] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [isUpdateDes, setIsUpdateDes] = useState<any>(undefined);
  useEffect(() => {
    if (userData) {
      setDescription(userData.description);
    }
  }, [userData]);

  const { data: updateDes, loading: loadingUpdateDes } = useFetch<any>(
    "users/update-description",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [isUpdateDes],
    {
      method: "PUT",
      body: JSON.stringify({ description: description }),
    },
    (e) => {
      setIsUpdateDes(undefined);
      setCanWrite(!canWrite);
      setTitleDialog("Cập nhật giới thiệu thành công!");
      setOpenDialog(true);
    }
  );

  return (
    <>
      <AppDialog
        type="confirm"
        title={`Bạn chắc chắn muốn hủy theo dõi người này không?`}
        confirmText={"Hủy theo dõi"}
        cancelText={"Đóng"}
        onConfirm={() => {
          setUnfollow(true);
        }}
        onClose={() => {
          setOpenConfirmDialog(false);
        }}
        visible={openConfirmDialog}
        onCancel={() => setOpenConfirmDialog(false)}
      />
      <AppDialog
        type="infor"
        title={titleDialog}
        confirmText={"Đóng"}
        onConfirm={() => {
          setIsFollowing(false);
          setOpenDialog(false);
        }}
        onCancel={() => setOpenDialog(false)}
        visible={openDialog}
      />
      {(loadingFollow ||
        loadingUnfollow ||
        loadingFollowing ||
        loadingUpdateDes) && (
        <AppLoading loadingContent={<div></div>} showContent={false} />
      )}
      <div className="profile-intro">
        <div className="profile-intro__details">
          <Avatar src={avatarLink} className="profile-intro__avatar" />
          <p className="profile-intro__name">{getUserName()}</p>
          <span className="profile-intro__status">{getSituation()}</span>
          <div
            className="profile-intro__location"
            style={{ display: userData?.currentAddress ? "block" : "none" }}
          >
            <Image
              src="/icon/map.svg"
              className="profile-intro__location-icon"
            />
            <span>{userData?.currentAddress}</span>
          </div>
          <Button
            className="follow-btn"
            onClick={() => {
              isOwner ? navigate("/profile/edit") : handleFollowUser();
            }}
          >
            <Image
              src={
                !isOwner
                  ? isFollowing
                    ? "/icon/tick.svg"
                    : "/icon/plus.svg"
                  : "/icon/edit.svg"
              }
              className="follow-btn__icon"
            />
            <span className="follow-btn__txt">
              {!isOwner
                ? isFollowing
                  ? "Following"
                  : "Follow"
                : "Thông tin cá nhân"}
            </span>
          </Button>
          <div className="profile-intro__metrics">
            <div className="profile-intro__tier profile-intro__metrics-block">
              <p>Tier of Charity</p>
              <span>{userData?.tierCharity ? userData?.tierCharity : 0}%</span>
            </div>
            <div className="profile-intro__divider"></div>
            <div className="profile-intro__trust profile-intro__metrics-block">
              <p>Trust Score</p>
              <span>{userData?.trustScore ? userData?.trustScore : 0}%</span>
            </div>
          </div>
        </div>
        <div className="profile-intro__desc">
          <div className="intro-desc">
            <div className="intro-desc__group">
              <p className="intro-desc__title">Giới thiệu</p>
              {id ? null : (
                <Button
                  onClick={() => {
                    if (canWrite) {
                      setIsUpdateDes(true);
                    } else {
                      setCanWrite(!canWrite);
                    }
                  }}
                  className="intro-desc__button"
                >
                  {canWrite ? "Lưu" : "Sửa"}
                </Button>
              )}
            </div>
            {canWrite ? (
              <Input
                onChange={(e) => setDescription(e.target.value)}
                className="intro-desc__input"
                value={description}
              />
            ) : (
              <p className="intro-desc__txt">{description}</p>
            )}
            <div className="intro-desc__divider"></div>
            <ul className="intro-desc__extras">
              <li
                className="intro-desc__extra"
                style={{ display: userData?.currentAddress ? "flex" : "none" }}
              >
                <Image
                  src="/icon/map_v2.svg"
                  className="intro-desc__extra-icon"
                />
                <p className="intro-desc__extra-txt">
                  <span>Sống tại&nbsp;</span>
                  <strong>{userData?.currentAddress}</strong>
                </p>
              </li>
              <li
                className="intro-desc__extra"
                style={{ display: userData?.baseAddress ? "flex" : "none" }}
              >
                <Image
                  src="/icon/home.svg"
                  className="intro-desc__extra-icon"
                />
                <p className="intro-desc__extra-txt">
                  <span>Đến từ&nbsp;</span>
                  <strong>{userData?.baseAddress}</strong>
                </p>
              </li>
              <li className="intro-desc__extra">
                <Image
                  src="/icon/time.svg"
                  className="intro-desc__extra-icon"
                />
                <p className="intro-desc__extra-txt">
                  <span>Tham gia&nbsp;</span>
                  <strong>{getDate()}</strong>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="profile-intro__images intro-images">
          <div className="intro-images__header">
            <p className="intro-images__title">Ảnh</p>
            <Button className="intro-images__more" onClick={openTabMedia}>
              Xem thêm
            </Button>
          </div>
          <div className="intro-images__gallery">
            {userData?.UserMedia[0]?.link ? (
              <Image
                src={userData?.UserMedia[0]?.link}
                className="intro-images__gallery-item"
              />
            ) : null}
            {userData?.UserMedia[1]?.link ? (
              <Image
                src={userData?.UserMedia[1]?.link}
                className="intro-images__gallery-item"
              />
            ) : null}
            {userData?.UserMedia[2]?.link ? (
              <Image
                src={userData?.UserMedia[2]?.link}
                className="intro-images__gallery-item"
              />
            ) : null}

            {userData?.UserMedia[3]?.link ? (
              <Image
                src={userData?.UserMedia[3]?.link}
                className="intro-images__gallery-item"
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileIntroduction;

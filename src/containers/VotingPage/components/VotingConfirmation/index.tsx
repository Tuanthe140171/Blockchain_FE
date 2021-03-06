import React, { useEffect, useState } from "react";
import { Button, Image, Avatar, message, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import moment from "moment";
// import { useNavigate } from "react-router-dom";
import AppLoading from "../../../../components/AppLoading";
import AppDrawer from "../../../../components/AppDrawer";
import VotingSituationView from "../VotingSituationView";
import useFetch from "../../../../hooks/useFetch";
import AppDialog from "../../../../components/AppDialog";
import "./index.scss";
import { useSelector } from "react-redux";

export type SelectedUser = {
  donee: string;
  dob: string;
  createDate: string;
  address: string;
  currentAddress: string;
  id: string;
  situations: any;
  avatar: string | null;
  identityImages: string[];
  identityPlace: string;
  identityDate: string;
  status: string;
  userId: string;
  isVoted: boolean;
};

type VotingConfirmationProps = {
  visible: boolean;
  onClose?: () => void;
  setConfirmationVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser: SelectedUser | undefined;
  setReloadVotingData: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
};

const VotingConfirmation: React.FC<VotingConfirmationProps> = (props) => {
  const {
    setReloadVotingData,
    selectedUser,
    visible,
    onClose,
    setConfirmationVisible,
  } = props;

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [voteType, setVoteType] = useState<number>(-1);
  const [startVotingUser, setStartVotingUser] = useState<boolean | undefined>(
    undefined
  );
  const userData = useSelector((state: any) => state.userLayout.userData);
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    `votes/donee`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [startVotingUser],
    {
      method: "POST",
      body: JSON.stringify({
        targetId: selectedUser?.userId,
        isAgree: voteType,
      }),
    },
    () => {
      setStartVotingUser(undefined);
      onClose && onClose();
      message.success(
        `Bạn đã ${voteType === 1 ? "xác nhận" : "không xác nhận"
        } thông tin của ${selectedUser?.donee}`,
        4
      );
      setReloadVotingData(true);
    },
    () => {
      setStartVotingUser(undefined);
      setReloadVotingData(true);
    }
  );

  const handleUserConfirm = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    error && message.error(error.message, 4);
  }, [error]);

  return (
    <AppDrawer
      className="voting-confirmation"
      isVisible={visible}
      closeModal={onClose}
      content={
        <>
          <header className="voting-confirmation__header">
            <div
              className="voting-confirmation__back"
              onClick={() => setConfirmationVisible(false)}
            >
              <LeftOutlined />
              <span>Bình chọn hộ nghèo</span>
            </div>
            <Button
              className="voting-confirmation__btn-back"
              disabled={(
                (selectedUser?.isVoted || !userData?.isOnTop)
                  ? true
                  : userData
                    ? (
                      selectedUser?.situations.map((userSituation: any) => userSituation.UserSituationConfirms.map(
                        (userVote: any) => userVote.userId
                      ).indexOf(userData.id) >= 0).reduce((totalConfirmed: number, isConfirmed: boolean) => {
                        if (isConfirmed) totalConfirmed += 1;
                        return totalConfirmed;
                      }, 0) < selectedUser?.situations.length * 2 / 3
                    )
                    : true
              ) || loading}
              onClick={handleUserConfirm}
            >
              Xác nhận
            </Button>
          </header>
          <div className="profile-personal-v2__header">
            <p className="personal-header__title">Thông tin cá nhân</p>
          </div>
          <div className="profile-personal-wrapper-v2">
            <div className="profile-personal-v2__view">
              <Avatar
                src={selectedUser?.avatar}
                className="profile-personal-v2__avatar"
              />
              <Button
                className="profile-personal-v2__btn-link"
                onClick={() => navigate(`/profile/${selectedUser?.userId}`)}
              >
                Thông tin cá nhân
              </Button>
            </div>
            <div className="profile-personal-v2">
              <ul className="profile-personal-v2__details">
                <li className="profile-personal-v2__detail">
                  <div className="profile-personal-v2__detail-label">
                    <Image
                      src="/icon/user-admin_3.svg"
                      className="profile-personal-v2__detail-icon"
                      preview={false}
                    />
                    <span>Họ và Tên</span>
                  </div>
                  <span className="profile-personal-v2__detail-content">
                    <Tooltip title={selectedUser?.donee}>
                      {selectedUser?.donee}
                    </Tooltip>
                  </span>
                </li>
                <li className="profile-personal-v2__detail">
                  <div className="profile-personal-v2__detail-label">
                    <Image
                      src="/icon/calendar.svg"
                      className="profile-personal-v2__detail-icon"
                      preview={false}
                    />
                    <span>Ngày Sinh</span>
                  </div>
                  <span className="profile-personal-v2__detail-content">
                    {selectedUser?.dob}
                  </span>
                </li>
                <li className="profile-personal-v2__detail">
                  <div className="profile-personal-v2__detail-label">
                    <Image
                      src="/icon/location.svg"
                      className="profile-personal-v2__detail-icon"
                      preview={false}
                    />
                    <span>Trú quán</span>
                  </div>
                  <span className="profile-personal-v2__detail-content">
                    <Tooltip title={selectedUser?.currentAddress}>
                      {selectedUser?.currentAddress}
                    </Tooltip>
                  </span>
                </li>
                <li className="profile-personal-v2__detail">
                  <div className="profile-personal-v2__detail-label">
                    <Image
                      src="/icon/home_1.svg"
                      className="profile-personal-v2__detail-icon"
                      preview={false}
                    />
                    <span>Nguyên quán</span>
                  </div>
                  <span className="profile-personal-v2__detail-content">
                    <Tooltip title={selectedUser?.address}>
                      {selectedUser?.address}
                    </Tooltip>
                  </span>
                </li>
                <li className="profile-personal-v2__detail">
                  <div className="profile-personal-v2__detail-label">
                    <Image
                      src="/icon/id-management.svg"
                      className="profile-personal-v2__detail-icon"
                      preview={false}
                    />
                    <span>Số CMND</span>
                  </div>
                  <span className="profile-personal-v2__detail-content">
                    {selectedUser?.id}
                  </span>
                </li>
                <li className="profile-personal-v2__detail">
                  <div className="profile-personal-v2__detail-label">
                    <Image
                      src="/icon/id-management.svg"
                      className="profile-personal-v2__detail-icon"
                      preview={false}
                    />
                    <span>Ngày cấp CMND</span>
                  </div>
                  <span className="profile-personal-v2__detail-content">
                    {moment(selectedUser?.identityDate).format("DD-MM-yy")}
                  </span>
                </li>
                <li className="profile-personal-v2__detail">
                  <div className="profile-personal-v2__detail-label">
                    <Image
                      src="/icon/id-management.svg"
                      className="profile-personal-v2__detail-icon"
                      preview={false}
                    />
                    <span>Nơi cấp CMND</span>
                  </div>
                  <span className="profile-personal-v2__detail-content">
                    {selectedUser?.identityPlace}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="profile-situation-verification">
            <p className="profile-situation-verification__header">
              Chứng minh nhân dân
            </p>
            <div className="profile-situation-verification__content">
              {selectedUser && selectedUser.identityImages && selectedUser.identityImages.length > 0 && <VotingSituationView
                key={selectedUser.id}
                id={selectedUser.id}
                title={`Giấy chứng minh nhân dân`}
                verificationType={`Giấy chứng minh nhân dân`}
                images={selectedUser?.identityImages}
                setReloadVotingData={setReloadVotingData}
                userName={selectedUser?.donee}
                isVoted={true}
                isOnTop={userData?.isOnTop}
                displayIdentity={true}
              />}
            </div>
            <p className="profile-situation-verification__header">
              Hoàn cảnh ({selectedUser?.situations.length || 0})
            </p>
            <div className="profile-situation-verification__content">
              {selectedUser &&
                selectedUser.situations.map((userSituation: any) => (
                  <VotingSituationView
                    key={userSituation.id}
                    id={userSituation.id}
                    title={userSituation.BadLuckerSituation.name}
                    verificationType={`Giấy chứng nhận ${userSituation.BadLuckerSituation.message}`}
                    images={userSituation.BadLuckMedia.map(
                      (media: any) => media.link
                    )}
                    setReloadVotingData={setReloadVotingData}
                    userName={selectedUser?.donee}
                    isVoted={
                      (selectedUser?.isVoted)
                        ? true
                        : userData
                          ? userSituation.UserSituationConfirms.map(
                            (userVote: any) => userVote.userId
                          ).indexOf(userData.id) >= 0
                          : true
                    }
                    isOnTop={userData?.isOnTop}
                  />
                ))}
            </div>
          </div>
          {loading && (
            <AppLoading loadingContent={<div></div>} showContent={false} />
          )}
          <AppDialog
            type="confirm"
            title={`Bạn có đồng ý tất cả các thông tin của người này đều là sự thật không ?`}
            description="Nếu chưa xem xét hết thông tin, hãy xem lại"
            confirmText={"Đồng ý"}
            cancelText={"Không"}
            onConfirm={() => {
              setOpenDialog(false);
              setStartVotingUser(true);
              setVoteType(1);
            }}
            onClose={() => {
              setOpenDialog(false);
              setStartVotingUser(true);
              setVoteType(-1);
            }}
            visible={openDialog}
            onCancel={() => setOpenDialog(false)}
          />
        </>
      }
    />
  );
};

export default VotingConfirmation;

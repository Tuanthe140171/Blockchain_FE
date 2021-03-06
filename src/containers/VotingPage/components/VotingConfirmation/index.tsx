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
        `B???n ???? ${voteType === 1 ? "x??c nh???n" : "kh??ng x??c nh???n"
        } th??ng tin c???a ${selectedUser?.donee}`,
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
              <span>B??nh ch???n h??? ngh??o</span>
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
              X??c nh???n
            </Button>
          </header>
          <div className="profile-personal-v2__header">
            <p className="personal-header__title">Th??ng tin c?? nh??n</p>
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
                Th??ng tin c?? nh??n
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
                    <span>H??? v?? T??n</span>
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
                    <span>Ng??y Sinh</span>
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
                    <span>Tr?? qu??n</span>
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
                    <span>Nguy??n qu??n</span>
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
                    <span>S??? CMND</span>
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
                    <span>Ng??y c???p CMND</span>
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
                    <span>N??i c???p CMND</span>
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
              Ch???ng minh nh??n d??n
            </p>
            <div className="profile-situation-verification__content">
              {selectedUser && selectedUser.identityImages && selectedUser.identityImages.length > 0 && <VotingSituationView
                key={selectedUser.id}
                id={selectedUser.id}
                title={`Gi???y ch???ng minh nh??n d??n`}
                verificationType={`Gi???y ch???ng minh nh??n d??n`}
                images={selectedUser?.identityImages}
                setReloadVotingData={setReloadVotingData}
                userName={selectedUser?.donee}
                isVoted={true}
                isOnTop={userData?.isOnTop}
                displayIdentity={true}
              />}
            </div>
            <p className="profile-situation-verification__header">
              Ho??n c???nh ({selectedUser?.situations.length || 0})
            </p>
            <div className="profile-situation-verification__content">
              {selectedUser &&
                selectedUser.situations.map((userSituation: any) => (
                  <VotingSituationView
                    key={userSituation.id}
                    id={userSituation.id}
                    title={userSituation.BadLuckerSituation.name}
                    verificationType={`Gi???y ch???ng nh???n ${userSituation.BadLuckerSituation.message}`}
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
            title={`B???n c?? ?????ng ?? t???t c??? c??c th??ng tin c???a ng?????i n??y ?????u l?? s??? th???t kh??ng ?`}
            description="N???u ch??a xem x??t h???t th??ng tin, h??y xem l???i"
            confirmText={"?????ng ??"}
            cancelText={"Kh??ng"}
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

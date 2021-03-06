import React, { useEffect, useState } from "react";
import { Button, Image, message } from "antd";
import { PhotoSlider } from "react-photo-view";
import useFetch from "../../../../hooks/useFetch";
import "react-photo-view/dist/react-photo-view.css";
import "./index.scss";
import AppLoading from "../../../../components/AppLoading";
import AppDialog from "../../../../components/AppDialog";

type VotingSituationViewProps = {
  id: string;
  title: string;
  verificationType: string;
  images: string[];
  userName: string;
  setReloadVotingData: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  isVoted: boolean;
  isOnTop: boolean;
  displayIdentity?: boolean
};

const VotingSituationView: React.FC<VotingSituationViewProps> = (props) => {
  const {
    isVoted,
    id,
    userName,
    title,
    verificationType,
    images,
    setReloadVotingData,
    isOnTop,
    displayIdentity
  } = props;
  const [viewVerification, setViewVerification] = useState<boolean>(false);
  const [startVotingSituation, setStartVotingSituation] = useState<
    boolean | undefined
  >(undefined);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [voteType, setVoteType] = useState<number>(-1);

  const { data, loading, error } = useFetch(
    `votes/situation`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [startVotingSituation],
    {
      method: "POST",
      body: JSON.stringify({
        badLuckTypeId: id,
        isConfirm: voteType,
      }),
    },
    () => {
      setStartVotingSituation(undefined);
      message.success(
        `Bạn đã ${voteType === 1 ? "xác nhận" : "không xác nhận"
        } thông tin ${title} của ${userName}`,
        4
      );
      setReloadVotingData(true);
    },
    () => {
      setStartVotingSituation(undefined);
      setReloadVotingData(true);
    }
  );

  useEffect(() => {
    error && message.error(error.message, 4);
  }, [error]);


  return (
    <div className="voting-situation-view">
      <header className="voting-situation-view__header">
        <span className="voting-situation-view__title">{title}</span>
        <div className="voting-situation-view__ctas">
          {
            !displayIdentity && <Button
              className="voting-situation-view__cta voting-situation-view__confirm"
              onClick={() => setOpenDialog(true)}
              disabled={isVoted || !isOnTop}
            >
              {isVoted ? "Đã xác nhận" : "Xác nhận"}
            </Button>
          }
        </div>
      </header>
      <div className="voting-situation-view__verification">
        <div className="voting-situation-view__verification-type">
          <Image
            src={images[0]}
            preview={false}
            style={{
              width: 40,
              height: 40,
              objectFit: "cover",
              borderRadius: 5,
            }}
          />
          <span>{verificationType}</span>
        </div>
        <Button
          className="voting-situation-view__view-btn"
          onClick={() => setViewVerification(true)}
        >
          Chi tiết
        </Button>
      </div>
      <PhotoSlider
        images={images.map((item) => ({ src: item, key: item }))}
        visible={viewVerification}
        onClose={() => setViewVerification(false)}
        speed={() => 800}
        easing={(type: any) =>
          type === 2
            ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
            : "cubic-bezier(0.34, 1.56, 0.64, 1)"
        }
        toolbarRender={({ onScale, scale, rotate, onRotate }) => {
          return (
            <>
              <Image
                preview={false}
                src="/icon/zoom-in.svg"
                className="PhotoView-Slider__toolbarIcon"
                onClick={() => onScale(scale + 1)}
              />
              <Image
                preview={false}
                src="/icon/zoom-out.svg"
                className="PhotoView-Slider__toolbarIcon"
                onClick={() => onScale(scale - 1)}
              />
              <Image
                preview={false}
                src="/icon/rotate.svg"
                className="PhotoView-Slider__toolbarIcon"
                onClick={() => onRotate(rotate + 90)}
              />
            </>
          );
        }}
        overlayRender={(overlayProps: any) => {
          return (
            <div className="voting-situation-view__desc">
              {verificationType}
            </div>
          );
        }}
      />
      {loading && (
        <AppLoading loadingContent={<div></div>} showContent={false} />
      )}
      <AppDialog
        type="confirm"
        title={`Bạn có đồng ý thông tin "${title}" của người này là sự thật không ?`}
        description="Nếu chưa xem xét hết thông tin, hãy xem lại"
        confirmText={"Đồng ý"}
        cancelText={"Không"}
        onConfirm={() => {
          setOpenDialog(false);
          setStartVotingSituation(true);
          setVoteType(1);
        }}
        onClose={() => {
          setOpenDialog(false);
          setStartVotingSituation(true);
          setVoteType(-1);
        }}
        visible={openDialog}
        onCancel={() => setOpenDialog(false)}
      />
    </div>
  );
};

export default VotingSituationView;

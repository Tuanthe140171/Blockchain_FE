import React, { useState } from "react";
import { Button, Image } from "antd";
import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import "./index.scss";

type VotingSituationViewProps = {
  title: string;
  verificationType: string;
  images: string[];
};

const VotingSituationView: React.FC<VotingSituationViewProps> = (props) => {
  const [viewVerification, setViewVerification] = useState<boolean>(false);

  const { title, verificationType, images } = props;
  return (
    <div className="voting-situation-view">
      <header className="voting-situation-view__header">
        <span className="voting-situation-view__title">{title}</span>
        <div className="voting-situation-view__ctas">
          <Button className="voting-situation-view__cta voting-situation-view__reject">
            Reject
          </Button>
          <Button className="voting-situation-view__cta voting-situation-view__confirm">
            Confirm
          </Button>
        </div>
      </header>
      <div className="voting-situation-view__verification">
        <div className="voting-situation-view__verification-type">
          <Image src="/icon/image.svg" preview={false} />
          <span>{verificationType}</span>
        </div>
        <Button
          className="voting-situation-view__view-btn"
          onClick={() => setViewVerification(true)}
        >
          View
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
    </div>
  );
};

export default VotingSituationView;

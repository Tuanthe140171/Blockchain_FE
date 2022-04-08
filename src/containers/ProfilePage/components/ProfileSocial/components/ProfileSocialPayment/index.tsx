import { Card, Radio } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import "./index.scss";

const ProfileSocialPayment = () => {
  return (
    <div className="profile-social-payment-wrapper">
      <div className="profile-social-payment">
        <header className="profile-social-payment__header">
          <p className="payment-header__title">Phương thức thanh toán</p>
        </header>
        <div className="profile-social-payment__divider" />
        <div className="profile-social-payment__details">
          <Card
            hoverable
            style={{ width: 240 }}
            className="profile-social-payment__details__card"
            cover={<img alt="example" src="/icon/logo-momo-png-1.png" />}
          >
            <div className="profile-social-payment__details__info">
              <Meta title="Ví điện tử MOMO" description="https://momo.vn/" />
              <Radio checked></Radio>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileSocialPayment;

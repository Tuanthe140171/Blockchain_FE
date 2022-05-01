import React, { useState } from "react";
import { Button, Image, Avatar } from "antd";
import moment from "moment";

import AppDonate from "../../../../components/AppDonate";
import useFetch from "../../../../hooks/useFetch";
import BigNumber from "bignumber.js";
import { useNavigate } from "react-router-dom";
import "./index.scss";

type ProfileDonationProps = {
  donation: {
    image: string;
    name: string;
    userId: string;
    id: string
  } | undefined
};

const convertToLocaleString = (time: string) => {
  const t3 = time.replace("seconds", "giây");
  const t4 = t3.replace("minutes", "phút");
  const t5 = t4.replace("minute", "phút");
  const t6 = t5.replace("hours", "giờ");
  const t7 = t6.replace("hour", "giờ");
  const t8 = t7.replace("days", "ngày");
  const t9 = t8.replace("day", "ngày");
  const t10 = t9.replace("months", "tháng");
  const t11 = t10.replace("month", "tháng");
  const t12 = t11.replace("years", "năm");
  const t13 = t12.replace("year", "năm");
  const t14 = t13.replace("a few", "Một vài");
  const t15 = t14.replace("an", "Một");
  const t16 = t15.replace("a", "Một");
  return t16;
};

const getTimeDiff = (time: any) => {
  const timestamp = moment(time).fromNow(true);
  const convertedTime = convertToLocaleString(timestamp);
  return convertedTime;
};

const ProfileDonation: React.FC<ProfileDonationProps> = (props) => {
  const { donation } = props;
  const navigate = useNavigate();
  const [visible, setVisible] = useState<boolean>(false);

  const { data, loading } = useFetch<any>(
    donation ? `users/me/philanthropists?id=${donation.id}&limit=5` : undefined,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    donation?.id ? [true] : [undefined],
    { method: "GET" },
  );

  return (
    <div className="profile-donation">
      <div className="direct-donation">
        <Button className="direct-donation__btn" onClick={() => setVisible(true)}>Ủng hộ</Button>
      </div>
      <div className="people-donated">
        <header className="people-donated__header">
          <Image
            src="/icon/user-admin.svg"
            className="people-donated__icon"
            preview={false}
          />
          <span className="people-donated__total">
            {data?.count || 0} người đã ủng hộ
          </span>
        </header>
        <ul className="people-donated__list">
          {data?.rows.map((TOP_DONATED: any, key: number) => (
            <React.Fragment key={key}>
              <div className="people-donated__divider"></div>
              <li className="people-donated__list-item">
                <Avatar
                  src={(function () {
                    const userAvatar = TOP_DONATED.from.UserMedia.filter(
                      (userMedia: any) => userMedia.type === "1" && userMedia.active === 1
                    )
                      .slice(0, 1)
                      .pop();
                    return userAvatar ? userAvatar.link : null;
                  })()}
                  className="people-donated__avatar"
                />
                <div className="people-donated__details">
                  <p className="people-donated__name">{TOP_DONATED.from.name}</p>
                  <p className="people-donated__last-donated">
                    {getTimeDiff(TOP_DONATED.from.transactionsFrom[0].date)}
                  </p>
                </div>
                <div className="people-donated__amount">
                  <Image src="/icon/ethereum_1.svg" preview={false} />
                  <span>{new BigNumber(TOP_DONATED.amount).div(1e18).toFixed(3)}</span>
                </div>
              </li>
            </React.Fragment>
          ))}
        </ul>
        <Button className="people-donated__see-all" onClick={() => navigate(`/donations/${donation?.id}`)}>Xem tất cả ủng hộ</Button>
        {visible && donation && (
          <AppDonate
            name={donation.name}
            avatar={donation.image}
            walletAddress={donation.userId}
            onClose={() => {
              setVisible(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileDonation;

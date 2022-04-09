import React, { useEffect, useState } from "react";
import { Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.scss";
import ProfileSituationVoting from "./component/ProfileSocialSituationVoting";

const ProfileSocialSituation = () => {
  const { id } = useParams();
  const { userData, badluckerType } = useSelector(
    (state: any) => state.userLayout
  );
  const { userPostData } = useSelector((state: any) => state.userPostData);
  const [myPageSituationList, setMyPageSituationList] = useState([]);
  const [yourSituationList, setYourSituationList] = useState([]);
  const [yourSituationCfList, setYourSituationCfList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      const listSituation = userData.BadLuckTypes.map((blk: any) => {
        return badluckerType.find((type: any) => type.id === blk.situationId);
      });
      setMyPageSituationList(listSituation);
    }
  }, [userData]);

  function compare(a: any, b: any) {
    if (a.trustScore < b.trustScore) {
      return 1;
    }
    if (a.trustScore > b.trustScore) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    if (userPostData) {
      // const listSituation = userPostData.BadLuckTypes;
      // listSituation.sort(compare);
      // setYourPageSituationList(listSituation);
      const listConfirmed = userPostData.BadLuckTypes.filter(
        (situation: any) => situation.trustScore > 50
      ).map((data: any) => {
        return badluckerType.find((type: any) => type.id === data.situationId);
      });
      setYourSituationCfList(listConfirmed);

      const listNeedConfirm = userPostData.BadLuckTypes.filter(
        (situation: any) => situation.trustScore <= 50
      );

      setYourSituationList(listNeedConfirm);
    }
  }, [userPostData]);

  const myPageSituation = () => {
    return (
      <ul className="profile-social-situation__details">
        {myPageSituationList.map((situation: any, index: number) => {
          return (
            <li className="profile-social-situation__detail" key={situation}>
              <div className="profile-social-situation__detail-label">
                <Image
                  src="/icon/identification.svg"
                  className="profile-social-situation__detail-icon"
                  preview={false}
                />
                <span>Hoàn Cảnh {index + 1}</span>
              </div>
              <div className="profile-social-situation__detail-content">
                <span>{situation.name}</span>
                <div className="profile-social-situation__detail-view-more">
                  <span>Giấy chứng nhận {situation.message} có công chứng</span>
                  <Link to="/">View</Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const yourPageSituation = () => {
    return (
      <ul className="profile-social-situation__details">
        {yourSituationCfList.map((situation: any, index: number) => {
          return (
            <li
              className="profile-social-situation__detail"
              key={situation.trustScore + index}
            >
              <div className="profile-social-situation__detail-label">
                <Image
                  src="/icon/identification.svg"
                  className="profile-social-situation__detail-icon"
                  preview={false}
                />
                <span>Hoàn Cảnh {index + 1}</span>
              </div>
              <div className="profile-social-situation__detail-content">
                <span>{situation.name}</span>
                <div className="profile-social-situation__detail-view-more">
                  <span>Giấy chứng nhận {situation.message} có công chứng</span>
                  <Link to="/">View</Link>
                </div>
              </div>
            </li>
          );
        })}
        <p className="profile-social-situation__text">
          Hoàn cảnh cần xác nhận ({yourSituationList.length || 0})
        </p>

        {yourSituationList.map((userSituation: any) => (
          <ProfileSituationVoting
            data={userSituation}
            images={userSituation.BadLuckMedia.map((media: any) => media.link)}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className="profile-social-situation">
      <header className="profile-personal__header">
        <p className="personal-header__title">Hoàn cảnh</p>
        {id ? null : (
          <span
            className="personal-header__edit"
            onClick={() => navigate("/profile/edit")}
          >
            Chỉnh sửa
          </span>
        )}
      </header>
      <div className="profile-personal__divider" />
      {id ? yourPageSituation() : myPageSituation()}
    </div>
  );
};

export default ProfileSocialSituation;

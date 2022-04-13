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

  // isVoted: (function () {
  //   return userData
  //     ? donee.UserVotes.map(
  //         (userVote: any) => userVote.userIdFrom
  //       ).indexOf(userData.id) >= 0
  //     : true;
  // })(),

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
    if (userPostData && userData) {
      const isVoted = userPostData
        ? userPostData.UserVotes.map(
          (userVote: any) => userVote.userIdFrom
        ).indexOf(userData.id) >= 0
        : true;

      console.log(userPostData.BadLuckTypes);

      const listConfirmed = userPostData.BadLuckTypes.map((data: any) => {
        return data.UserSituationConfirms.find((type: any) => type.userId === userData.id);
      });

      setYourSituationCfList(listConfirmed);

      const listNeedConfirm = userPostData.BadLuckTypes.filter(
        (situation: any) => {
          return !(
            isVoted
              ? true
              : userData
                ? situation.UserSituationConfirms.map(
                  (userVote: any) => userVote.userId
                ).indexOf(userData.id) >= 0
                : true
          )
        }
      );

      console.log(listNeedConfirm);

      setYourSituationList(listNeedConfirm);
    }
  }, [userPostData, userData]);

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
    const isVoted = userPostData
      ? userPostData.UserVotes.map(
        (userVote: any) => userVote.userIdFrom
      ).indexOf(userData.id) >= 0
      : true;
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
        {
          yourSituationList && yourSituationList.length > 0 && <p className="profile-social-situation__text">
            Hoàn cảnh cần xác nhận ({yourSituationList.length || 0})
          </p>
        }

        {yourSituationList.map((userSituation: any) => (
          <ProfileSituationVoting
            data={userSituation}
            images={userSituation.BadLuckMedia.map((media: any) => media.link)}
            isVoted={
              isVoted
                ? true
                : userData
                  ? userSituation.UserSituationConfirms.map(
                    (userVote: any) => userVote.userId
                  ).indexOf(userData.id) >= 0
                  : true
            }
            id={userSituation.userId}
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

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProfileSituationVoting from "./component/ProfileSocialSituationVoting";
import "./index.scss";

const ProfileSocialSituation = () => {
  const [viewVerification, setViewVerification] = useState<boolean>(false);
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
      const listSituation = userData.BadLuckTypes.filter((blk: any) => {
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

      const listConfirmed = userPostData.BadLuckTypes.map((data: any) => {
        return {
          isConfirmed: data.UserSituationConfirms.find(
            (type: any) => type.userId === userData.id
          )
            ? true
            : false,
          ...data,
        };
      });

      setYourSituationCfList(listConfirmed);

      const listNeedConfirm = userPostData.BadLuckTypes.filter(
        (situation: any) => {
          return !(isVoted
            ? true
            : userData
            ? situation.UserSituationConfirms.map(
                (userVote: any) => userVote.userId
              ).indexOf(userData.id) >= 0
            : true);
        }
      );

      setYourSituationList(listNeedConfirm);
    }
  }, [userPostData, userData]);

  const myPageSituation = () => {
    return (
      <ul className="profile-social-situation__details">
        {myPageSituationList.map((situation: any, index: number) => {
          return (
            <ProfileSituationVoting
              data={situation}
              images={situation.BadLuckMedia.map((media: any) => media.link)}
              isVoted={true}
              id={situation.userId}
              key={situation.id}
            />
            // <li className="profile-social-situation__detail" key={situation}>
            //   <div className="profile-social-situation__detail-label">
            //     <Image
            //       src="/icon/identification.svg"
            //       className="profile-social-situation__detail-icon"
            //       preview={false}
            //     />
            //     <span>Ho??n C???nh {index + 1}</span>
            //   </div>
            //   <div className="profile-social-situation__detail-content">
            //     <span>{situation.name}</span>
            //     <div className="profile-social-situation__detail-view-more">
            //       <span>Gi???y ch???ng nh???n {situation.message} c?? c??ng ch???ng</span>
            //       <Link to="/">Chi ti???t</Link>
            //     </div>
            //   </div>
            // </li>
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
            // <li
            //   className="profile-social-situation__detail"
            //   key={situation.trustScore + index}
            // >
            <ProfileSituationVoting
              data={situation}
              images={situation.BadLuckMedia.map((media: any) => media.link)}
              isVoted={
                isVoted
                  ? true
                  : userData
                  ? situation.UserSituationConfirms.map(
                      (userVote: any) => userVote.userId
                    ).indexOf(userData.id) >= 0
                  : true
              }
              id={situation.userId}
              key={situation.id}
            />
            // </li>
          );
        })}
        {/* {yourSituationList && yourSituationList.length > 0 && (
          <p className="profile-social-situation__text">
            Ho??n c???nh c???n x??c nh???n ({yourSituationList.length || 0})
          </p>
        )}

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
            key={userSituation.id}
          />
        ))} */}
      </ul>
    );
  };

  return (
    <div className="profile-social-situation">
      <header
        className="profile-personal__header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p className="personal-header__title">Ho??n c???nh</p>
        {id || userData?.type < 3 ? null : (
          <span
            className="personal-header__edit"
            onClick={() => navigate("/profile-edit/3")}
          >
            Ch???nh s???a
          </span>
        )}
      </header>
      <div className="profile-personal__divider" />
      {id ? yourPageSituation() : myPageSituation()}
    </div>
  );
};

export default ProfileSocialSituation;

import React, { useEffect, useState } from "react";
import { Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.scss";

const ProfileSocialSituation = () => {
  const { id } = useParams();
  const { userData, badluckerType } = useSelector(
    (state: any) => state.userLayout
  );
  const [myPageSituationList, setMyPageSituationList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      // const yourBadLuckerType = userData.BadLuckTypes;
      const listSituation = userData.BadLuckTypes.map((blk: any) => {
        return badluckerType.find((type: any) => type.id === blk.situationId);
      });
      setMyPageSituationList(listSituation);
    }
  }, [userData]);

  const myPageSituation = () => {
    return (
      <ul className="profile-situation__details">
        {myPageSituationList.map((situation: any, index: number) => {
          return (
            <li className="profile-situation__detail" key={situation}>
              <div className="profile-situation__detail-label">
                <Image
                  src="/icon/identification.svg"
                  className="profile-situation__detail-icon"
                  preview={false}
                />
                <span>Hoàn Cảnh {index + 1}</span>
              </div>
              <div className="profile-situation__detail-content">
                <span>{situation.name}</span>
                <div className="profile-situation__detail-view-more">
                  <span>Giấy chứng nhận {situation.message} có công chứng</span>
                  <Link to="/">View</Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );

    // <li className="profile-situation__detail">
    //   <div className="profile-situation__detail-label">
    //     <Image
    //       src="/icon/identification.svg"
    //       className="profile-situation__detail-icon"
    //       preview={false}
    //     />
    //     <span>Hoàn Cảnh 2</span>
    //   </div>
    //   <div className="profile-situation__detail-content">
    //     <span>Thương binh liệt sĩ</span>
    //     <div className="profile-situation__detail-view-more">
    //       <span>Giấy chứng nhận hộ nghèo có công chứng</span>
    //       <Link to="/">View</Link>
    //     </div>
    //   </div>
    // </li>
  };

  const yourPageSituation = () => {
    return (
      <div className="profile-situation">
        <header className="profile-personal__header">
          <p className="personal-header__title">Situation</p>
          {/* <span className="personal-header__edit">Edit</span> */}
        </header>
        <div className="profile-personal__divider" />
        <ul className="profile-situation__details">
          <li className="profile-situation__detail">
            <div className="profile-situation__detail-label">
              <Image
                src="/icon/identification.svg"
                className="profile-situation__detail-icon"
                preview={false}
              />
              <span>Hoàn Cảnh 1</span>
            </div>
            <div className="profile-situation__detail-content">
              <span>Người nghèo</span>
              <div className="profile-situation__detail-view-more">
                <span>Giấy chứng nhận hộ nghèo có công chứng</span>
                <Link to="/">View</Link>
              </div>
            </div>
          </li>

          <li className="profile-situation__detail">
            <div className="profile-situation__detail-label">
              <Image
                src="/icon/identification.svg"
                className="profile-situation__detail-icon"
                preview={false}
              />
              <span>Hoàn Cảnh 2</span>
            </div>
            <div className="profile-situation__detail-content">
              <span>Thương binh liệt sĩ</span>
              <div className="profile-situation__detail-view-more">
                <span>Giấy chứng nhận hộ nghèo có công chứng</span>
                <Link to="/">View</Link>
              </div>
            </div>
          </li>
        </ul>
        {/* <div className="profile-situation__add-info">
        <Image
          src="/icon/edit.svg"
          preview={false}
          className="profile-situation__add-info-icon"
        />
        <span>Add Situation</span>
      </div> */}
      </div>
    );
  };

  return (
    <div className="profile-situation">
      <header className="profile-personal__header">
        <p className="personal-header__title">Situation</p>
        <span
          className="personal-header__edit"
          onClick={() => navigate("/profile/edit")}
        >
          Edit
        </span>
      </header>
      <div className="profile-personal__divider" />
      {id ? yourPageSituation() : myPageSituation()}
    </div>
  );
};

export default ProfileSocialSituation;

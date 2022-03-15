import { Button, Divider, Upload } from "antd";
import React from "react";
import Circumstances from "../../../../constants/circumstances";
import ProfileCascader from "../ProfileEditCascader";
import ProfileUpload from "../ProfileEditModal/component/ProfileEditUpload";
import "./index.scss";

const ProfileSituation = () => {
  const listSituation = [
    {
      value: Circumstances.POOR,
      label: Circumstances.POOR,
      index: 0,
      message: "hộ nghèo",
    },
    {
      value: Circumstances.ORPHAN,
      label: Circumstances.ORPHAN,
      index: 1,
      message: "trẻ mồ côi",
    },
  ];

  const fileList: any = [
    {
      name: `Upload giấy chứng nhận ${"alo"}`,
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      thumbUrl:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ];

  const renderSituation = () => {
    return listSituation.map((option, index) => {
      return (
        <div className="profile-situation__container__list-situation__situation">
          <div className="profile-situation__container__list-situation__situation__wrapper">
            <div>{option.value}</div>
            <Button>Delete</Button>
          </div>
          <div className="profile-situation__container__list-situation__situation__upload">
            <Button
              type="text"
              className="profile-situation__container__list-situation__situation__upload__title"
            >
              Giấy xác nhận {option.message}
            </Button>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
              defaultFileList={fileList}
              className="profile-situation__container__list-situation__situation__upload__component"
            >
              <Button>+ Add more file</Button>
            </Upload>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="profile-situation">
      <div className="profile-situation__container">
        <div className="profile-situation__container__list-situation">
          <div className="profile-situation__container__list-situation__title">
            Your situation
          </div>
          <div className="profile-situation__container__list-situation__cmnd">
            <div className="profile-situation__container__list-situation__cmnd__title-wrapper">
              <div>Chứng minh nhân dân</div>
              <Button type="ghost">Delete</Button>
            </div>
            <div className="profile-situation__container__list-situation__cmnd__upload">
              <Button
                type="text"
                className="profile-situation__container__list-situation__cmnd__upload__title"
              >
                Giấy CMND
              </Button>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                defaultFileList={fileList}
                className="profile-situation__container__list-situation__cmnd__upload__component"
              >
                <Button>+ Add more file</Button>
              </Upload>
            </div>
          </div>
          {renderSituation()}
        </div>
        <Divider
          type="vertical"
          className="profile-situation__container__divider"
        />
        <div className="profile-situation__container__add-situation">
          <div className="profile-situation__container__add-situation__title">
            <div>Thêm hoàn cảnh</div>
            <Button>Add</Button>
          </div>
          <ProfileCascader hasCMND={false} />
        </div>
      </div>
    </div>
  );
};

export default ProfileSituation;

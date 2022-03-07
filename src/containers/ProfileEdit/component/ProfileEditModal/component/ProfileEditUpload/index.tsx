import { Button, Upload } from "antd";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import "./index.scss";

type ProfileModalProps = {
  index: number;
  message: string;
};

const ProfileUpload: React.FC<ProfileModalProps> = (props) => {
  const { index, message } = props;

  const fileList: any = [
    {
      name: `Upload giấy chứng nhận ${message}`,
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      thumbUrl:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ];

  return (
    <div className="profile-upload">
      <Button type="text" className="profile-upload__title">
        Giấy chứng nhận {message}
      </Button>
      <div className="profile-upload__wrapper">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
          defaultFileList={fileList}
          accept={".pdf"}
          className="profile-upload__wrapper__container"
        >
          <Button className="profile-upload__wrapper__container__button">
            Upload file
          </Button>
        </Upload>
        <div className="profile-upload__wrapper__download">
          Bạn chưa có mẫu giấy công chứng? <Button type="link">Download</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpload;

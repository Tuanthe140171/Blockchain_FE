import { Button, Upload } from "antd";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import "./index.scss";

type ProfileModalProps = {
  id: string;
  message: string;
  dataUpload?: any;
  setDataUpload?: any;
};

const ProfileUpload: React.FC<ProfileModalProps> = (props) => {
  const { id, message, dataUpload, setDataUpload } = props;

  const fileList: any = [
    {
      name: `Upload giấy chứng nhận ${message}`,
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ];

  const onSituationUpload = ({ fileList: newFileList }: any) => {
    // setIsUploadAva(true);
    console.log(newFileList);
  };

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
          className="profile-upload__wrapper__container"
          maxCount={1}
          onChange={onSituationUpload}
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

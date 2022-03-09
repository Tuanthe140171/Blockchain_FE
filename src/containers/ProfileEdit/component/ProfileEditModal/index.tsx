import {
  ArrowLeftOutlined,
  StarOutlined
} from "@ant-design/icons";
import { Button, Cascader, Drawer, Tag, Upload } from "antd";
import React, { useState } from "react";
import AppDialog from "../../../../components/AppDialog";
import Circumstances from "../../../../constants/circumstances";
import Message from "../../../../constants/message";
import ProfileUpload from "./component/ProfileEditUpload";
import "./index.scss";

type ProfileModalProps = {
  isVisible: boolean;
  closeModal: any;
};

const ProfileModal: React.FC<ProfileModalProps> = (props) => {
  const { isVisible, closeModal } = props;

  //   const handleOk = () => {
  //     setIsModalVisible(false);
  //   };

  const props1: any = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    defaultFileList: [
      {
        name: "Chứng minh nhân dân",
        status: "done",
        // response: "Server Error 500", // custom error message to show
        url: "http://www.baidu.com/xxx.png",
      },
    ],
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: "download ",
      showRemoveIcon: true,
      removeIcon: (
        <StarOutlined
          size={60}
          onClick={(e) => console.log(e, "custom removeIcon event")}
        />
      ),
    },
  };

  const options = [
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
    {
      value: Circumstances.ETHNIC_MINORITY,
      label: Circumstances.ETHNIC_MINORITY,
      index: 2,
      message: "dân tộc thiểu số",
    },
    {
      value: Circumstances.MARTYR_FAMILY,
      label: Circumstances.MARTYR_FAMILY,
      index: 3,
      message: "liệt sĩ",
    },
    {
      value: Circumstances.AGENT_ORANGE,
      label: Circumstances.AGENT_ORANGE,
      index: 4,
      message: "chất độc màu da cam",
    },
    {
      value: Circumstances.ELDERLY,
      label: Circumstances.ELDERLY,
      index: 5,
      message: " người già",
    },
  ];

  const [selectedList, setSelectedList] = useState<any>([]);

  const onChange = (value: any) => {
    setSelectedList(value);
  };

  const onTagClose = (e: any, index: any) => {
    const itemPos = selectedList.indexOf(e);
    const { [itemPos]: item, ...rest } = selectedList;
    setSelectedList(Object.values(rest));
    return;
  };

  const renderProof = () => {
    return options.map((option, index) => {
      if (selectedList.some((data: any) => data[0] === option.value)) {
        return (
          <ProfileUpload
            index={index}
            message={option.message}
            key={option.index}
          />
        );
      }
    });
  };

  const renderTag = () => {
    return selectedList.map((tag: any, index: any) => {
      return (
        <Tag
          closable
          onClose={() => onTagClose(tag, index)}
          key={tag}
          className="profile-drawer__tags__tag"
          color={randomColor()}
        >
          {tag[0]}
        </Tag>
      );
    });
  };

  const randomColor = (() => {
    "use strict";
    const randomInt = (min: any, max: any) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return () => {
      var h = randomInt(0, 360);
      var s = randomInt(42, 98);
      var l = randomInt(40, 90);
      return `hsl(${h},${s}%,${l}%)`;
    };
  })();

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      {openDialog ? (
        <AppDialog
          type="infor"
          title={Message.INFOR_01}
          description={Message.INFOR_DC_01}
          confirmText={Message.INFOR_CF_01}
          onConfirm={() => {
            console.log("Xác nhận");
            setOpenDialog(false);
            closeModal();
          }}
        />
      ) : null}
      <Drawer
        title="Thông tin cá nhân"
        placement="right"
        visible={isVisible}
        mask={true}
        onClose={closeModal}
        closeIcon={<ArrowLeftOutlined />}
        width="45%"
        className="profile-drawer"
        headerStyle={{ height: "98px", padding: "24px 65px 0 39px" }}
        bodyStyle={{ padding: "24px 65px 0 39px" }}
      >
        <Button
          disabled={!selectedList.length}
          className="profile-drawer__btn-submit"
          type="primary"
          onClick={() => setOpenDialog(true)}
        >
          Confirm
        </Button>
        <div className="profile-drawer__text">
          Bạn hãy chọn những hoàn cảnh phù hợp với hoàn cảnh của bạn :
        </div>
        <Cascader
          options={options}
          onChange={onChange}
          value={selectedList}
          style={{ width: "100%" }}
          className="profile-drawer__cascader"
          multiple
          maxTagCount={0}
          maxTagPlaceholder={
            <div>
              <Tag closable onClose={() => setSelectedList([])} color="#108ee9">
                {selectedList.length}
              </Tag>
              Hoàn cảnh
            </div>
          }
          dropdownStyle={{ width: "100%" }}
        />
        {/* {setSelectedList.length > 0 ? <div>adu</div> : <div>adu2</div>} */}
        <div className="profile-drawer__tags">{renderTag()}</div>
        <div className="profile-drawer__text">
          Bạn hãy điền và gửi các giấy tờ vào{" "}
          {selectedList.length + 1 > 1 ? selectedList.length + 1 : ""} form sau:
        </div>
        <div className="profile-drawer__cmnd">
          <Button type="text" className="profile-drawer__cmnd__title">
            Giấy CMND
          </Button>
          <div className="profile-drawer__cmnd__wrapper">
            <Upload {...props1} className="profile-upload__wrapper__container">
              <Tag
                className="profile-drawer__cmnd__wrapper__container__button"
                color={"#3156DB"}
              >
                Add file
              </Tag>
            </Upload>
          </div>
        </div>
        {renderProof()}
      </Drawer>
    </>
  );
};

export default ProfileModal;

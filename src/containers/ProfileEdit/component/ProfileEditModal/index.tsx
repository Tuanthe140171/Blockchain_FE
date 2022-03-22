import { Button, Cascader, Tag, Upload } from "antd";
import React, { useState } from "react";
import AppDialog from "../../../../components/AppDialog";
import AppDrawer from "../../../../components/AppDrawer";
import Circumstances from "../../../../constants/circumstances";
import Message from "../../../../constants/message";
import useFetch from "../../../../hooks/useFetch";
import ProfileUpload from "./component/ProfileEditUpload";
import "./index.scss";

type ProfileModalProps = {
  isVisible: boolean;
  closeModal: any;
};

const ProfileModal: React.FC<ProfileModalProps> = (props) => {
  const { isVisible, closeModal } = props;
  const [options, setOptions] = useState([]);
  //   const handleOk = () => {
  //     setIsModalVisible(false);
  //   };
  const { data: userData } = useFetch<any>(
    "bad-lucker/get-badlucker-situation",
    {},
    false,
    [],
    { method: "GET" },
    (e) => {
      const optionRes = e.data.map((opt: any, index: number) => {
        return {
          value: opt.name,
          label: opt.name,
          index: index,
          message: opt.message,
          id: opt.id,
        };
      });
      setOptions(optionRes);
    }
  );

  const fileList: any = [
    {
      name: `Chứng minh nhân dân acb mặt 1.jpg`,
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      thumbUrl:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
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
    return options.map((option: any, index) => {
      if (selectedList.some((data: any) => data[0] === option?.value)) {
        return (
          <ProfileUpload
            id={option.id}
            message={option?.message}
            key={option?.index}
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
          <span>{tag[0]}</span>
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

  const drawerContent = () => {
    return (
      <>
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
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              defaultFileList={fileList}
              maxCount={2}
              className="profile-drawer__cmnd__wrapper__container"
            >
              <Button>+ Add more file</Button>
            </Upload>
          </div>
        </div>
        {renderProof()}
      </>
    );
  };

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
      <AppDrawer
        title="Thông tin cá nhân"
        isVisible={isVisible}
        closeModal={closeModal}
        className="profile-drawer"
        content={drawerContent()}
      />
    </>
  );
};

export default ProfileModal;

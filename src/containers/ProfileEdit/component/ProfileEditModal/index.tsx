import { Button, Cascader, Tag, Upload } from "antd";
import React, { useEffect, useState } from "react";
import AppDialog from "../../../../components/AppDialog";
import AppDrawer from "../../../../components/AppDrawer";
import Message from "../../../../constants/message";
import useFetch from "../../../../hooks/useFetch";
import { useSelector } from "react-redux";
import "./index.scss";
import AppLoading from "../../../../components/AppLoading";

type ProfileModalProps = {
  isVisible: boolean;
  closeModal: any;
  submitted: any;
};

type ISituation = {
  id: string;
  file: any;
  value: string;
};

const dummyRequest = ({ file, onSuccess }: any) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const ProfileModal: React.FC<ProfileModalProps> = (props) => {
  const { isVisible, closeModal, submitted } = props;
  const [options, setOptions] = useState([]);
  const [cmndFile, setCmndFile] = useState<any>([]);
  const [situationFile, setSituationFile] = useState<ISituation[]>([]);
  const [submitFile, setSubmitFile] = useState<any>([]);
  const [isSubmit, setIsSubmit] = useState<any>(undefined);
  const [responseLink, setResponseLink] = useState<any>(undefined);
  const { badluckerType } = useSelector((state: any) => state.userLayout);

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

  const fileList: any = [
    {
      name: `Chứng minh nhân dân acb mặt 1.jpg`,
      status: "done",
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
    if (situationFile.some((s: any) => s.value === e[0])) {
      setSituationFile(situationFile.filter((s: any) => s.value !== e[0]));
    }
    return;
  };

  // const { data: userData } = useFetch<any>(
  //   "bad-lucker/get-badlucker-situation",
  //   {},
  //   false,
  //   [],
  //   { method: "GET" },
  //   (e) => {
  //     const optionRes = e.data.map((opt: any, index: number) => {
  //       return {
  //         value: opt.name,
  //         label: opt.name,
  //         index: index,
  //         message: opt.message,
  //         id: opt.id,
  //       };
  //     });
  //     setOptions(optionRes);
  //   }
  // );
  useEffect(() => {
    if (badluckerType) {
      const optionRes = badluckerType?.map((opt: any, index: number) => {
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
  }, [badluckerType]);

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

  const onSituationUpload = (
    { fileList: newFileList }: any,
    id: any,
    value: any
  ) => {
    const newObj: ISituation = {
      id: id,
      file: newFileList[0].originFileObj,
      value: value,
    };

    if (situationFile.some((s: any) => s.id === newObj.id)) {
      const newSituationFile = situationFile.map((s1: any) => {
        return s1.id === newObj.id ? newObj : s1;
      });
      setSituationFile(newSituationFile);
    } else {
      setSituationFile((arr) => [...arr, newObj]);
    }
  };

  const renderProof = () => {
    return options.map((option: any, index) => {
      if (selectedList.some((data: any) => data[0] === option?.value)) {
        return (
          <div className="profile-upload" key={option?.index}>
            <Button type="text" className="profile-upload__title">
              Giấy chứng nhận {option?.message}
            </Button>
            <div className="profile-upload__wrapper">
              <Upload
                listType="picture"
                defaultFileList={fileList}
                className="profile-upload__wrapper__container"
                maxCount={1}
                onChange={(e) =>
                  onSituationUpload(e, option?.id, option?.value)
                }
                customRequest={dummyRequest}
              >
                <Button className="profile-upload__wrapper__container__button">
                  Upload file
                </Button>
              </Upload>
              <div className="profile-upload__wrapper__download">
                Bạn chưa có mẫu giấy công chứng?{" "}
                <Button type="link">Download</Button>
              </div>
            </div>
          </div>
        );
      }
    });
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [openWarnDialog, setOpenWarnDialog] = useState(false);

  const onCMNDChange = ({ fileList: newFileList }: any) => {
    const list = newFileList.map((f: any) => {
      return f.originFileObj;
    });
    setCmndFile(list);
  };

  useEffect(() => {
    const tmpSituation = situationFile.map((s: any) => {
      return s.file;
    });

    const combineFile = cmndFile.concat(tmpSituation);
    let data = new FormData();
    for (let i = 0; i < combineFile.length; i++) {
      data.append("files", combineFile[i]);
    }
    setSubmitFile(data);
  }, [cmndFile, situationFile]);

  const { data: linkImg, loading: loadingGetLinkImg } = useFetch<any>(
    "image/upload-multiple-file",
    {},
    false,
    [isSubmit],
    {
      method: "POST",
      body: submitFile,
    },
    (e) => {
      const formatLink = {
        image: [
          {
            link: e.data[0],
            type: 3,
          },
          {
            link: e.data[1],
            type: 3,
          },
        ],
        badLuckType: [],
      };
      const badLuckdata: any = situationFile.map((s: any, index: number) => {
        return {
          id: s.id,
          link: [e.data[index + 2]],
        };
      });
      formatLink.badLuckType = badLuckdata;
      setResponseLink(formatLink);
    }
  );

  const { data: confirmRes, loading: loadingConfirmRes } = useFetch<any>(
    "bad-lucker/update-badlucker",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [responseLink],
    {
      method: "POST",
      body: JSON.stringify(responseLink),
    },
    () => {
      setOpenDialog(true);
    }
  );

  const checkDataSubmit = () => {
    if (cmndFile.length < 2 || situationFile.length < selectedList.length) {
      setOpenWarnDialog(true);
    } else {
      setIsSubmit(true);
    }
  };

  const drawerContent = () => {
    return (
      <>
        {(loadingConfirmRes || loadingGetLinkImg) && (
          <AppLoading loadingContent={<div></div>} showContent={false} />
        )}
        <Button
          disabled={!selectedList.length}
          className="profile-drawer__btn-submit"
          type="primary"
          onClick={() => checkDataSubmit()}
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
              <Tag
                closable
                onClose={() => {
                  setSelectedList([]);
                  setSituationFile([]);
                }}
                color="#108ee9"
              >
                {selectedList.length}
              </Tag>
              Hoàn cảnh
            </div>
          }
          dropdownStyle={{ width: "100%" }}
        />
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
              maxCount={2}
              onChange={onCMNDChange}
              className="profile-drawer__cmnd__wrapper__container"
              customRequest={dummyRequest}
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
      <AppDialog
        type="infor"
        title={Message.INFOR_01}
        description={Message.INFOR_DC_01}
        confirmText={Message.INFOR_CF_01}
        onConfirm={() => {
          setOpenDialog(false);
          submitted();
          closeModal();
        }}
        visible={openDialog}
        onCancel={() => setOpenDialog(false)}
      />
      <AppDialog
        type="infor"
        title={"Bạn cần nộp đầy đủ các giấy tờ yêu cầu"}
        description={""}
        confirmText={"Đóng"}
        onConfirm={() => {
          setOpenWarnDialog(false);
        }}
        visible={openWarnDialog}
        onCancel={() => setOpenWarnDialog(false)}
      />
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

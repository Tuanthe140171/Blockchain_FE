import { Button, Cascader, Tag, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppDialog from "../../../../components/AppDialog";
import AppDrawer from "../../../../components/AppDrawer";
import AppLoading from "../../../../components/AppLoading";
import Message from "../../../../constants/message";
import useFetch from "../../../../hooks/useFetch";
import "./index.scss";

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
  const [options, setOptions] = useState<any>([]);
  const [situationFile, setSituationFile] = useState<ISituation[]>([]);
  const { badluckerType } = useSelector((state: any) => state.userLayout);
  const [submitAll, setSubmitAll] = useState<any>(null);

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

  const [selectedList, setSelectedList] = useState<any>([]);

  const onTagClose = (e: any, index: any) => {
    const pos = options.find((option: any) => option.value === e[0])?.id;
    delete linkSituationObject[pos];
    const itemPos = selectedList.indexOf(e);
    const { [itemPos]: item, ...rest } = selectedList;
    setSelectedList(Object.values(rest));
    if (situationFile.some((s: any) => s.value === e[0])) {
      setSituationFile(situationFile.filter((s: any) => s.value !== e[0]));
    }
    return;
  };

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

  const onChange = (value: any) => {
    const listId = value.map(
      (val: any) => options.find((op: any) => op.value === val[0])?.id
    );
    if (Object.keys(linkSituationObject).length < listId.length) {
      for (let i = 0; i < listId.length; i++) {
        if (!linkSituationObject[listId[i]]) {
          linkSituationObject[listId[i]] = [];
        }
      }
    } else {
      delete linkSituationObject[
        `${Object.keys(linkSituationObject).find(
          (val) => !listId.includes(val)
        )}`
      ];
    }
    setSelectedList(value);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [openWarnDialog, setOpenWarnDialog] = useState(false);

  const [isSubmit, setIsSubmit] = useState<any>(undefined);
  const [tempCmnd, setTempCmnd] = useState<any>([]);
  const [fileCmndUpload, setFileCmndUpload] = useState<any>(undefined);
  const [tempSituationId, setTempSituationId] = useState<any>(0);
  const [tempSituation, setTempSituation] = useState<any>([]);
  const [fileSituationUpload, setFileSituationUpload] =
    useState<any>(undefined);
  const [linkCmndObject, setLinkCmndObject] = useState<any>([]);
  const [linkSituationObject, setLinkSituationObject] = useState<any>({});

  const onCmndUpload = ({ fileList: newFileList }: any) => {
    setTempCmnd(newFileList);
  };

  const onSituationUpload = ({ fileList: newFileList }: any, id: any) => {
    setTempSituationId(id);
    setTempSituation(newFileList);
  };

  useEffect(() => {
    // if (tempCmnd && tempCmnd.length > 0) {
    if (tempCmnd) {
      let data = new FormData();
      for (let i = 0; i < tempCmnd.length; i++) {
        data.append("files", tempCmnd[i]?.originFileObj);
      }
      setFileCmndUpload(data);
    }
  }, [tempCmnd]);

  useEffect(() => {
    // if (tempSituation && tempSituation.length > 0) {
    if (tempSituation && tempSituation.length === 0 && tempSituationId !== 0) {
      linkSituationObject[tempSituationId] = [];
      setLinkSituationObject(linkSituationObject);
    }
    if (tempSituation && tempSituationId !== 0) {
      let data = new FormData();
      for (let i = 0; i < tempSituation.length; i++) {
        data.append("files", tempSituation[i]?.originFileObj);
      }
      setFileSituationUpload(data);
    }
  }, [tempSituation]);

  const { data: uploadCmndData, loading: loadingCmnd } = useFetch<any>(
    "image/upload-multiple-file",
    {},
    false,
    [fileCmndUpload],
    {
      method: "POST",
      body: fileCmndUpload,
    },
    (e) => {
      setLinkCmndObject(e.data);
    }
  );

  const { data: uploadSituationData, loading: loadingSituation } =
    useFetch<any>(
      "image/upload-multiple-file",
      {},
      false,
      [fileSituationUpload],
      {
        method: "POST",
        body: fileSituationUpload,
      },
      (e) => {
        setFileSituationUpload(undefined);
        const tmpLink: any = [];
        for (let i = 0; i < e.data.length; i++) {
          tmpLink.push(e.data[i]);
        }
        linkSituationObject[tempSituationId] = tmpLink;
        setLinkSituationObject(linkSituationObject);
      }
    );

  const { data: confirmRes, loading: loadingConfirmRes } = useFetch<any>(
    "bad-lucker/update-badlucker",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [isSubmit],
    {
      method: "POST",
      body: JSON.stringify(submitAll),
    },
    () => {
      setIsSubmit(undefined);
      setOpenDialog(true);
    }
  );

  const handleSubmit = () => {
    if (
      linkCmndObject.length < 2 ||
      Object.keys(linkSituationObject).length === 0 ||
      Object.keys(linkSituationObject).some(
        (value) => linkSituationObject[value].length < 1
      )
    ) {
      setOpenWarnDialog(true);
    } else {
      const cmndData = linkCmndObject.map((cmnd: any) => {
        return { link: cmnd, type: 3 };
      });
      const situationData = Object.keys(linkSituationObject).map((value) => {
        return {
          id: value,
          link: linkSituationObject[value],
        };
      });
      const combineData = {
        image: cmndData,
        badLuckType: situationData,
      };
      setSubmitAll(combineData);
      setIsSubmit(true);
    }
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

  const renderProof = () => {
    return options.map((option: any) => {
      if (selectedList.some((data: any) => data[0] === option?.value)) {
        return (
          <div className="profile-drawer__cmnd" key={option?.index}>
            <Button type="text" className="profile-drawer__cmnd__title">
              Giấy chứng nhận {option?.message}
            </Button>
            <div className="profile-drawer__cmnd__wrapper">
              <Upload
                className="profile-drawer__cmnd__wrapper__container"
                maxCount={5}
                defaultFileList={[]}
                onChange={(e) => onSituationUpload(e, option?.id)}
                customRequest={dummyRequest}
              >
                <Button>+ Tải thêm</Button>
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

  const drawerContent = () => {
    return (
      <>
        {(loadingConfirmRes || loadingCmnd || loadingSituation) && (
          <AppLoading loadingContent={<div></div>} showContent={false} />
        )}
        <Button
          disabled={!selectedList.length}
          className="profile-drawer__btn-submit"
          type="primary"
          onClick={() => handleSubmit()}
        >
          Xác nhận
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
              onChange={onCmndUpload}
              className="profile-drawer__cmnd__wrapper__container"
              customRequest={dummyRequest}
            >
              <Button>+ Tải thêm</Button>
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

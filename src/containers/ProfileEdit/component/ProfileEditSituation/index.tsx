import { Button, Cascader, Divider, Tag, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppDialog from "../../../../components/AppDialog";
import Message from "../../../../constants/message";
import useFetch from "../../../../hooks/useFetch";
import "./index.scss";

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

// them moi : id = 0.
// update: truyen id cua can update

const ProfileSituation = () => {
  const { userData, badluckerType } = useSelector(
    (state: any) => state.userLayout
  );
  // list initial cmnd
  const [cmndList, setCmndList] = useState<any>([]);
  // list initial situation
  const [situationList, setSituationList] = useState<any>([]);
  // list new situation
  const [newSituationFile, setNewSituationFile] = useState<ISituation[]>([]);
  // list option of situation checkbox
  const [options, setOptions] = useState([]);
  // open infor dialog or not
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  // open infor dialog or not
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  // open warning dialog when not enough form
  const [openWarnDialog, setOpenWarnDialog] = useState(false);
  // set warning dialog has 2 buttons or not
  const [hasButtons, setHasButtons] = useState(false);
  // set call api or not
  const [isSubmit, setIsSubmit] = useState<any>(undefined);
  // list of file when call api upload-multiple-file
  const [submitFile, setSubmitFile] = useState<any>([]);
  // list of link response of api upload-multiple-file
  const [responseLink, setResponseLink] = useState<any>(undefined);
  // id of situation that user want to delete
  const [deleteId, setDeleteId] = useState<any>(undefined);
  // set call api delete or not
  const [isDelete, setIsDelete] = useState<any>(undefined);

  // dialog infor data
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDescription, setDialogDescription] = useState("");

  useEffect(() => {
    if (userData) {
      const cmnd = userData?.UserMedia?.filter(
        (data: any) => data.type === "3"
      );
      setCmndList([
        {
          name: `CMND mặt 1`,
          status: "done",
          url: cmnd[0].link,
        },
        {
          name: `CMND mặt 2`,
          status: "done",
          url: cmnd[1].link,
        },
      ]);

      const situation = userData?.BadLuckTypes;
      setSituationList(situation);
      if (badluckerType && badluckerType.length > 0) {
        const newArr = badluckerType.filter((blk: any) => {
          return !situation.some((s: any) => s.situationId === blk.id);
        });
        const optionRes = newArr.map((opt: any, index: number) => {
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
    }
  }, [userData, badluckerType]);

  const onChange = ({ fileList: newFileList }: any) => {
    setCmndList(newFileList);
  };

  // get initial Situation text
  const getSituationText = (type: number, situationId: string) => {
    // 1: title - 2: message
    const text = badluckerType.find((type: any) => type.id === situationId);
    return type === 1 ? text.name : text.message;
  };

  // get initial Situation media
  const getSituationMedia = (data: any, text: string) => {
    const situationMedia = data.map((media: any, index: number) => {
      return {
        name: `Giấy xác nhận ${text}`,
        status: "done",
        url: media.link,
      };
    });
    return situationMedia;
  };

  const onSituationChange = () => {};

  // render initial Situation
  const renderSituation = () => {
    return situationList.map((s: any, index: number) => {
      return (
        <div
          className="profile-situation__container__list-situation__situation"
          key={index}
        >
          <div className="profile-situation__container__list-situation__situation__wrapper">
            <div>{getSituationText(1, s.situationId)}</div>
            <Button
              onClick={() => {
                console.log(s);
                setOpenConfirmDialog(true);
              }}
            >
              Cập nhật
            </Button>
            <Button
              onClick={() => {
                setDeleteId(+s.id);
                setHasButtons(true);
                setOpenWarnDialog(true);
              }}
            >
              Xóa
            </Button>
          </div>
          <div className="profile-situation__container__list-situation__situation__upload">
            <Button
              type="text"
              className="profile-situation__container__list-situation__situation__upload__title"
            >
              Giấy xác nhận {getSituationText(2, s.situationId)}
            </Button>
            <Upload
              listType="picture"
              defaultFileList={getSituationMedia(
                s.BadLuckMedia,
                getSituationText(2, s.situationId)
              )}
              className="profile-situation__container__list-situation__situation__upload__component"
              onChange={onSituationChange}
              customRequest={dummyRequest}
              isImageUrl={(file: any) => true}
            >
              <Button>+ Add more file</Button>
            </Upload>
          </div>
        </div>
      );
    });
  };

  const { data: deletedSituation } = useFetch<any>(
    "bad-lucker/delete-badlucker-situation",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [isDelete],
    {
      method: "DELETE",
      body: JSON.stringify({
        badLuckerTypeId: deleteId,
      }),
    },
    () => {
      setDialogTitle("Xóa hoàn cảnh thành công!");
      setOpenDialog(true);
      setDeleteId(undefined);
      setIsDelete(undefined);
    }
  );

  {
    /* Add new situation */
  }
  // list of checkbox selected
  const [selectedList, setSelectedList] = useState<any>([]);
  const onNewSituationChange = (value: any) => {
    setSelectedList(value);
  };

  // onClose - action when close the tags
  const onTagClose = (e: any, index: any) => {
    const itemPos = selectedList.indexOf(e);
    const { [itemPos]: item, ...rest } = selectedList;
    setSelectedList(Object.values(rest));
    return;
  };

  const randomColor = () => {
    "use strict";
    const randomInt = (min: any, max: any) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var h = randomInt(0, 360);
    var s = randomInt(42, 98);
    var l = randomInt(40, 90);
    return `hsl(${h},${s}%,${l}%)`;
  };

  // render list of tags of new situation
  const renderTag = () => {
    return selectedList.map((tag: any, index: any) => {
      return (
        <Tag
          closable
          onClose={() => onTagClose(tag, index)}
          key={tag}
          className="profile-cascader__tags__tag"
          color={randomColor()}
        >
          {tag[0]}
        </Tag>
      );
    });
  };

  const fileDefault: any = [
    {
      name: `Chứng minh nhân dân acb mặt 1.jpg`,
      status: "done",
    },
  ];

  // onChange - upload new file in new situation
  const onNewSituationUpload = (
    { fileList: newFileList }: any,
    id: any,
    value: any
  ) => {
    const newObj: ISituation = {
      id: id,
      file: newFileList[0].originFileObj,
      value: value,
    };

    if (newSituationFile.some((s: any) => s.id === newObj.id)) {
      const situationFile = newSituationFile.map((s1: any) => {
        return s1.id === newObj.id ? newObj : s1;
      });
      setNewSituationFile(situationFile);
    } else {
      setNewSituationFile((arr) => [...arr, newObj]);
    }
  };

  // render list of new situation
  const renderProof = () => {
    return options.map((option: any, index) => {
      if (selectedList.some((data: any) => data[0] === option.value)) {
        return (
          <div
            className="profile-situation__container__list-situation__situation"
            key={index}
          >
            <div className="profile-situation__container__list-situation__situation__wrapper">
              <div>{option.label}</div>
            </div>
            <div className="profile-situation__container__list-situation__situation__upload">
              <Button
                type="text"
                className="profile-situation__container__list-situation__situation__upload__title"
              >
                Giấy xác nhận {option.message}
              </Button>
              <Upload
                listType="picture"
                defaultFileList={fileDefault}
                maxCount={5}
                className="profile-situation__container__list-situation__situation__upload__component"
                onChange={(e) =>
                  onNewSituationUpload(e, option?.id, option?.value)
                }
                customRequest={dummyRequest}
                isImageUrl={(file: any) => true}
              >
                <Button>+ Add more file</Button>
              </Upload>
            </div>
          </div>
        );
      }
    });
  };

  // check if user upload enough files or not
  const checkSituationUpload = () => {
    if (newSituationFile.length < selectedList.length) {
      setOpenWarnDialog(true);
    } else {
      setIsSubmit(true);
    }
  };

  // format new situation files to upload
  useEffect(() => {
    const tmpSituation = newSituationFile.map((s: any) => {
      return s.file;
    });

    let data = new FormData();
    for (let i = 0; i < tmpSituation.length; i++) {
      data.append("files", tmpSituation[i]);
    }
    setSubmitFile(data);
  }, [newSituationFile]);

  // call api to get link of new situation files
  const { data: linkImg } = useFetch<any>(
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
        badLuckType: [],
      };
      const badLuckdata: any = newSituationFile.map((s: any, index: number) => {
        return {
          id: s.id,
          link: [e.data[index]],
        };
      });
      formatLink.badLuckType = badLuckdata;
      setResponseLink(formatLink);
    }
  );

  // call api to upload after get links
  const { data: confirmRes } = useFetch<any>(
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
      setDialogTitle("Bạn đã gửi đơn xác nhận hộ nghèo thành công");
      setDialogDescription("Những người trong hệ thống sẽ xác nhận giúp bạn.");
      setOpenDialog(true);
    }
  );

  return (
    <>
      {openDialog ? (
        <AppDialog
          type="infor"
          title={dialogTitle}
          description={dialogDescription}
          confirmText={Message.INFOR_CF_01}
          onConfirm={() => {
            setOpenDialog(false);
          }}
        />
      ) : null}
      {openConfirmDialog ? (
        <AppDialog
          type="warning"
          title={"Bạn chắc chắn muốn cập nhật các giấy tờ này chứ?"}
          confirmText={"Xác nhận"}
          cancelText={"Đóng"}
          onConfirm={() => {
            // setUpdateId(+s.id);
            setOpenWarnDialog(false);
          }}
          onClose={() => {
            setOpenConfirmDialog(false);
          }}
        />
      ) : null}
      {openWarnDialog ? (
        <AppDialog
          type="warning"
          title={
            hasButtons
              ? "Bạn chắc chắn muốn xóa hoàn cảnh này?"
              : "Bạn cần nộp đầy đủ các giấy tờ yêu cầu!"
          }
          confirmText={hasButtons ? "Xác nhận" : "Đóng"}
          cancelText={hasButtons ? "Đóng" : ""}
          onConfirm={() => {
            setIsDelete(true);
            setOpenWarnDialog(false);
          }}
          onClose={() => {
            setOpenWarnDialog(false);
          }}
        />
      ) : null}
      <div className="profile-situation">
        <div className="profile-situation__container">
          <div className="profile-situation__container__list-situation">
            <div className="profile-situation__container__list-situation__title">
              Your situation
            </div>
            <div className="profile-situation__container__list-situation__cmnd">
              <div className="profile-situation__container__list-situation__cmnd__title-wrapper">
                <div>Chứng minh nhân dân</div>
              </div>
              <div className="profile-situation__container__list-situation__cmnd__upload">
                <Button
                  type="text"
                  className="profile-situation__container__list-situation__cmnd__upload__title"
                >
                  Giấy CMND
                </Button>
                <Upload
                  listType="picture"
                  defaultFileList={cmndList}
                  fileList={cmndList}
                  className="profile-situation__container__list-situation__cmnd__upload__component"
                  customRequest={dummyRequest}
                  maxCount={2}
                  isImageUrl={(file: any) => true}
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
              <Button
                onClick={() => {
                  checkSituationUpload();
                }}
              >
                Confirm
              </Button>
            </div>
            <div className="profile-cascader">
              <div className="profile-cascader__text">
                Bạn hãy chọn những hoàn cảnh phù hợp với hoàn cảnh của bạn :
              </div>
              <Cascader
                options={options}
                onChange={onNewSituationChange}
                value={selectedList}
                style={{ width: "100%" }}
                className="profile-cascader__cascader"
                multiple
                maxTagCount={0}
                maxTagPlaceholder={
                  <div>
                    <Tag
                      closable
                      onClose={() => setSelectedList([])}
                      color="#108ee9"
                    >
                      {selectedList.length}
                    </Tag>
                    Hoàn cảnh
                  </div>
                }
                dropdownStyle={{ width: "100%" }}
              />
              <div className="profile-cascader__tags">{renderTag()}</div>
              {renderProof()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSituation;

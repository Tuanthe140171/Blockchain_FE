import { Button, Cascader, Divider, Tag, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppDialog from "../../../../components/AppDialog";
import AppLoading from "../../../../components/AppLoading";
import Message from "../../../../constants/message";
import useFetch from "../../../../hooks/useFetch";
import { getUserById } from "../../../../stores/action/user-layout.action";
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

const ProfileSituation = () => {
  const { userData, badluckerType } = useSelector(
    (state: any) => state.userLayout
  );
  const dispatch = useDispatch();

  /** Right side **/
  // set call api or not
  // const [isSubmit, setIsSubmit] = useState<any>(undefined);
  // // list of file when call api upload-multiple-file
  // const [submitFile, setSubmitFile] = useState<any>([]);
  // // list of link response of api upload-multiple-file
  // const [responseLink, setResponseLink] = useState<any>(undefined);
  // // list new situation
  // const [newSituationFile, setNewSituationFile] = useState<ISituation[]>([]);
  // // list option of situation checkbox
  // const [options, setOptions] = useState([]);
  // const [rerenderData, setRerenderData] = useState<any>(null);

  /** Left side */
  // CMND state
  // list initial cmnd
  const [cmndList, setCmndList] = useState<any>([]);
  // list temp cmnd id
  const [tempId, setTempId] = useState<any>([]);
  // list of cmnd upload to get link
  const [fileCmndList, setFileCmndList] = useState<any>(null);
  // list submit cmnd
  const [submitCmndList, setSubmitCmndList] = useState<any>([]);
  // set update cmnd or not
  const [isUpdateCmnd, setIsUpdateCmnd] = useState<any>(undefined);
  // set can submit cmnd after get links
  const [isSubmitCmnd, setIsSubmitCmnd] = useState<any>(undefined);
  // set can update cmnd after changing files
  const [canUpdateCmnd, setCanUpdateCmnd] = useState(false);

  // Base situation list
  // list initial situation
  const [situationList, setSituationList] = useState<any>([]);
  // id of situation that user want to delete
  const [deleteId, setDeleteId] = useState<any>(undefined);
  // set call api delete or not
  const [isDelete, setIsDelete] = useState<any>(undefined);
  // id of situation that user want to update
  const [updateId, setUpdateId] = useState<any>(undefined);
  // set call api update or not
  const [isUpdate, setIsUpdate] = useState<any>(undefined);
  // list of checkbox selected
  const [selectedList, setSelectedList] = useState<any>([]);

  /** Dialog */
  // dialog infor data
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDescription, setDialogDescription] = useState("");
  // open infor dialog or not
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  // open confirm dialog or not
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  // open warning dialog when not enough form
  const [openWarnDialog, setOpenWarnDialog] = useState(false);
  // set warning dialog has 2 buttons or not
  const [hasButtons, setHasButtons] = useState(false);

  useEffect(() => {
    if (userData) {
      const cmnd = userData?.UserMedia?.filter(
        (data: any) => data.type === "3"
      );
      if (cmnd && cmnd?.length === 2) {
        setCmndList([
          {
            name: `CMND mặt 1`,
            status: "done",
            url: cmnd[0].link,
            id: cmnd[0].id,
          },
          {
            name: `CMND mặt 2`,
            status: "done",
            url: cmnd[1].link,
            id: cmnd[1].id,
          },
        ]);

        setSubmitCmndList([
          {
            name: `CMND mặt 1`,
            status: "done",
            url: cmnd[0].link,
            id: cmnd[0].id,
          },
          {
            name: `CMND mặt 2`,
            status: "done",
            url: cmnd[1].link,
            id: cmnd[1].id,
          },
        ]);

        setTempId([cmnd[0].id, cmnd[1].id]);
      }
      const situation = userData?.BadLuckTypes;
      setSituationList(userData.BadLuckTypes);
      const formatSituation = userData.BadLuckTypes?.map((blt: any) => ({
        id: blt.id,
        files: blt.BadLuckMedia?.map((blm: any) => ({
          id: blm.id,
          link: blm.link,
        })),
      }));

      if (badluckerType && badluckerType?.length > 0) {
        const newArr = badluckerType?.filter((blk: any) => {
          return !situation?.some((s: any) => s.situationId === blk.id);
        });
        const optionRes = newArr?.map((opt: any, index: number) => ({
          value: opt.name,
          label: opt.name,
          index: index,
          message: opt.message,
          id: opt.id,
        }));
        // setOptions(optionRes);
        setSelectedList([]);
      }
    }
  }, [userData, badluckerType]);

  /** Function about base situations */

  // get initial Situation text
  const getSituationText = (type: number, situationId: string) => {
    // 1: title - 2: message
    const text = badluckerType?.find((type: any) => type.id === situationId);
    return type === 1 ? text.name : text.message;
  };

  // get initial Situation media
  const getSituationMedia = (data: any, text: string) => {
    const situationMedia = data?.map((media: any, index: number) => ({
      name: `Giấy xác nhận ${text}`,
      status: "done",
      url: media.link,
    }));
    return situationMedia;
  };

  // render initial Situation
  const renderSituation = () => {
    return situationList?.map((s: any, index: number) => {
      return (
        <div
          className="profile-situation__container__list-situation__situation"
          key={index}
        >
          <div className="profile-situation__container__list-situation__situation__wrapper">
            <div>{getSituationText(1, s.situationId)}</div>
            <Button
              onClick={() => {
                setUpdateId(+s.id);
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
              // defaultFileList={getSituationMedia(
              //   s.BadLuckMedia,
              //   getSituationText(2, s.situationId)
              // )}
              fileList={getSituationMedia(
                s.BadLuckMedia,
                getSituationText(2, s.situationId)
              )}
              className="profile-situation__container__list-situation__situation__upload__component"
              onChange={(e) => onSituationChange(e, s)}
              customRequest={dummyRequest}
              isImageUrl={(file: any) => true}
            >
              <Button>+ Tải thêm</Button>
            </Upload>
          </div>
        </div>
      );
    });
  };

  const onSituationChange = ({ fileLsit: newFileList }: any, data: any) => {
    // console.log(situationList);
    // console.log(newFileList);
    // console.log(data);
    // const param = {
    //   badLuckerTypeId: data.id,
    // };
  };

  const { data: deletedSituation, loading: loadingDeleteSituation } =
    useFetch<any>(
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
      (e) => {
        const action = getUserById(e.data);
        dispatch(action);
        // setSituationList(e.data.BadLuckTypes);
        setIsDelete(undefined);
        setDeleteId(undefined);
        setDialogTitle("Xóa hoàn cảnh thành công!");
        setOpenDialog(true);
      }
    );

  /** Functions about CMND */
  // when user change cmnd files
  const onCmndChange = ({ fileList: newFileList }: any) => {
    // const cmndList
    setCmndList(newFileList);
    let data = new FormData();
    const modifyCmnd = newFileList?.map((f: any, index: number) => {
      if (!f.lastModified) {
        return { id: tempId[index], link: f.url };
      } else {
        data.append("files", f.originFileObj);
        return { id: tempId[index], file: f.originFileObj };
      }
    });
    setFileCmndList(data);
    setSubmitCmndList(modifyCmnd);
    setCanUpdateCmnd(true);
  };

  // when user update cmnd files
  const onCmndUpdate = () => {
    if (submitCmndList?.length < 2) {
      setOpenWarnDialog(true);
    } else {
      setIsUpdateCmnd(true);
    }
  };

  const { data: linkCmnd, loading: loadingGetLinkCmnd } = useFetch<any>(
    "image/upload-multiple-file",
    {},
    false,
    [isUpdateCmnd],
    {
      method: "POST",
      body: fileCmndList,
    },
    (e) => {
      setIsUpdateCmnd(undefined);
      let modifyList;
      if (e.data?.length === 1) {
        modifyList = submitCmndList?.map((cmnd: any) => {
          return cmnd.file ? { id: cmnd.id, link: e.data[0] } : cmnd;
        });
      } else {
        modifyList = submitCmndList?.map((cmnd: any, index: number) => {
          return { id: cmnd.id, link: e.data[index] };
        });
      }
      setSubmitCmndList(modifyList);

      setIsSubmitCmnd(true);
    }
  );

  const { data: updateCmnd, loading: loadingUpdateCmnd } = useFetch<any>(
    "users/update-identity-image",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [isSubmitCmnd],
    {
      method: "PUT",
      body: JSON.stringify(submitCmndList),
    },
    (e) => {
      setIsSubmitCmnd(undefined);
      setDialogTitle("Cập nhật CMND thành công!");
      setOpenDialog(true);
    }
  );

  /**  Fucntion about new situation **/
  // when user change new situation
  const onNewSituationChange = (value: any) => {
    setSelectedList(value);
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

  const [options, setOptions] = useState<any>([]);
  const [situationFile, setSituationFile] = useState<ISituation[]>([]);

  const [linkSituationObject, setLinkSituationObject] = useState<any>({});

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

  return (
    <>
      <AppDialog
        type="infor"
        title={dialogTitle}
        description={dialogDescription}
        confirmText={Message.INFOR_CF_01}
        onConfirm={() => {
          if (dialogTitle === "Bạn đã gửi đơn xác nhận hộ nghèo thành công") {
            setOpenDialog(false);
            // const action = getUserById(rerenderData);
            // dispatch(action);
          } else {
            setOpenDialog(false);
          }
        }}
        visible={openDialog}
        onCancel={() => setOpenDialog(false)}
      />
      <AppDialog
        type="confirm"
        title={"Bạn chắc chắn muốn cập nhật các giấy tờ này chứ?"}
        confirmText={"Xác nhận"}
        cancelText={"Đóng"}
        onConfirm={() => {
          setIsUpdate(true);
          setOpenConfirmDialog(false);
        }}
        onClose={() => {
          setOpenConfirmDialog(false);
        }}
        visible={openConfirmDialog}
        onCancel={() => setOpenConfirmDialog(false)}
      />
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
          if (hasButtons) {
            setIsDelete(true);
          }
          setHasButtons(false);
          setOpenWarnDialog(false);
        }}
        onClose={() => {
          setHasButtons(false);
          setOpenWarnDialog(false);
        }}
        visible={openWarnDialog}
        onCancel={() => setOpenWarnDialog(false)}
      />
      {(loadingDeleteSituation || loadingGetLinkCmnd || loadingUpdateCmnd) && (
        <AppLoading loadingContent={<div></div>} showContent={false} />
      )}
      <div className="profile-situation">
        <div className="profile-situation__container">
          <div className="profile-situation__container__list-situation">
            <div className="profile-situation__container__list-situation__title">
              Hoàn cảnh của bạn ({situationList?.length})
            </div>
            <div className="profile-situation__container__list-situation__cmnd">
              <div className="profile-situation__container__list-situation__cmnd__title-wrapper">
                <div>Chứng minh nhân dân</div>
                <Button
                  onClick={() => {
                    onCmndUpdate();
                  }}
                  disabled={!canUpdateCmnd}
                >
                  Cập nhật
                </Button>
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
                  onChange={onCmndChange}
                  maxCount={2}
                  isImageUrl={(file: any) => true}
                >
                  <Button>+ Tải thêm</Button>
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
                  // checkSituationUpload();
                }}
              >
                Xác nhận
              </Button>
            </div>
            <div className="profile-situation__container__add-situation__cascader">
              <div className="profile-situation__container__add-situation__cascader__text">
                Bạn hãy chọn những hoàn cảnh phù hợp với hoàn cảnh của bạn :
              </div>
              <Cascader
                // options={options}
                onChange={onNewSituationChange}
                value={selectedList}
                style={{ width: "100%" }}
                dropdownClassName="profile-situation-dropdown"
                className="profile-situation__container__add-situation__cascader__cascader"
                multiple
                maxTagCount={0}
                maxTagPlaceholder={
                  <div>
                    <Tag
                      closable
                      onClose={() => {
                        setSelectedList([]);
                        // setNewSituationFile([]);
                      }}
                      color="#108ee9"
                    >
                      {selectedList?.length}
                    </Tag>
                    Hoàn cảnh
                  </div>
                }
                dropdownStyle={{ width: "100%" }}
              />
              <div className="profile-situation__container__add-situation__cascader__tags">
                {renderTag()}
              </div>
              {/* {renderProof()} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSituation;

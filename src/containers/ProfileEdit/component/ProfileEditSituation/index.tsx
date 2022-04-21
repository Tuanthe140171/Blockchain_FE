import { Button, Cascader, Divider, Tag, Upload } from "antd";
import { id } from "ethers/lib/utils";
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
      setSituationList(userData?.BadLuckTypes);

      // do not delete this
      const formatSituation = userData.BadLuckTypes?.map((blt: any) => {
        const links = blt?.BadLuckMedia?.map((media: any) => ({
          id: media?.id,
          link: media?.link,
        }));
        const ids = blt?.BadLuckMedia?.map((media: any) => {
          return media?.id;
        });
        linkOldSituationObject[blt?.situationId] = links;
        originOldSituationObject[blt?.situationId] = ids;
        setLinkOldSituationObject(linkOldSituationObject);
        setOriginOldSituationObject(originOldSituationObject);
      });

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
        setOptions(optionRes);
        setSelectedList([]);
      }
    }
  }, [userData, badluckerType]);

  // get initial Situation text
  const getSituationText = (type: number, situationId: string) => {
    // 1: title - 2: message
    const text = badluckerType?.find((type: any) => type.id === situationId);
    return type === 1 ? text?.name : text?.message;
  };

  // Base situation list
  // list initial situation
  const [situationList, setSituationList] = useState<any>([]);
  // id of situation that user want to delete
  const [deleteId, setDeleteId] = useState<any>(undefined);
  const [updateId, setUpdateId] = useState<any>(undefined);
  const [tempUpdateId, setTempUpdateId] = useState<any>(undefined);
  // set call api delete or not
  const [isDelete, setIsDelete] = useState<any>(undefined);
  const [isUpdate, setIsUpdate] = useState<any>(undefined);
  const [updateObject, setUpdateObject] = useState<any>(undefined);
  const getSituationMedia = (data: any, text: string) => {
    const situationMedia = data?.map((media: any, index: number) => ({
      uid: media.id,
      name: `Giấy xác nhận ${text}`,
      status: "done",
      url: media.link,
    }));
    return situationMedia;
  };

  const [oldSituationTempId, setOldSituationTempId] = useState<any>(0);
  const [oldSituationTemp, setOldSituationTemp] = useState<any>([]);
  const [linkOldSituationObject, setLinkOldSituationObject] = useState<any>({});
  const [originOldSituationObject, setOriginOldSituationObject] = useState<any>(
    {}
  );
  const [oldSituationUpload, setOldSituationUpload] = useState<any>(undefined);

  // const onOldSituationChange = ({ fileLsit: newFileList }: any, data: any) => {
  const onOldSituationChange = (fileList: any, file: any, data: any) => {
    if (fileList.length === 0) {
      linkOldSituationObject[data.situationId] = [];
      setLinkOldSituationObject(linkOldSituationObject);
      return;
    }
    if (file.status === "removed") {
      if (file.originFileObj) {
        const newObj = linkOldSituationObject[data.situationId]?.filter(
          (obj: any) => obj.uid !== file.uid
        );
        linkOldSituationObject[data.situationId] = newObj;
        setLinkOldSituationObject(linkOldSituationObject);
        return;
      } else {
        const newObj1 = linkOldSituationObject[data.situationId]?.filter(
          (obj: any) => obj.id !== file.uid
        );
        linkOldSituationObject[data.situationId] = newObj1;
        setLinkOldSituationObject(linkOldSituationObject);
        return;
      }
    }
    if (file.status === "done") {
      setOldSituationTempId(data.situationId);
      setOldSituationTemp(file);
    }
  };

  useEffect(() => {
    if (oldSituationTemp && oldSituationTempId !== 0) {
      let data = new FormData();
      data.append("files", oldSituationTemp.originFileObj);
      setOldSituationUpload(data);
    }
  }, [oldSituationTemp]);

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
            <div>
              <Button
                onClick={() => {
                  setUpdateId(+s.id);
                  setTempUpdateId(+s.situationId);
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
                style={{ marginLeft: "20px" }}
              >
                Xóa
              </Button>
            </div>
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
              onChange={({ fileList, file }) =>
                onOldSituationChange(fileList, file, s)
              }
              customRequest={dummyRequest}
              isImageUrl={(file: any) => true}
              maxCount={5}
            >
              <Button>+ Tải thêm</Button>
            </Upload>
          </div>
        </div>
      );
    });
  };

  const { data: uploadOldSituationData, loading: loadingOldSituation } =
    useFetch<any>(
      "image/upload-multiple-file",
      {},
      false,
      [oldSituationUpload],
      {
        method: "POST",
        body: oldSituationUpload,
      },
      (e) => {
        linkOldSituationObject[oldSituationTempId].push({
          id: "0",
          link: e.data[0],
          uid: oldSituationTemp.uid,
        });
        setLinkOldSituationObject(linkOldSituationObject);
        setOldSituationUpload(undefined);
      }
    );

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
        setIsDelete(undefined);
        setDeleteId(undefined);
        setDialogTitle("Xóa hoàn cảnh thành công!");
        setOpenDialog(true);
      }
    );

  const { data: updateSituation, loading: loadingUpdateSituation } =
    useFetch<any>(
      "bad-lucker/edit-badlucker-image",
      {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      false,
      [isUpdate],
      {
        method: "POST",
        body: JSON.stringify(updateObject),
      },
      (e) => {
        console.log(e.data);
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

  /**
   * New situation
   */
  const [options, setOptions] = useState<any>([]);
  const [situationFile, setSituationFile] = useState<ISituation[]>([]);
  const [submitAll, setSubmitAll] = useState<any>(null);
  const [selectedList, setSelectedList] = useState<any>([]);
  const [isSubmit, setIsSubmit] = useState<any>(undefined);
  const [tempSituationId, setTempSituationId] = useState<any>(0);
  const [tempSituation, setTempSituation] = useState<any>([]);
  const [fileSituationUpload, setFileSituationUpload] =
    useState<any>(undefined);
  const [linkSituationObject, setLinkSituationObject] = useState<any>({});

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

  const onTagClose = (e: any, index: any) => {
    const pos = options?.find((option: any) => option.value === e[0])?.id;
    delete linkSituationObject[pos];
    const itemPos = selectedList.indexOf(e);
    const { [itemPos]: item, ...rest } = selectedList;
    setSelectedList(Object.values(rest));
    if (situationFile.some((s: any) => s.value === e[0])) {
      setSituationFile(situationFile.filter((s: any) => s.value !== e[0]));
    }
    return;
  };

  const onChange = (value: any) => {
    const listId = value.map(
      (val: any) => options?.find((op: any) => op.value === val[0])?.id
    );
    if (Object.keys(linkSituationObject).length < listId.length) {
      for (let i = 0; i < listId.length; i++) {
        if (!linkSituationObject[listId[i]]) {
          linkSituationObject[listId[i]] = [];
        }
      }
    } else {
      delete linkSituationObject[
        `${Object.keys(linkSituationObject)?.find(
          (val) => !listId.includes(val)
        )}`
      ];
    }
    setSelectedList(value);
  };

  const onSituationUpload = ({ fileList: newFileList }: any, id: any) => {
    setTempSituationId(id);
    setTempSituation(newFileList);
  };

  useEffect(() => {
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

  const handleSubmit = () => {
    if (
      Object.keys(linkSituationObject).length === 0 ||
      Object.keys(linkSituationObject).some(
        (value) => linkSituationObject[value].length < 1
      )
    ) {
      setOpenWarnDialog(true);
    } else {
      const situationData = Object.keys(linkSituationObject).map((value) => {
        return {
          id: value,
          link: linkSituationObject[value],
        };
      });
      const combineData = {
        badLuckType: situationData,
      };
      setSubmitAll(combineData);
      setIsSubmit(true);
    }
  };

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
    (e) => {
      const action = getUserById(e.data);
      dispatch(action);
      setIsSubmit(undefined);
      setDialogTitle("Bạn đã gửi đơn xác nhận hộ nghèo thành công!");
      setOpenDialog(true);
    }
  );

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
          <div
            className="profile-situation__container__list-situation__cmnd__upload"
            key={option?.index}
          >
            <Button
              type="text"
              className="profile-situation__container__list-situation__cmnd__upload__title"
            >
              Giấy chứng nhận {option?.message}
            </Button>
            <div className="profile-drawer__cmnd__wrapper">
              <Upload
                listType="picture"
                className="profile-situation__container__list-situation__cmnd__upload__component"
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

  return (
    <>
      <AppDialog
        type="infor"
        title={dialogTitle}
        description={dialogDescription}
        confirmText={Message.INFOR_CF_01}
        onConfirm={() => {
          setOpenDialog(false);
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
          const newSituation = linkOldSituationObject[tempUpdateId]?.filter(
            (situation: any) => {
              if (situation.id === "0") {
                return { id: situation.id, link: situation.link };
              }
            }
          );
          const deleteSituation = originOldSituationObject[tempUpdateId]
            ?.filter(
              (id: any) =>
                !linkOldSituationObject[tempUpdateId]?.some(
                  (situation: any) => situation.id === id
                )
            )
            ?.map((id: any) => ({ id: id }));

          const finalArray = newSituation.concat(deleteSituation);

          const object = {
            badLuckerTypeId: updateId,
            images: finalArray,
          };
          setUpdateObject(object);
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
      {(loadingOldSituation ||
        loadingDeleteSituation ||
        loadingUpdateSituation ||
        loadingGetLinkCmnd ||
        loadingUpdateCmnd ||
        loadingSituation) && (
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
                  {cmndList.length === 2 ? null : <Button>+ Tải thêm</Button>}
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
                disabled={!selectedList.length}
                onClick={() => {
                  handleSubmit();
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
                options={options}
                onChange={onChange}
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
                        setSituationFile([]);
                      }}
                      color="#108ee9"
                    >
                      {selectedList?.length}
                    </Tag>
                    Hoàn cảnh
                  </div>
                }
                dropdownStyle={{ width: "80%" }}
              />
              <div className="profile-situation__container__add-situation__cascader__tags">
                {renderTag()}
              </div>
              {renderProof()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSituation;

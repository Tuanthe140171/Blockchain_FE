import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Card, Image, Input, Modal, Radio } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AppDialog from "../../../../../../components/AppDialog";
import AppLoading from "../../../../../../components/AppLoading";
import useFetch from "../../../../../../hooks/useFetch";
import "./index.scss";

type IPayment = {
  id: string;
  type: number;
  number: string;
  bankUsername: string;
  enable: number;
};

const ProfileSocialPayment = () => {
  const { id } = useParams();
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openChangeModal, setOpenChangeModal] = useState(false);
  const [tempData, setTempData] = useState<any>(null);
  const [tempDataList, setTempDataList] = useState([]);
  const [paymentList, setPaymentList] = useState<any>([]);
  const [title, setTitle] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openNotiDialog, setOpenNotiDialog] = useState(false);
  const [openWarningDialog, setOpenWarningDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(1);
  const [isAdd, setIsAdd] = useState<any>(undefined);
  const [isModify, setIsModify] = useState<any>(undefined);
  const [isDelete, setIsDelete] = useState<any>(undefined);
  const [isSelect, setIsSelect] = useState<any>(undefined);
  const [newName, setNewName] = useState("");
  const [newAccount, setNewAccount] = useState("");

  const { data: paymentData, loading: loadingPayment } = useFetch(
    `payment/get-payment-by-user`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [],
    {},
    (e) => {
      const newList = e.data.map((data: any) => {
        return {
          name: data.bankUsername,
          account: data.number,
          check: data.enable,
          id: data.id,
        };
      });
      setPaymentList(newList);
    }
  );

  // Add payment
  const { data: paymentAddData, loading: loadingAddPayment } = useFetch(
    `payment/modify-payment`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [isAdd],
    {
      method: "POST",
      body: JSON.stringify([
        {
          id: 0,
          type: 1,
          number: newAccount,
          bankName: "",
          bankBranch: "",
          bankUsername: newName,
          enable: paymentList.length === 0 ? 1 : 0,
        },
      ]),
    },
    (e) => {
      setIsAdd(undefined);
      const newList = e.data.map((data: any) => {
        return {
          name: data.bankUsername,
          account: data.number,
          check: data.enable,
          id: data.id,
        };
      });
      setPaymentList(newList);
      setTitle("Th??m t??i kho???n th??nh c??ng");
      setOpenDialog(true);
    }
  );

  // Modify payment
  const { data: paymentModifyData, loading: loadingModifyPayment } = useFetch(
    `payment/modify-payment`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [isModify],
    {
      method: "POST",
      body: JSON.stringify([
        {
          id: tempData?.id,
          type: 1,
          number: tempData?.account,
          bankName: "",
          bankBranch: "",
          bankUsername: tempData?.name,
          enable: tempData?.check,
        },
      ]),
    },
    (e) => {
      setIsModify(undefined);
      const newList = e.data.map((data: any) => {
        return {
          name: data.bankUsername,
          account: data.number,
          check: data.enable,
          id: data.id,
        };
      });
      setPaymentList(newList);
      setTitle("C???p nh???t ph????ng th???c th??nh c??ng!");
      setOpenDialog(true);
    }
  );

  // Delete payment
  const { data: paymentDeleteData, loading: loadingDeletePayment } = useFetch(
    `payment/modify-payment`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [isDelete],
    {
      method: "POST",
      body: JSON.stringify([
        {
          id: deleteId,
          delete: 1,
        },
      ]),
    },
    (e) => {
      setIsDelete(undefined);
      const newList = e.data.map((data: any) => {
        return {
          name: data.bankUsername,
          account: data.number,
          check: data.enable,
          id: data.id,
        };
      });
      setPaymentList(newList);
      setTitle("G??? t??i kho???n th??nh c??ng");
      setOpenDialog(true);
    }
  );

  // Select payment
  const { data: paymentSelectData, loading: loadingSelectPayment } = useFetch(
    `payment/modify-payment`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [isSelect],
    {
      method: "POST",
      body: JSON.stringify(
        tempDataList.map((dt: any) => {
          return {
            id: dt?.id,
            type: 1,
            number: dt?.account,
            bankName: "",
            bankBranch: "",
            bankUsername: dt?.name,
            enable: dt?.check,
          };
        })
      ),
    },
    (e) => {
      setIsSelect(undefined);
      const newList = e.data.map((data: any) => {
        return {
          name: data.bankUsername,
          account: data.number,
          check: data.enable,
          id: data.id,
        };
      });
      setPaymentList(newList);
    }
  );

  const [openDialogCondition, setOpenDialogCondition] = useState(false);

  return (
    <>
      {(loadingAddPayment ||
        loadingModifyPayment ||
        loadingDeletePayment ||
        loadingSelectPayment ||
        loadingPayment) && (
        <AppLoading showContent={false} loadingContent={<div></div>} />
      )}
      <AppDialog
        type="warning"
        title={"Vui l??ng ??i???n tr?????ng c??n thi???u!"}
        description=""
        confirmText="X??c nh???n"
        onConfirm={() => {
          setOpenDialogCondition(false);
        }}
        visible={openDialogCondition}
        onCancel={() => setOpenDialogCondition(false)}
      />
      <Modal
        title="Th??m ph????ng th???c thanh to??n"
        visible={openPaymentModal}
        onOk={() => {
          if (!newAccount || !newName) {
            setOpenDialogCondition(true);
          } else {
            setIsAdd(true);
            setOpenPaymentModal(false);
          }
        }}
        onCancel={() => setOpenPaymentModal(false)}
        cancelText="????ng"
        okText="Th??m"
        className="profile-social-modal"
      >
        <div className="profile-social-modal__line">
          <p>Ph????ng th???c:</p>
          <Image
            src="/icon/logo-momo-png-1.png"
            width={40}
            height={40}
            className="profile-social-modal__line__right"
            preview={false}
          />
        </div>
        <div className="profile-social-modal__line">
          <p>S??? t??i kho???n:</p>
          <Input
            placeholder="S??? t??i kho???n"
            type={"number"}
            minLength={10}
            maxLength={10}
            min="0"
            className="profile-social-modal__line__right"
            onChange={(e) => setNewAccount(e.target.value)}
          />
        </div>
        <div className="profile-social-modal__line">
          <p>T??n ch??? t??i kho???n:</p>
          <Input
            placeholder="T??n ch??? t??i kho???n"
            className="profile-social-modal__line__right"
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
      </Modal>
      <Modal
        title="Thay ?????i th??ng tin"
        visible={openChangeModal}
        onOk={() => {
          if (!tempData.account || !tempData.name) {
            setOpenDialogCondition(true);
          } else {
            setIsModify(true);
            setOpenChangeModal(false);
          }
        }}
        onCancel={() => setOpenChangeModal(false)}
        cancelText="H???y"
        okText="Thay ?????i"
        className="profile-social-modal"
      >
        <div className="profile-social-modal__line">
          <p>Ph????ng th???c:</p>
          <Image
            src="/icon/logo-momo-png-1.png"
            width={40}
            height={40}
            className="profile-social-modal__line__right"
            preview={false}
          />
        </div>
        <div className="profile-social-modal__line">
          <p>S??? t??i kho???n:</p>
          <Input
            placeholder="S??? t??i kho???n"
            className="profile-social-modal__line__right"
            value={tempData?.account}
            onChange={(e) =>
              setTempData({ ...tempData, account: e.target.value })
            }
          />
        </div>
        <div className="profile-social-modal__line">
          <p>T??n ch??? t??i kho???n:</p>
          <Input
            placeholder="T??n ch??? t??i kho???n"
            className="profile-social-modal__line__right"
            value={tempData?.name}
            onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
          />
        </div>
      </Modal>
      <AppDialog
        type="infor"
        title={title}
        description=""
        confirmText="X??c nh???n"
        onConfirm={() => {
          setOpenPaymentModal(false);
          setOpenDialog(false);
        }}
        visible={openDialog}
        onCancel={() => setOpenDialog(false)}
      />
      <AppDialog
        type="warning"
        title="B???n c?? ch???c mu???n g??? b??? t??i kho???n n??y kh??ng?"
        description=""
        confirmText="G??? b???"
        cancelText="H???y"
        onConfirm={() => {
          setIsDelete(true);
          setOpenWarningDialog(false);
        }}
        onClose={() => {
          setOpenWarningDialog(false);
        }}
        visible={openWarningDialog}
        onCancel={() => setOpenWarningDialog(false)}
      />
      <AppDialog
        type="warning"
        title="T??i kho???n hi???n ??ang ???????c s??? d???ng!"
        description="Vui l??ng chuy???n sang t??i kho???n kh??c"
        confirmText="?????ng ??"
        onConfirm={() => {
          setOpenNotiDialog(false);
        }}
        visible={openNotiDialog}
        onCancel={() => setOpenNotiDialog(false)}
      />
      <div className="profile-social-payment-wrapper">
        <div className="profile-social-payment">
          <header className="profile-social-payment__header">
            <p className="payment-header__title">Ph????ng th???c thanh to??n</p>
            {id ? null : (
              <span
                className="personal-header__edit"
                onClick={() => setOpenPaymentModal(true)}
              >
                Th??m
              </span>
            )}
          </header>
          <div className="profile-social-payment__divider" />
          <div className="profile-social-payment__details">
            {paymentList.map((payment: any) => {
              return (
                <Card
                  key={payment.id}
                  hoverable
                  style={{ width: 240 }}
                  className="profile-social-payment__details__card"
                  cover={<img alt="example" src="/icon/logo-momo-png-1.png" />}
                  actions={[
                    <EditOutlined
                      key="edit"
                      onClick={() => {
                        setTempData(payment);
                        setOpenChangeModal(true);
                      }}
                    />,
                    <DeleteOutlined
                      key="delete"
                      onClick={() => {
                        if (payment.check === 1) {
                          setOpenNotiDialog(true);
                        } else {
                          setDeleteId(payment.id);
                          setOpenWarningDialog(true);
                        }
                      }}
                    />,
                  ]}
                >
                  <div className="profile-social-payment__details__info">
                    <Meta title={payment.name} description={payment.account} />
                    <div
                      style={{
                        width: "50px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Radio
                        checked={payment.check}
                        className="profile-social-payment__details__info__check"
                        onClick={() => {
                          const newList = paymentList.map((p: any) => {
                            if (payment.id === p.id) {
                              return { ...p, check: 1 };
                            } else {
                              return { ...p, check: 0 };
                            }
                          });
                          setTempDataList(newList);
                          setIsSelect(true);
                        }}
                      />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSocialPayment;

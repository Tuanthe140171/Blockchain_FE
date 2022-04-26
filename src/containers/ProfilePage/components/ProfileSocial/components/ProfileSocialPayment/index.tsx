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
      setTitle("Thêm tài khoản thành công");
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
      setTitle("Cập nhật phương thức thành công!");
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
      setTitle("Gỡ tài khoản thành công");
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
        title={"Vui lòng điền trường còn thiếu!"}
        description=""
        confirmText="Xác nhận"
        onConfirm={() => {
          setOpenDialogCondition(false);
        }}
        visible={openDialogCondition}
        onCancel={() => setOpenDialogCondition(false)}
      />
      <Modal
        title="Thêm phương thức thanh toán"
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
        cancelText="Đóng"
        okText="Thêm"
        className="profile-social-modal"
      >
        <div className="profile-social-modal__line">
          <p>Phương thức:</p>
          <Image
            src="/icon/logo-momo-png-1.png"
            width={40}
            height={40}
            className="profile-social-modal__line__right"
            preview={false}
          />
        </div>
        <div className="profile-social-modal__line">
          <p>Số tài khoản:</p>
          <Input
            placeholder="Số tài khoản"
            type={"number"}
            minLength={10}
            maxLength={10}
            min="0"
            className="profile-social-modal__line__right"
            onChange={(e) => setNewAccount(e.target.value)}
          />
        </div>
        <div className="profile-social-modal__line">
          <p>Tên chủ tài khoản:</p>
          <Input
            placeholder="Tên chủ tài khoản"
            className="profile-social-modal__line__right"
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
      </Modal>
      <Modal
        title="Thay đổi thông tin"
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
        cancelText="Hủy"
        okText="Thay đổi"
        className="profile-social-modal"
      >
        <div className="profile-social-modal__line">
          <p>Phương thức:</p>
          <Image
            src="/icon/logo-momo-png-1.png"
            width={40}
            height={40}
            className="profile-social-modal__line__right"
            preview={false}
          />
        </div>
        <div className="profile-social-modal__line">
          <p>Số tài khoản:</p>
          <Input
            placeholder="Số tài khoản"
            className="profile-social-modal__line__right"
            value={tempData?.account}
            onChange={(e) =>
              setTempData({ ...tempData, account: e.target.value })
            }
          />
        </div>
        <div className="profile-social-modal__line">
          <p>Tên chủ tài khoản:</p>
          <Input
            placeholder="Tên chủ tài khoản"
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
        confirmText="Xác nhận"
        onConfirm={() => {
          setOpenPaymentModal(false);
          setOpenDialog(false);
        }}
        visible={openDialog}
        onCancel={() => setOpenDialog(false)}
      />
      <AppDialog
        type="warning"
        title="Bạn có chắc muốn gỡ bỏ tài khoản này không?"
        description=""
        confirmText="Gỡ bỏ"
        cancelText="Hủy"
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
        title="Tài khoản hiện đang được sử dụng!"
        description="Vui lòng chuyển sang tài khoản khác"
        confirmText="Đồng ý"
        onConfirm={() => {
          setOpenNotiDialog(false);
        }}
        visible={openNotiDialog}
        onCancel={() => setOpenNotiDialog(false)}
      />
      <div className="profile-social-payment-wrapper">
        <div className="profile-social-payment">
          <header className="profile-social-payment__header">
            <p className="payment-header__title">Phương thức thanh toán</p>
            {id ? null : (
              <span
                className="personal-header__edit"
                onClick={() => setOpenPaymentModal(true)}
              >
                Thêm
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

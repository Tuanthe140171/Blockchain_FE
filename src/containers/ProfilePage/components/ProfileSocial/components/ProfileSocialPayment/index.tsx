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
import "./index.scss";

const ProfileSocialPayment = () => {
  const { id } = useParams();
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openChangeModal, setOpenChangeModal] = useState(false);
  const [tempData, setTempData] = useState({
    name: "Công ty mặt trời xanh",
    account: "0961249543",
    check: true,
    id: 1,
  });
  const [openWarningDialog, setOpenWarningDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(1);

  const [paymentList, setPaymentList] = useState([
    {
      name: "Công ty mặt trời xanh",
      account: "0961249543",
      check: true,
      id: 1,
    },
    {
      name: "Công ty mặt trời vàng",
      account: "0123456789",
      check: false,
      id: 2,
    },
    {
      name: "Công ty mặt trời vàng",
      account: "0198765314",
      check: false,
      id: 3,
    },
  ]);

  return (
    <>
      <Modal
        title="Thêm phương thức thanh toán"
        visible={openPaymentModal}
        onOk={() => setOpenPaymentModal(false)}
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
            className="profile-social-modal__line__right"
          />
        </div>
        <div className="profile-social-modal__line">
          <p>Tên chủ tài khoản:</p>
          <Input
            placeholder="Tên chủ tài khoản"
            className="profile-social-modal__line__right"
          />
        </div>
      </Modal>
      {openWarningDialog ? (
        <AppDialog
          type="infor"
          title="Bạn có chắc muốn gỡ bỏ tài khoản này không?"
          description=""
          confirmText="Gỡ bỏ"
          cancelText="Hủy"
          onConfirm={() => {
            let index = paymentList.findIndex((payment) => {
              return payment.id === deleteId;
            });
            paymentList.splice(index, 1);
            setOpenWarningDialog(false);
          }}
          onClose={() => {
            setOpenWarningDialog(false);
          }}
        />
      ) : null}
      <Modal
        title="Thay đổi thông tin"
        visible={openChangeModal}
        onOk={() => {
          const newArr = paymentList.map((obj) => {
            if (tempData.id === obj.id) {
              return tempData;
            } else {
              return obj;
            }
          });
          setPaymentList(newArr);
          setOpenChangeModal(false);
        }}
        onCancel={() => setOpenChangeModal(false)}
        cancelText="Hủy"
        okText="Lưu"
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
            value={tempData.account}
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
            value={tempData.name}
            onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
          />
        </div>
      </Modal>
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
                        setDeleteId(payment.id);
                        setOpenWarningDialog(true);
                      }}
                    />,
                  ]}
                >
                  <div className="profile-social-payment__details__info">
                    <Meta title={payment.name} description={payment.account} />
                    <Radio
                      checked={payment.check}
                      className="profile-social-payment__details__info__check"
                    ></Radio>
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

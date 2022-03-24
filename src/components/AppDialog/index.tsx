import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal } from "antd";
import React from "react";
import "./index.scss";

type IDialogType = "warning" | "confirm" | "infor";

type AppDialogProps = {
  type: IDialogType;
  title: string;
  description: any;
  cancelText?: string;
  confirmText?: string;
  onClose?: any;
  onConfirm?: any;
  content?: any;
};

const AppDialog: React.FC<AppDialogProps> = (props) => {
  const {
    title,
    description,
    type,
    cancelText,
    confirmText,
    onClose,
    onConfirm,
    content
  } = props;

  const renderIcon = () => {
    if (type === "infor") {
      return (
        <CheckCircleOutlined style={{ color: "#52BFD6", fontSize: "100px" }} />
      );
    } else if (type === "confirm") {
      return (
        <QuestionCircleOutlined
          style={{ color: "#7b61ff", fontSize: "100px" }}
        />
      );
    }
    return (
      <ExclamationCircleOutlined
        style={{ color: "#ea6a3f", fontSize: "100px" }}
      />
    );
  };

  const renderButtons = () => {
    if (type === "infor") {
      return (
        <div className="app-dialog__button">
          <Button className="app-dialog__button__btn-infor" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      );
    }
    return (
      <div className="app-dialog__buttons">
        <Button className="app-dialog__buttons__btn-cancel" onClick={onClose}>
          {cancelText}
        </Button>
        <Button
          className={`app-dialog__buttons__btn-${
            type === "confirm" ? "confirm" : "warning"
          }`}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </div>
    );
  };

  return (
    <Modal
      visible
      centered
      closable={false}
      footer={null}
      bodyStyle={{ height: "440px" }}
      width={720}
    >
      <div className="app-dialog">
        {renderIcon()}
        <div className="app-dialog__title">{title}</div>
        <div className="app-dialog__description">{description}</div>
        {content ? content: renderButtons()}
      </div>
    </Modal>
  );
};

export default AppDialog;

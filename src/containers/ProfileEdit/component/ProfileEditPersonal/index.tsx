import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Radio, Row, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useState } from "react";
import { useWeb3React } from "web3-react-core";
import useFetch from "../../../../hooks/useFetch";
import "./index.scss";

const ProfilePerson = () => {
  const userData = useFetch<any>("users/get-user-by-id", {}, false, [], {
    method: "GET",
  });

  const [form] = Form.useForm();
  const onSubmit = (values: any) => {};

  const [fileList, setFileList] = useState<any>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const [img, setImg] = useState<any>(null);
  const { account } = useWeb3React();

  const onChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
    let formData = new FormData();
    formData.append("files", newFileList[0].originFileObj);
    setImg(formData);
  };

  const submitImg = useFetch<any>("image/upload-multiple-file", {}, false, [img], {
    method: "POST",
    body: img,
  });

  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow && imgWindow.document.write(image.outerHTML);
  };

  return (
    <div className="profile-person">
      <div className="profile-person__title">Personal Information</div>
      <div className="profile-person__description">* Indicates required</div>
      <div className="profile-person__container">
        <div className="profile-person__container__avatar">
          <ImgCrop rotate>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              maxCount={1}
              onChange={onChange}
              onPreview={onPreview}
              className="profile-person__container__avatar__wrapper"
            >
              <Button
                type="ghost"
                icon={<UploadOutlined />}
                className="profile-person__container__avatar__wrapper__button"
              />{" "}
              Upload
            </Upload>
          </ImgCrop>
        </div>
        <div className="profile-person__container__information">
          <Form
            form={form}
            className="profile-person__container__information__form"
            onFinish={onSubmit}
          >
            <Row gutter={24}>
              <Col
                span={13}
                key={1}
                className="profile-person__container__information__form__form-item"
              >
                <Form.Item
                  name={"name"}
                  label={"Tên đệm và tên"}
                  rules={[
                    {
                      required: true,
                      message: "Input something!",
                    },
                  ]}
                >
                  <Input placeholder="Tên đệm và tên" />
                </Form.Item>
              </Col>
              <Col
                span={11}
                key={2}
                className="profile-person__container__information__form__form-item"
              >
                <Form.Item
                  name={"lastName"}
                  label={"Họ"}
                  rules={[
                    {
                      required: true,
                      message: "Input something!",
                    },
                  ]}
                >
                  <Input placeholder="Họ" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col
                span={9}
                key={3}
                className="profile-person__container__information__form__form-item"
              >
                <Form.Item
                  name={"dob"}
                  label={"Ngày sinh"}
                  rules={[
                    {
                      required: true,
                      message: "Input something!",
                    },
                  ]}
                >
                  <Input placeholder="Ngày sinh" />
                </Form.Item>
              </Col>
              <Col
                span={15}
                key={4}
                className="profile-person__container__information__form__form-item"
              >
                <Form.Item
                  label="Giới tính"
                  name="gender"
                  initialValue={"male"}
                >
                  <Radio.Group>
                    <Radio value="male">Nam</Radio>
                    <Radio value="female">Nữ</Radio>
                    <Radio value="other">Khác</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col
                span={24}
                key={5}
                className="profile-person__container__information__form__form-item"
              >
                <Form.Item
                  name={"nation"}
                  label={"Quốc gia"}
                  rules={[
                    {
                      required: true,
                      message: "Input something!",
                    },
                  ]}
                >
                  <Input placeholder="Quốc gia" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col
                span={24}
                key={6}
                className="profile-person__container__information__form__form-item"
              >
                <Form.Item
                  name={"nativeAddress"}
                  label={`Nguyên quán`}
                  rules={[
                    {
                      required: true,
                      message: "Input something!",
                    },
                  ]}
                >
                  <Input placeholder="Nguyên quán" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col
                span={24}
                key={7}
                className="profile-person__container__information__form__form-item"
              >
                <Form.Item
                  name={"permanentAddress"}
                  label={"Nơi đăng kí hộ khẩu thường trú"}
                  rules={[
                    {
                      required: true,
                      message: "Input something!",
                    },
                  ]}
                >
                  <Input placeholder="Nơi đăng kí hộ khẩu thường trú" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col
                span={24}
                key={8}
                className="profile-person__container__information__form__form-item"
              >
                <Form.Item
                  name={"address"}
                  label={"Nơi ở hiện tại"}
                  rules={[
                    {
                      required: true,
                      message: "Input something!",
                    },
                  ]}
                >
                  <Input placeholder="Nơi ở hiện tại" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col
                span={8}
                key={9}
                className="profile-person__container__information__form__form-item"
              >
                <Form.Item
                  name={"cmnd"}
                  label={"CMND"}
                  rules={[
                    {
                      required: true,
                      message: "Input something!",
                    },
                  ]}
                >
                  <Input placeholder="CMND" />
                </Form.Item>
              </Col>
              <Col
                span={8}
                key={10}
                className="profile-person__container__information__form__form-item"
              >
                <Form.Item
                  name={"date"}
                  label={"Ngày cấp"}
                  rules={[
                    {
                      required: true,
                      message: "Input something!",
                    },
                  ]}
                >
                  <Input placeholder="Ngày cấp" />
                </Form.Item>
              </Col>
              <Col
                span={8}
                key={11}
                className="profile-person__container__information__form__form-item"
              >
                <Form.Item
                  name={"place"}
                  label={"Nơi cấp"}
                  rules={[
                    {
                      required: true,
                      message: "Input something!",
                    },
                  ]}
                >
                  <Input placeholder="Nơi cấp" />
                </Form.Item>
              </Col>
            </Row>
            <Button
              type="primary"
              className="profile-person__container__information__form__submit"
              htmlType="submit"
            >
              Save Information
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePerson;

import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, Radio, Row } from "antd";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import "./index.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ProfilePayment = () => {
  const [form] = Form.useForm();
  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 },
  };
  return (
    <div className="profile-payment">
      <div className="profile-payment__title">Personal Information</div>
      <div className="profile-payment__container">
        <div className="profile-payment__container__avatar">
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 150, xxl: 200 }}
            icon={<AntDesignOutlined />}
          />
          <div>
            <Button type="ghost" icon={<UploadOutlined />} /> Upload
          </div>
        </div>
        <div className="profile-payment__container__information">
          <Form
            form={form}
            className="profile-payment__container__information__form"
          >
            <Row gutter={24}>
              <Col
                span={13}
                key={1}
                className="profile-payment__container__information__form__form-item"
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
                className="profile-payment__container__information__form__form-item"
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
                className="profile-payment__container__information__form__form-item"
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
                className="profile-payment__container__information__form__form-item"
              >
                <Form.Item label="Giới tính" name="gender">
                  <Radio.Group defaultValue={"male"}>
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
                className="profile-payment__container__information__form__form-item"
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
                className="profile-payment__container__information__form__form-item"
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
                className="profile-payment__container__information__form__form-item"
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
                className="profile-payment__container__information__form__form-item"
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
                className="profile-payment__container__information__form__form-item"
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
                className="profile-payment__container__information__form__form-item"
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
                className="profile-payment__container__information__form__form-item"
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
              className="profile-payment__container__information__form__submit"
            >
              Save Information
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePayment;

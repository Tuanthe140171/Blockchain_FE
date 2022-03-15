import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, Radio, Row } from "antd";
import React from "react";
import useFetch from "../../../../hooks/useFetch";
import "./index.scss";

const ProfilePerson = () => {
  // const { initialState } = useSelector((state: any) => state.dashboard);
  // const dispatch = useDispatch();

  // useEffect(()=>{
  //   dispatch()
  // }, [])

  // const userData = useFetch(
  //   "https://provinces.open-api.vn/users/get-user-by-id",
  //   {
  //     method: "POST",
  //     headers: {},
  //     body: JSON.stringify({}),
  //   }
  // );

  // const multipleFile = useFetch(
  //   "https://provinces.open-api.vn//users/upload-multiple-file",
  //   {
  //     method: "POST",
  //     body: JSON.stringify({}),
  //   }
  // );

  // const updateProfile = useFetch(
  //   "https://provinces.open-api.vn/users/update-user-profile",
  //   {
  //     method: "POST",
  //     body: JSON.stringify({
  //       // name: dob,
  //     }),
  //   }
  // );

  const [form] = Form.useForm();

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="profile-person">
      <div className="profile-person__title">Personal Information</div>
      <div className="profile-person__description">* Indicates required</div>
      <div className="profile-person__container">
        <div className="profile-person__container__avatar">
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 150, xxl: 174 }}
            icon={<AntDesignOutlined />}
          />
          <div>
            <Button type="ghost" icon={<UploadOutlined />} /> Upload
          </div>
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

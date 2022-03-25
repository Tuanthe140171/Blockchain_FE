import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Radio, Row, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import AppDialog from "../../../../components/AppDialog";
import AppLoading from "../../../../components/AppLoading";
import useFetch from "../../../../hooks/useFetch";
import "./index.scss";

const { Option } = Select;

const ProfilePerson = () => {
  const [form] = Form.useForm();
  const [imgData, setImgData] = useState<any>(undefined);
  const [isUploadAva, setIsUploadAva] = useState<boolean>(false);
  const [updateWithoutAva, setUpdateWithoutAva] = useState<any>(undefined);
  const [formData, setFormData] = useState<any>({});
  const [fileList, setFileList] = useState<any>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "",
    },
  ]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { data: userData } = useFetch<any>(
    "users/get-user-by-id",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [],
    {},
    (e) => {
      setFileList([
        {
          status: "done",
          url: e.data.UserMedia.find(
            (media: any) => media.type === "1" && media.active === 1
          ).link,
          thumbUrl: e.data.UserMedia.find(
            (media: any) => media.type === "1" && media.active === 1
          ).link,
        },
      ]);
    }
  );

  const { data: countryData } = useFetch<any>(
    "assets/country",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [],
    {}
  );

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        name: userData.name,
        lastName: userData.lastName,
        dob: userData.dob?.split("T")[0],
        gender:
          userData.gender === 0
            ? "male"
            : userData.gender === 1
            ? "female"
            : "other",
        nation: userData.country,
        nativeAddress: userData.baseAddress,
        permanentAddress: userData.currentAddress,
        address: userData.liveAddress,
        cmnd: userData.identityId,
        date: userData.identityDate,
        place: userData.identityPlace,
      });
    }
  }, [userData]);

  const onChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
    setIsUploadAva(true);
  };

  const [hasImg, setHasImg] = useState<any>(undefined);

  const { data: submitImg } = useFetch<any>(
    "image/upload-multiple-file",
    {},
    false,
    [imgData],
    {
      method: "POST",
      body: imgData,
    },
    (e) => {
      const frm = formData;
      frm.image = [
        {
          link: e.data ? e.data[0] : "",
          type: "1",
        },
      ];
      setFormData(frm);
      setHasImg(1);
    }
  );

  const onSubmit = (values: any) => {
    const dataSubmit = {
      name: values.name,
      dob: values.dob,
      country: values.nation,
      baseAddress: values.nativeAddress,
      currentAddress: values.permanentAddress,
      liveAddress: values.address,
      identityId: values.cmnd,
      identityDate: values.date,
      identityPlace: values.place,
      gender: values.gender === "male" ? 0 : values.gender === "female" ? 1 : 2,
    };
    setFormData(dataSubmit);
    if (isUploadAva) {
      setIsUploadAva(false);
      let data = new FormData();
      data.append("files", values.upload.file.originFileObj);
      setImgData(data);
    } else {
      setUpdateWithoutAva(true);
    }
  };

  const { data: submitData } = useFetch<any>(
    "users/update-user-profile",
    {
      "Content-Type": "application/json",
    },
    false,
    [hasImg],
    {
      method: "POST",
      body: JSON.stringify(formData),
    },
    (e) => {
      setHasImg(undefined);
      setOpenDialog(true);
    }
  );

  const { data: submitDataWithoutAva, loading } = useFetch<any>(
    "users/update-user-profile",
    {
      "Content-Type": "application/json",
    },
    false,
    [updateWithoutAva],
    {
      method: "POST",
      body: JSON.stringify(formData),
    },
    (e) => {
      setUpdateWithoutAva(undefined);
      setOpenDialog(true);
    }
  );

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

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
      {openDialog ? (
        <AppDialog
          type="infor"
          title={"Cập nhật thông tin thành công"}
          description={"Thông tin user đã được cập nhật"}
          confirmText={"Ok"}
          onConfirm={() => {
            setOpenDialog(false);
          }}
        />
      ) : null}
      {loading && (
        <AppLoading loadingContent={<div></div>} showContent={false} />
      )}
      <div className="profile-person">
        <div className="profile-person__title">Personal Information</div>
        <div className="profile-person__description">* Indicates required</div>
        <div className="profile-person__container">
          <div className="profile-person__container__information">
            <Form
              form={form}
              className="profile-person__container__information__form"
              onFinish={(e) => onSubmit(e)}
            >
              <div>
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
                      <Input placeholder="Ngày sinh" type={"date"} />
                    </Form.Item>
                  </Col>
                  <Col
                    span={15}
                    key={4}
                    className="profile-person__container__information__form__form-item"
                  >
                    <Form.Item
                      name="gender"
                      label="Giới tính"
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
                      {/* <Input placeholder="Quốc gia" /> */}
                      <Select placeholder="Quốc gia">
                        {countryData?.map((country: any) => {
                          return (
                            <Option key={country} value={`${country}`}>
                              {country}
                            </Option>
                          );
                        })}
                      </Select>
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
                      <Input placeholder="Ngày cấp" type={"date"} />
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
                  disabled={loading}
                >
                  Save Information
                </Button>
              </div>
              <Form.Item
                name="upload"
                className="profile-person__container__avatar"
              >
                <Upload
                  name="logo"
                  listType="picture-card"
                  maxCount={1}
                  fileList={fileList}
                  defaultFileList={fileList}
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
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePerson;

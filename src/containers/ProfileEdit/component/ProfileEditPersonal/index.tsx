import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Radio, Row, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppDialog from "../../../../components/AppDialog";
import AppLoading from "../../../../components/AppLoading";
import useFetch from "../../../../hooks/useFetch";
import { getUserById } from "../../../../stores/action/user-layout.action";
import "./index.scss";

const { Option } = Select;

const dummyRequest = ({ file, onSuccess }: any) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

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
  const [openWarningDialog, setOpenWarningDialog] = useState<boolean>(false);
  const { userData } = useSelector((state: any) => state.userLayout);
  const dispatch = useDispatch();
  const avatarLink = userData?.UserMedia?.find(
    (media: any) => media.type === "1" && media.active === 1
  )
    ? userData?.UserMedia?.find(
        (media: any) => media.type === "1" && media.active === 1
      ).link
    : "/icon/AvatarTmp.png";

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        name: userData?.name,
        lastName: userData?.lastName,
        dob: userData?.dob?.split("T")[0],
        gender:
          userData.gender === 0
            ? "male"
            : userData.gender === 1
            ? "female"
            : "other",
        nation: userData?.country,
        nativeAddress: userData?.baseAddress,
        permanentAddress: userData?.currentAddress,
        address: userData?.liveAddress,
        cmnd: userData?.identityId,
        date: userData?.identityDate,
        place: userData?.identityPlace,
      });
      setFileList([
        {
          status: "done",
          url: avatarLink,
        },
      ]);
    }
  }, [userData]);

  const { data: provinceData, loading: loadingProvince } = useFetch<any>(
    "assets/province",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [],
    {},
    (e) => {}
  );

  const { data: countryData, loading: loadingCountry } = useFetch<any>(
    "assets/country",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [],
    {},
    (e) => {}
  );

  const onChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
    setIsUploadAva(true);
  };

  const [hasImg, setHasImg] = useState<any>(undefined);

  const { data: submitImg, loading: loadingSubmitImg } = useFetch<any>(
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

  const [val, setVal] = useState<any>(null);
  const onSubmit = (values: any) => {
    if (new Date(birthday) > new Date()) {
      form.setFields([{ name: "dob", errors: ["Ng??y sinh kh??ng ph?? h???p!"] }]);
    } else if (
      new Date(cmndDay) > new Date() ||
      new Date(cmndDay).getFullYear() < new Date(birthday).getFullYear() + 14
    ) {
      form.setFields([{ name: "date", errors: ["Ng??y c???p kh??ng ph?? h???p!"] }]);
    } else {
      const dataSubmit = {
        name: values.name,
        lastName: values.lastName,
        dob: values.dob,
        country: values.nation,
        baseAddress: values.nativeAddress,
        currentAddress: values.permanentAddress,
        liveAddress: values.address,
        identityId: values.cmnd,
        identityDate: values.date,
        identityPlace: values.place,
        gender:
          values.gender === "male" ? 0 : values.gender === "female" ? 1 : 2,
      };
      setVal(values);
      setFormData(dataSubmit);
      setIsCheckCmnd(true);
    }
  };

  const { data: submitData, loading: loadingSubmitData } = useFetch<any>(
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
      const action = getUserById(e.data);
      dispatch(action);
      setHasImg(undefined);
      setOpenDialog(true);
    }
  );

  const { data: submitDataWithoutAva, loading: loadingSubmitWithoutAva } =
    useFetch<any>(
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
        const action = getUserById(e.data);
        dispatch(action);
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

  const [birthday, setBirthday] = useState("");
  const [cmndDay, setCmndDay] = useState("");
  const [errorBirthdayField, setErrorBirthdayField] = useState(false);
  const [errorCmndField, setErrorCmndField] = useState(false);

  useEffect(() => {
    if (errorBirthdayField) {
      form.setFields([{ name: "dob", errors: ["Ng??y sinh kh??ng ph?? h???p!"] }]);
      setErrorBirthdayField(false);
    }
  }, [errorBirthdayField]);

  useEffect(() => {
    if (errorCmndField) {
      form.setFields([{ name: "date", errors: ["Ng??y c???p kh??ng ph?? h???p!"] }]);
      setErrorCmndField(false);
    }
  }, [errorCmndField]);

  const [isCheckCmnd, setIsCheckCmnd] = useState<any>(undefined);
  const { data: checkCmdData, loading: loadingCheckCmnd } = useFetch<any>(
    `users/check-identity-exist?identityId=${formData.identityId}`,
    {
      "Content-Type": "application/json",
    },
    false,
    [isCheckCmnd],
    {},
    (e) => {
      setIsCheckCmnd(undefined);
      if (e.data) {
        setOpenWarningDialog(true);
      } else {
        if (isUploadAva) {
          setIsUploadAva(false);
          let data = new FormData();
          data.append("files", val.upload.file.originFileObj);
          setImgData(data);
        } else {
          setUpdateWithoutAva(true);
        }
      }
    }
  );

  return (
    <>
      <AppDialog
        type="infor"
        title={"C???p nh???t th??ng tin th??nh c??ng"}
        description={"Th??ng tin user ???? ???????c c???p nh???t"}
        confirmText={"Ok"}
        onConfirm={() => {
          setOpenDialog(false);
        }}
        visible={openDialog}
        onCancel={() => setOpenDialog(false)}
      />
      <AppDialog
        type="warning"
        title={"S??? CMND ???? ???????c s??? d???ng"}
        confirmText={"OK"}
        onConfirm={() => {
          setOpenWarningDialog(false);
        }}
        visible={openWarningDialog}
        onCancel={() => setOpenWarningDialog(false)}
      />
      {(loadingCountry ||
        loadingProvince ||
        loadingSubmitData ||
        loadingSubmitImg ||
        loadingCheckCmnd ||
        loadingSubmitWithoutAva) && (
        <AppLoading loadingContent={<div></div>} showContent={false} />
      )}
      <div className="profile-person">
        <div className="profile-person__title">Th??ng tin c?? nh??n</div>
        <div className="profile-person__description">*Y??u c???u</div>
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
                      label={"T??n ?????m v?? t??n"}
                      validateTrigger="onBlur"
                      rules={[
                        {
                          required: true,
                          message: "H??y ??i???n tr?????ng c??n thi???u!",
                        },
                        { max: 20, message: "T???i ??a 20 k?? t???!" },
                      ]}
                    >
                      <Input placeholder="T??n ?????m v?? t??n" />
                    </Form.Item>
                  </Col>
                  <Col
                    span={11}
                    key={2}
                    className="profile-person__container__information__form__form-item"
                  >
                    <Form.Item
                      name={"lastName"}
                      label={"H???"}
                      validateTrigger="onBlur"
                      rules={[
                        {
                          required: true,
                          message: "H??y ??i???n tr?????ng c??n thi???u!",
                        },
                        {
                          max: 10,
                          message: "T???i ??a 10 k?? t???!",
                        },
                      ]}
                    >
                      <Input placeholder="H???" />
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
                      label={"Ng??y sinh"}
                      validateTrigger="onBlur"
                      rules={[
                        {
                          required: true,
                          message: "H??y ??i???n tr?????ng c??n thi???u!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Ng??y sinh"
                        type={"date"}
                        onBlur={(e) => {
                          if (new Date(e.target.value) > new Date()) {
                            setErrorBirthdayField(true);
                          } else {
                            setErrorBirthdayField(false);
                          }
                        }}
                        onChange={(e) => {
                          setBirthday(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    span={15}
                    key={4}
                    className="profile-person__container__information__form__form-item"
                  >
                    <Form.Item
                      name="gender"
                      label="Gi???i t??nh"
                      initialValue={"male"}
                    >
                      <Radio.Group>
                        <Radio value="male">Nam</Radio>
                        <Radio value="female">N???</Radio>
                        <Radio value="other">Kh??c</Radio>
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
                      label={"Qu???c gia"}
                      validateTrigger="onBlur"
                      rules={[
                        {
                          required: true,
                          message: "H??y ??i???n tr?????ng c??n thi???u!",
                        },
                      ]}
                    >
                      <Select placeholder="Qu???c gia">
                        {countryData?.sort().map((country: any) => {
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
                      label={`Nguy??n qu??n`}
                      validateTrigger="onBlur"
                      rules={[
                        {
                          required: true,
                          message: "H??y ??i???n tr?????ng c??n thi???u!",
                        },
                        {
                          max: 50,
                          message: "T???i ??a 50 k?? t???!",
                        },
                      ]}
                    >
                      <Input placeholder="Nguy??n qu??n" />
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
                      label={"N??i ????ng k?? h??? kh???u th?????ng tr??"}
                      validateTrigger="onBlur"
                      rules={[
                        {
                          required: true,
                          message: "H??y ??i???n tr?????ng c??n thi???u!",
                        },
                        { max: 50, message: " T???i ??a 50 k?? t???!" },
                      ]}
                    >
                      <Input placeholder="N??i ????ng k?? h??? kh???u th?????ng tr??" />
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
                      label={"N??i ??? hi???n t???i (T???nh th??nh)"}
                      validateTrigger="onBlur"
                      rules={[
                        {
                          required: true,
                          message: "H??y ??i???n tr?????ng c??n thi???u!",
                        },
                      ]}
                    >
                      {/* <Input placeholder="N??i ??? hi???n t???i" /> */}
                      <Select placeholder="N??i ??? hi???n t???i">
                        {provinceData?.sort().map((province: any) => {
                          return (
                            <Option
                              key={province.phone_code}
                              value={`${province.name}`}
                            >
                              {province.name}
                            </Option>
                          );
                        })}
                      </Select>
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
                      validateTrigger="onBlur"
                      rules={[
                        {
                          required: true,
                          message: "H??y ??i???n tr?????ng c??n thi???u!",
                        },
                        {
                          len: 12,
                          message: "CMND bao g???m 12 k?? t???!",
                        },
                      ]}
                      className="profile-input-number"
                    >
                      <Input type="number" placeholder="CMND" />
                    </Form.Item>
                  </Col>
                  <Col
                    span={8}
                    key={10}
                    className="profile-person__container__information__form__form-item"
                  >
                    <Form.Item
                      name={"date"}
                      label={"Ng??y c???p"}
                      validateTrigger="onBlur"
                      rules={[
                        {
                          required: true,
                          message: "H??y ??i???n tr?????ng c??n thi???u!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Ng??y c???p"
                        type={"date"}
                        onBlur={(e) => {
                          if (
                            new Date(e.target.value) > new Date() ||
                            new Date(e.target.value).getFullYear() <
                              new Date(birthday).getFullYear() + 14
                          ) {
                            setErrorCmndField(true);
                          } else {
                            setErrorCmndField(false);
                          }
                        }}
                        onChange={(e) => {
                          setCmndDay(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    span={8}
                    key={11}
                    className="profile-person__container__information__form__form-item"
                  >
                    <Form.Item
                      name={"place"}
                      label={"N??i c???p"}
                      validateTrigger="onBlur"
                      rules={[
                        {
                          required: true,
                          message: "H??y ??i???n tr?????ng c??n thi???u!",
                        },
                        { max: 20, message: "T???i ??a 20 k?? t???!" },
                      ]}
                    >
                      <Input placeholder="N??i c???p" />
                    </Form.Item>
                  </Col>
                </Row>
                <Button
                  type="primary"
                  className="profile-person__container__information__form__submit"
                  htmlType="submit"
                  disabled={loadingSubmitData}
                >
                  L??u th??ng tin
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
                  isImageUrl={(file: any) => true}
                  customRequest={dummyRequest}
                >
                  <Button
                    type="ghost"
                    icon={<UploadOutlined />}
                    className="profile-person__container__avatar__wrapper__button"
                  />{" "}
                  T???i l??n
                </Upload>
                {/* <input type={file} */}
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePerson;

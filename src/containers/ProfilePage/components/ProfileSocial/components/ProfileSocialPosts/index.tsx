import {
  FileImageOutlined,
  SmileOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Form, Input, Upload } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppDialog from "../../../../../../components/AppDialog";
import useFetch from "../../../../../../hooks/useFetch";
import ProfileSocialPost from "../ProfileSocialPost";
import "./index.scss";

const dummyRequest = ({ file, onSuccess }: any) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const ProfileSocialPosts: React.FC = (props) => {
  const { userPostData: userData } = useSelector(
    (state: any) => state.userPostData
  );
  const [postList, setPostList] = useState([]);
  const dispatch = useDispatch();
  const avatarLink = userData?.UserMedia.find(
    (media: any) => media.type === "1" && media.active === 1
  )
    ? userData?.UserMedia.find(
        (media: any) => media.type === "1" && media.active === 1
      ).link
    : "/icon/AvatarTmp.png";
  const [form] = Form.useForm();
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState<any>({});
  const [imgData, setImgData] = useState<any>(undefined);
  const [isUploadImg, setIsUploadImg] = useState<boolean>(false);
  const [updateWithoutAva, setUpdateWithoutAva] = useState<any>(undefined);
  const [fileList, setFileList] = useState<any>([]);
  const [hasImg, setHasImg] = useState<any>(undefined);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { id } = useParams();

  const getTimeDiff = (time: any) => {
    var now = new Date();
    var then = new Date(time);
    return "20h";
  };

  const getUserName = () => {
    let name = userData?.name;
    let lastName = userData?.lastName;
    if (!userData?.lastName && !userData?.name) {
      return "Người dùng";
    }
    if (!userData?.lastName) {
      lastName = "";
    }
    if (!userData?.name) {
      name = "";
    }
    return `${lastName} ${name}`;
  };

  const { data: userPost } = useFetch<any>(
    "post/get-post-all-time?limit=10&offset=0",
    {},
    false,
    [],
    { method: "GET" },
    (e) => {
      const formatPosts = e.data.map((post: any) => {
        return {
          images: post.PostMedia?.map((p: any) => {
            return { image: p.link, title: "", description: "" };
          }),
          poster: {
            name: getUserName(),
            avatar: avatarLink,
          },
          timestamp: getTimeDiff(post.createDate),
          content: post.content,
          contentShortcut: post.content?.substring(0, 200),
          likes: 100,
          comments: 0,
        };
      });
      setPostList(formatPosts);
    }
  );

  const onSubmit = (values: any) => {
    const dataSubmit = {
      userId: 1,
      title: "",
      content: values.status,
      image: [],
    };
    setFormData(dataSubmit);
    if (isUploadImg) {
      setIsUploadImg(false);
      let data = new FormData();
      for (let i = 0; i < values.upload.fileList.length; i++) {
        data.append("files", values.upload.fileList[i].originFileObj);
      }
      setImgData(data);
    } else {
      setUpdateWithoutAva(true);
    }
  };

  const onChange = ({ fileList: newFileList }: any) => {
    if (newFileList.length > 0) {
      setIsUploadImg(true);
    } else {
      setIsUploadImg(false);
    }
    setFileList(newFileList);
  };

  const onPictureChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

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

  const { data: submitNewPostImg } = useFetch<any>(
    "image/upload-multiple-file",
    {},
    false,
    [imgData],
    {
      method: "POST",
      body: imgData,
    },
    (e) => {
      const imgFormat = e.data.map((link: any) => ({ link: link }));
      setFormData({ ...formData, image: imgFormat });
      setHasImg(1);
    }
  );

  const { data: submitNewPost } = useFetch<any>(
    "post/create-post",
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
      // const action = getUserById(e.data);
      // dispatch(action);
      // setHasImg(undefined);
      // setOpenDialog(true);
    }
  );

  const { data: submitNewPostWithoutImg, loading } = useFetch<any>(
    "post/create-post",
    {
      "Content-Type": "application/json",
    },
    false,
    [updateWithoutAva],
    {
      method: "POST",
      body: JSON.stringify(formData),
    },
    (e) => {}
  );

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
      <div className="profile-social__posts">
        {!id && (
          <div className="profile-social__posts__upload">
            <Form
              form={form}
              className="profile-social__posts__upload__form"
              onFinish={(e) => onSubmit(e)}
            >
              <div className="profile-social__posts__upload__form__wrapper">
                <Avatar
                  src={avatarLink}
                  className="profile-social__posts__upload__form__wrapper__avatar"
                />
                <Form.Item
                  name={"status"}
                  className="profile-social__posts__upload__form__wrapper__status"
                >
                  <Input
                    placeholder="Hãy nhập gì đó..."
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </Form.Item>
              </div>
              <Form.Item
                name="upload"
                className={`profile-social__posts__upload__form__${
                  fileList.length === 0 ? "image-hidden" : "image"
                }`}
              >
                <Upload
                  name="logo"
                  listType="picture-card"
                  maxCount={3}
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  className="profile-social__posts__upload__form__image__wrapper"
                  isImageUrl={(file: any) => true}
                  customRequest={dummyRequest}
                >
                  +
                </Upload>
              </Form.Item>
              <hr className="profile-social__posts__upload__form__divider" />
              <div className="profile-social__posts__upload__form__footer">
                <div className="profile-social__posts__upload__form__footer__buttons">
                  <Button type="default" icon={<VideoCameraOutlined />}>
                    Phát trực tiếp
                  </Button>
                  <Upload
                    name="logo"
                    maxCount={3}
                    defaultFileList={[]}
                    fileList={fileList}
                    onChange={onPictureChange}
                    className="profile-social__posts__upload__form__footer__buttons__temp"
                    customRequest={dummyRequest}
                  >
                    <Button
                      disabled={fileList.length > 0}
                      icon={<FileImageOutlined />}
                    >
                      Ảnh
                    </Button>
                  </Upload>
                  <Button icon={<SmileOutlined />}>Trạng thái</Button>
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!inputValue && fileList.length === 0}
                  className="profile-social__posts__upload__form__footer__submit"
                >
                  Đăng bài
                </Button>
              </div>
            </Form>
          </div>
        )}
        {postList.map((post, index) => {
          const {
            images,
            poster,
            timestamp,
            content,
            contentShortcut,
            likes,
            comments,
          } = post;
          return (
            <React.Fragment key={content + index}>
              <ProfileSocialPost
                images={images}
                poster={poster}
                timestamp={timestamp}
                content={content}
                contentShortcut={contentShortcut}
                likes={likes}
                comments={comments}
                seeMore={contentShortcut}
              />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default ProfileSocialPosts;

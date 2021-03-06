import {
  FileImageOutlined,
  SmileOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Form, Input, Upload } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppDialog from "../../../../../../components/AppDialog";
import AppLoading from "../../../../../../components/AppLoading";
import useFetch from "../../../../../../hooks/useFetch";
import ProfileSocialPost from "../ProfileSocialPost";
import Picker from "emoji-picker-react";
import "./index.scss";

const dummyRequest = ({ file, onSuccess }: any) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

type IPost = {
  images: [];
  timestamp: string;
  content: string;
  contentShortcut: string;
  likes: number;
  id: string;
  isLike: boolean;
};

const ProfileSocialPosts: React.FC = (props) => {
  const { id } = useParams();
  const { userPostData: userData } = useSelector(
    (state: any) => state.userPostData
  );
  const { userData: mainUser } = useSelector((state: any) => state.userLayout);
  const dispatch = useDispatch();
  const [newPost, setNewPost] = useState<IPost | undefined>(undefined);
  const [postList, setPostList] = useState<IPost[]>([]);
  const avatarLink = userData?.UserMedia?.find(
    (media: any) => media.type === "1" && media.active === 1
  )
    ? userData?.UserMedia?.find(
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
  const [callWithParam, setCallWithParam] = useState<any>(undefined);
  const [callWithoutParam, setCallWithoutParam] = useState<any>(undefined);

  useEffect(() => {
    if (mainUser?.id) {
      if (id && id !== mainUser.id) {
        setCallWithParam(true);
      } else {
        setCallWithoutParam(true);
      }
    }
  }, [id, mainUser]);

  const convertToLocaleString = (time: string) => {
    const t3 = time.replace("seconds", "gi??y");
    const t4 = t3.replace("minutes", "ph??t");
    const t5 = t4.replace("minute", "ph??t");
    const t6 = t5.replace("hours", "gi???");
    const t7 = t6.replace("hour", "gi???");
    const t8 = t7.replace("days", "ng??y");
    const t9 = t8.replace("day", "ng??y");
    const t10 = t9.replace("months", "th??ng");
    const t11 = t10.replace("month", "th??ng");
    const t12 = t11.replace("years", "n??m");
    const t13 = t12.replace("year", "n??m");
    const t14 = t13.replace("a few", "M???t v??i");
    const t15 = t14.replace("an", "M???t");
    const t16 = t15.replace("a", "M???t");
    return t16;
  };

  const getTimeDiff = (time: any) => {
    const timestamp = moment(time).fromNow(true);
    const convertedTime = convertToLocaleString(timestamp);
    return convertedTime;
  };

  const { data: userPost, loading: loadingGetPostAllTime } = useFetch<any>(
    "post/get-post-by-current-user?limit=10&offset=0",
    {},
    false,
    [callWithoutParam],
    { method: "GET" },
    (e) => {
      setCallWithoutParam(undefined);
      const formatPosts = e.data.map((post: any) => {
        return {
          images: post.PostMedia?.map((p: any) => {
            return { image: p.link, title: "", description: "" };
          }),
          timestamp: getTimeDiff(post.createDate),
          content: post.content,
          contentShortcut: post.content?.substring(0, 200),
          likes: post.likeCount,
          id: post.id,
          isLike: post.isLike,
        };
      });
      setPostList(formatPosts);
    }
  );

  const { data: userPostWithId, loading: loadingGetPostById } = useFetch<any>(
    `post/get-post-by-id/${id}?limit=10&offset=0`,
    {},
    false,
    [callWithParam],
    { method: "GET" },
    (e) => {
      setCallWithParam(undefined);
      const formatPosts = e.data.map((post: any) => {
        return {
          images: post.PostMedia?.map((p: any) => {
            return { image: p.link, title: "", description: "" };
          }),
          timestamp: getTimeDiff(post.createDate),
          content: post.content,
          contentShortcut: post.content?.substring(0, 200),
          likes: post.likeCount,
          id: post.id,
          isLike: post.isLike,
        };
      });
      setPostList(formatPosts);
    }
  );

  const onSubmit = (values: any) => {
    const dataSubmit = {
      userId: userData.id,
      title: "",
      content: values.status,
      image: [],
    };
    setFormData(dataSubmit);

    if (isUploadImg) {
      setIsUploadImg(false);
      if (values.upload) {
        let data = new FormData();
        for (let i = 0; i < values.upload.fileList.length; i++) {
          data.append("files", values.upload.fileList[i].originFileObj);
        }
        setImgData(data);
      } else {
        let data = new FormData();
        data.append("files", fileList[0].originFileObj);
        setImgData(data);
      }
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
    if (newFileList.length > 0) {
      setIsUploadImg(true);
    } else {
      setIsUploadImg(false);
    }
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

  const { data: submitNewPostImg, loading: loadingSubmitImg } = useFetch<any>(
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

  const { data: submitNewPost, loading: loadingSubmitPost } = useFetch<any>(
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
      setHasImg(undefined);
      const data = e.data;
      const newPost: IPost = {
        images: formData.image.map((img: any) => {
          return { image: img.link, title: "", description: "" };
        }),
        timestamp: getTimeDiff(data.createDate),
        content: data.content,
        contentShortcut: data.content?.substring(0, 200),
        likes: 0,
        id: data.id,
        isLike: data.isLike,
      };
      setInputValue("");
      setNewPost(newPost);
    }
  );

  const {
    data: submitNewPostWithoutImg,
    loading: loadingSubmitPostWithoutImg,
  } = useFetch<any>(
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
    (e) => {
      setUpdateWithoutAva(undefined);
      const data = e.data;
      const newPost: IPost = {
        images: [],
        timestamp: getTimeDiff(data.createDate),
        content: data.content,
        contentShortcut: data.content?.substring(0, 200),
        likes: 0,
        id: data.id,
        isLike: data.isLike,
      };
      setInputValue("");
      setNewPost(newPost);
    }
  );

  useEffect(() => {
    if (newPost) {
      form.resetFields();
      setFileList([]);
      const list = postList;
      list.unshift(newPost);
      setPostList(list);
    }
  }, [newPost]);

  const [emojiVisible, setEmojiVisible] = useState(false);
  const ref = useRef<any>(null);

  const onEmojiClick = (event: any, emojiObject: any) => {
    const newValue = inputValue + emojiObject.emoji;
    setInputValue(newValue);
  };

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
        onCancel={() => setOpenDialog(false)}
        visible={openDialog}
      />
      {(loadingSubmitImg ||
        loadingGetPostById ||
        loadingGetPostAllTime ||
        loadingSubmitPost ||
        loadingSubmitPostWithoutImg) && (
        <AppLoading loadingContent={<div></div>} showContent={false} />
      )}
      <div className="profile-social__posts">
        {!id && (
          <div className="profile-social__posts__upload">
            <Form
              form={form}
              className="profile-social__posts__upload__form"
              onFinish={(e) => onSubmit(e)}
              fields={[
                {
                  name: ["status"],
                  value: inputValue,
                },
              ]}
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
                    placeholder="H??y nh???p g?? ????..."
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    ref={ref}
                    accept="image/*"
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
                  {/* <Button
                    type="default"
                    icon={<VideoCameraOutlined />}
                    className="button"
                  >
                    Ph??t tr???c ti???p  
                  </Button> */}
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
                      className="button"
                    >
                      ???nh
                    </Button>
                  </Upload>
                  <div>
                    <Button
                      icon={<SmileOutlined />}
                      onClick={() => {
                        setEmojiVisible(!emojiVisible);
                      }}
                      className="button"
                    >
                      Tr???ng th??i
                    </Button>
                    <Picker
                      onEmojiClick={onEmojiClick}
                      pickerStyle={{
                        position: "absolute",
                        display: emojiVisible ? "flex" : "none",
                      }}
                    />
                  </div>
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!inputValue && fileList.length === 0}
                  className="profile-social__posts__upload__form__footer__submit"
                >
                  ????ng b??i
                </Button>
              </div>
            </Form>
          </div>
        )}
        {postList.length > 0 ? (
          postList.map((post, index) => {
            const {
              images,
              timestamp,
              content,
              contentShortcut,
              likes,
              id,
              isLike,
            } = post;
            return (
              <React.Fragment key={content + index}>
                <ProfileSocialPost
                  images={images}
                  timestamp={timestamp}
                  content={content}
                  contentShortcut={contentShortcut}
                  likes={likes}
                  seeMore={!!contentShortcut}
                  id={id}
                  isLike={isLike}
                />
              </React.Fragment>
            );
          })
        ) : (
          <div className="profile-social__posts__empty-post">
            {!id
              ? "Kh??ng c?? b??i vi???t n??o"
              : "Ng?????i d??ng t???m th???i ch??a ????ng b??i vi???t n??o"}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileSocialPosts;

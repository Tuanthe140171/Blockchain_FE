import { Button, Cascader, Tag } from "antd";
import React, { useState } from "react";
import Circumstances from "../../../../constants/circumstances";
import ProfileUpload from "../ProfileEditModal/component/ProfileEditUpload";
import "./index.scss";

const ProfileCascader = (props: any) => {
  const { hasCMND } = props;

  const options = [
    {
      value: Circumstances.POOR,
      label: Circumstances.POOR,
      index: 0,
      message: "hộ nghèo",
    },
    {
      value: Circumstances.ORPHAN,
      label: Circumstances.ORPHAN,
      index: 1,
      message: "trẻ mồ côi",
    },
    {
      value: Circumstances.ETHNIC_MINORITY,
      label: Circumstances.ETHNIC_MINORITY,
      index: 2,
      message: "dân tộc thiểu số",
    },
    {
      value: Circumstances.MARTYR_FAMILY,
      label: Circumstances.MARTYR_FAMILY,
      index: 3,
      message: "liệt sĩ",
    },
    {
      value: Circumstances.AGENT_ORANGE,
      label: Circumstances.AGENT_ORANGE,
      index: 4,
      message: "chất độc màu da cam",
    },
    {
      value: Circumstances.ELDERLY,
      label: Circumstances.ELDERLY,
      index: 5,
      message: "người già",
    },
  ];

  const [selectedList, setSelectedList] = useState<any>([]);

  const onChange = (value: any) => {
    setSelectedList(value);
  };

  const onTagClose = (e: any, index: any) => {
    const itemPos = selectedList.indexOf(e);
    const { [itemPos]: item, ...rest } = selectedList;
    setSelectedList(Object.values(rest));
    return;
  };

  const randomColor = () => {
    "use strict";
    const randomInt = (min: any, max: any) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var h = randomInt(0, 360);
    var s = randomInt(42, 98);
    var l = randomInt(40, 90);
    return `hsl(${h},${s}%,${l}%)`;
  };

  const renderTag = () => {
    return selectedList.map((tag: any, index: any) => {
      return (
        <Tag
          closable
          onClose={() => onTagClose(tag, index)}
          key={tag}
          className="profile-cascader__tags__tag"
          color={randomColor()}
        >
          {tag[0]}
        </Tag>
      );
    });
  };

  const renderCMND = () => {
    if (hasCMND) {
      return (
        <>
          <div className="profile-cascader__text">
            Bạn hãy điền và gửi các giấy tờ vào{" "}
            {selectedList.length + 1 > 1 ? selectedList.length + 1 : ""} form
            sau:
          </div>
          <div className="profile-cascader__cmnd">
            <Button type="text" className="profile-cascader__cmnd__title">
              Giấy CMND
            </Button>
          </div>
        </>
      );
    }
    return null;
  };

  const renderProof = () => {
    return options.map((option, index) => {
      if (selectedList.some((data: any) => data[0] === option.value)) {
        return (
          <ProfileUpload
            id={option.label}
            message={option.message}
            key={option.index}
          />
        );
      }
    });
  };

  return (
    <div className="profile-cascader">
      <div className="profile-cascader__text">
        Bạn hãy chọn những hoàn cảnh phù hợp với hoàn cảnh của bạn :
      </div>
      <Cascader
        options={options}
        onChange={onChange}
        value={selectedList}
        style={{ width: "100%" }}
        className="profile-cascader__cascader"
        multiple
        maxTagCount={0}
        maxTagPlaceholder={
          <div>
            <Tag closable onClose={() => setSelectedList([])} color="#108ee9">
              {selectedList.length}
            </Tag>
            Hoàn cảnh
          </div>
        }
        dropdownStyle={{ width: "100%" }}
      />
      <div className="profile-cascader__tags">{renderTag()}</div>
      {renderCMND()}
      {renderProof()}
    </div>
  );
};

export default ProfileCascader;

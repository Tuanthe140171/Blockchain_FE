import React, { useEffect, useState } from "react";
import { Typography, Table, Button, Input, Avatar } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import AppTimer from "../../components/AppTimer";
import VotingConfirmation from "./components/VotingConfirmation";
import { SelectedUser } from "./components/VotingConfirmation";
import useDebounce from "../../hooks/useDebounce";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const { Search } = Input;

const VotingPage: React.FC = () => {
  const [reloadVotingData, setReloadVotingData] = useState<boolean | undefined>(
    true
  );
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputSearch, setInputSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<SelectedUser | undefined>();
  const userData = useSelector((state: any) => state.userLayout.userData);

  const debouncedKeyword = useDebounce<string>(inputSearch, 500);
  const navigate = useNavigate();

  let url = `users/donees?page=${currentPage}&limit=8&keyword=${debouncedKeyword}&userType=3`;

  const { data, loading } = useFetch<any>(
    url,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [confirmationVisible ?  reloadVotingData: true],
    {
      method: "GET",
    },
    () => {
      setReloadVotingData(undefined);
    },
    () => {
      setReloadVotingData(undefined);
    }
  );

  const doneeData = data
    ? data.rows.map((donee: any) => ({
        donee: `${donee.lastName || ""} ${donee?.name}`,
        dob: moment(donee.dob).format("DD-MM-yy"),
        sortCreateDate: moment(donee.createDate).toDate().getTime(),
        createDate: moment(donee.createDate).format("DD-MM-yy"),
        address: `${donee.country} ${donee.baseAddress} ${donee.currentAddress}`,
        id: donee.identityId,
        situations: donee.BadLuckTypes,
        avatar: (function () {
          const userAvatar = donee.UserMedia.filter(
            (userMedia: any) => userMedia.type === "1" && userMedia.active === 1
          )
            .slice(0, 1)
            .pop();
          return userAvatar ? userAvatar.link : null;
        })(),
        identityPlace: donee.identityPlace,
        identityDate: donee.identityDate,
        status: "check",
        userId: donee.id,
        isVoted: (function () {
          return userData
            ? donee.UserVotes.map(
                (userVote: any) => userVote.userIdFrom
              ).indexOf(userData.id) >= 0
            : true;
        })(),
        sortNumberOfConfirmations: `${donee.UserVotes.filter((userVote: any) => userVote.isAgree === 1).length}`,
        numberOfConfirmations: `${donee.UserVotes.filter((userVote: any) => userVote.isAgree === 1).length} / 10`,
        expireDate: donee.expireDate
      }))
    : [];

  useEffect(() => {
    if (selectedUser && data && userData && confirmationVisible) {
      const donee = data.rows.filter(
        (donee: any) => donee.id === selectedUser.userId
      )[0];

      donee && setSelectedUser({
        donee: `${donee?.lastName || ""} ${donee?.name}`,
        dob: moment(donee.dob).format("DD-MM-yy"),
        createDate: moment(donee.createDate).format("DD-MM-yy"),
        address: `${donee.baseAddress}`,
        currentAddress: `${donee.currentAddress}`,
        id: donee.identityId,
        situations: donee.BadLuckTypes,
        avatar: (function () {
          const userAvatar = donee.UserMedia.filter(
            (userMedia: any) => userMedia.type === "1" && userMedia.active === 1
          )
            .slice(0, 1)
            .pop();
          return userAvatar ? userAvatar.link : null;
        })(),
        identityImages: (function () {
          const userAvatar = donee.UserMedia.filter(
            (userMedia: any) => userMedia.type === "3"
          ).map((userMedia: any) => userMedia.link)

          return userAvatar ? userAvatar : null;
        })(),
        identityPlace: donee.identityPlace,
        identityDate: donee.identityDate,
        status: "check",
        userId: donee.id,
        isVoted: (function () {
          return userData
            ? donee.UserVotes.map(
                (userVote: any) => userVote.userIdFrom
              ).indexOf(userData.id) >= 0
            : true;
        })()
      });
    }
  }, [data, confirmationVisible, setSelectedUser, userData]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "10%",
    },
    {
      title: "Ng?????i d??ng",
      dataIndex: "donee",
      width: "15%",
      render: (text: any, row: any, index: any) => {
        return (
          <div
            className="voting__donee"
            onClick={() => navigate(`/profile/${row.userId}`)}
          >
            <Avatar src={row.avatar} />
            <span>{text}</span>
          </div>
        );
      },
    },
    // {
    //   title: "?????a ch???",
    //   dataIndex: "address",
    //   width: "10%",
    // },
    // {
    //   title: "Ng??y sinh",
    //   dataIndex: "dob",
    //   width: "10%",
    // },
    {
      title: "Ho??n c???nh",
      dataIndex: "situations",
      width: "25%",
      render: (text: any, row: any, index: any) => {
        return (
          <div className="voting__situation">
            <span>{row.situations[0].BadLuckerSituation.name}</span>
            <div>
              {row.situations.length >= 2 && (
                <span className="voting__situation-more">
                  +{row.situations.length - 1} ho??n c???nh
                </span>
              )}
            </div>
          </div>
        );
      },
    },
    {
      sorter: (a: any, b: any) => a.sortCreateDate - b.sortCreateDate,
      title: "Th???i gian n???p",
      dataIndex: "createDate",
      width: "15%",
    },
    {
      sorter: (a: any, b: any) => a.sortNumberOfConfirmations - b.sortNumberOfConfirmations,
      title: "X??c nh???n",
      dataIndex: "numberOfConfirmations",
      width: "10%",
    },
    {
      title: "Th???i gian b??nh ch???n",
      dataIndex: "expireDate",
      width: "15%",
      render: (text: any, row: any, index: any) => {
        return <AppTimer targetDate={text} />
      },
    },
    {
      title: "Tr???ng th??i",
      dataIndex: "status",
      width: "15%",
      render: (text: any, row: any, index: any) => {
        return (
          <Button
            className={`voting__check-btn`}
            onClick={() => {
              setSelectedUser(row);
              setConfirmationVisible(true);
            }}
          >
            {row.isVoted ? "???? x??c nh???n" : "X??c nh???n"}
          </Button>
        );
      },
    },
  ];

  const { Title } = Typography;

  return (
    <div className="voting">
      <Title level={3} className="voting__title">
        B??nh ch???n h??? ngh??o
      </Title>
      <div className="voting__list">
        <div className="voting__list-header">
          <Title level={4} className="voting__list-title">
            Danh s??ch ng?????i n???p ????n
          </Title>
          <Search
            placeholder="T??m ki???m"
            onChange={(e: any) => {
              setCurrentPage(1);
              setInputSearch(e.target.value.replace(/[^a-z0-9A-Z ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????]/g, ""));
            }}
            value={inputSearch}
            style={{ width: 260 }}
            className="voting__list-input"
          />
        </div>
        <Table
          rowKey="userId"
          loading={loading}
          className="voting__table"
          bordered={false}
          columns={columns}
          dataSource={doneeData}
          scroll={{ y: 400 }}
          pagination={{ pageSize: 8, current: currentPage, total: data?.count }}
          onChange={((props: any) => setCurrentPage(props.current))}
        />
        <VotingConfirmation
          visible={confirmationVisible}
          onClose={() => setConfirmationVisible(false)}
          setConfirmationVisible={setConfirmationVisible}
          selectedUser={selectedUser}
          setReloadVotingData={setReloadVotingData}
        />
      </div>
    </div>
  );
};

export default VotingPage;

import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { Typography, Image, message, Tooltip } from "antd";
import Button from "../../components/Button";
import BigNumber from "bignumber.js";
//@ts-ignore
import Fade from "react-reveal/Fade";
import useFetch from "../../hooks/useFetch";
import AppPagination from "../../components/AppPagination";
import AppLoading from "../../components/AppLoading";
import useDebounce from "../../hooks/useDebounce";
import { useTreasuryContract } from "../../hooks/useContract";
import { useWeb3React } from "web3-react-core";
import { CHAIN_INFO } from "../../constants/chainInfo";
import { SupportedChainId } from "../../constants/chains";
import AppDialog from "../../components/AppDialog";
import Message from "../../constants/message";
import DashDate from "../Dashboard/component/DashDate";
import "./index.scss";

const Claim: React.FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<undefined | string>(undefined);
  const [inputSearch, setInputSearch] = useState("");
  const [startGettingSignature, setStartGettingSignature] = useState<
    boolean | undefined
  >(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [startClaiming, setStartClaiming] = useState<boolean | undefined>(
    undefined
  );
  const [reloadClaiming, setReloadClaiming] = useState<boolean | undefined>(
    true
  );
  const [claimSuccess, setClaimSuccess] = useState<boolean | undefined>(
    undefined
  );
  const userData = useSelector((state: any) => state.userLayout.userData);
  const [pickedDate, setPickedDate] = useState<
    | {
      from: number;
      to: number;
    }
    | undefined
  >(undefined);

  const { account, chainId } = useWeb3React();
  const treasuryContract = useTreasuryContract();

  const debouncedKeyword = useDebounce<string>(inputSearch, 500);

  const { explorer } =
    CHAIN_INFO[
    chainId ? (chainId as SupportedChainId) : SupportedChainId.CHARITY
    ];

  const handleDatePickerChange = (dates: any, dateStrings: any) => {
    setPickedDate({
      from: parseInt(`${dates[0].toDate().getTime()}`),
      to: parseInt(`${dates[1].toDate().getTime()}`),
    });
  };

  //   const { data, loading } = useFetch<any>(
  //     userData
  //       ? pickedDate
  //         ? `reward?userId=${userData?.id}&keyword=${debouncedKeyword}&fromDate=${pickedDate.from}&toDate=${pickedDate.to}`
  //         : `reward?userId=${userData?.id}&keyword=${debouncedKeyword}`
  //       : "",
  //     {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     false,
  //     [userData, reloadClaiming],
  //     {},
  //     () => {
  //       setReloadClaiming(undefined);
  //     },
  //     () => {
  //       setReloadClaiming(undefined);
  //     }
  //   );

  const { loading: rewardRefreshLoading } = useFetch<any>(
    "reward/refresh",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [claimSuccess],
    {
      method: "POST",
    },
    () => {
      setClaimSuccess(undefined);
      setOpenDialog(true);
    },
    () => {
      setClaimSuccess(undefined);
    }
  );

  const { data: userClaimData, loading: userClaimLoading } = useFetch<any>(
    `reward/me`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [reloadClaiming],
    {},
    () => {
      // setReloadClaiming(undefined);
    },
    () => {
      // setReloadClaiming(undefined);
    }
  );

  const { data, loading } = useFetch<any>(
    userData
      ? pickedDate
        ? `reward?page=${currentPage}&orderDirection=DESC&limit=10&userId=${userData?.id}&keyword=${debouncedKeyword}&fromDate=${pickedDate.from}&toDate=${pickedDate.to}&orderBy=deletedAt`
        : `reward?page=${currentPage}&orderDirection=DESC&limit=10&userId=${userData?.id}&keyword=${debouncedKeyword}&orderBy=date`
      : "",
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [userData, account, userClaimLoading ? undefined: true],
    {},
    () => {
      setReloadClaiming(undefined);
    },
    () => {
      setReloadClaiming(undefined);
    }
  );

  const {
    data: claimSignatureData,
    loading: gettingSignatureLoading,
    error,
  } = useFetch<{
    signature: string;
    payload: {
      nonce: string;
      token: string;
      amount: string;
      from: string;
      expire: string;
    };
  }>(
    `reward/claim`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [startGettingSignature],
    {
      method: "POST",
    },
    () => {
      setStartGettingSignature(undefined);
    },
    () => {
      setStartGettingSignature(undefined);
    }
  );

  useEffect(() => {
    (account || pickedDate) && setReloadClaiming(true);
  }, [account, pickedDate]);

  useEffect(() => {
    error && message.error(error.message, 4);
  }, [error]);

  useEffect(() => {
    claimSignatureData ? setStartClaiming(true) : setStartClaiming(false);
  }, [claimSignatureData]);

  useEffect(() => {
    const issueTokens = async () => {
      try {
        const tx = await treasuryContract.claim(
          claimSignatureData?.payload.from,
          claimSignatureData?.payload.token,
          claimSignatureData?.payload.amount,
          claimSignatureData?.payload.expire,
          claimSignatureData?.payload.nonce,
          claimSignatureData?.signature
        );

        setTxHash(tx.hash);

        await tx.wait(3);

        setStartClaiming(false);
        setTxHash(undefined);
        setClaimSuccess(true);
      } catch (err: any) {
        message.error(err.message, 3);
        setStartClaiming(false);
      }
    };

    claimSignatureData && treasuryContract && account && issueTokens();
  }, [setStartClaiming, claimSignatureData, treasuryContract, account]);

  return (
    <div className="claim">
      <Typography.Title level={3} className="claim__title">
        Ti???n Th?????ng
      </Typography.Title>
      <div className="claim__list">
        <div className="claim__list-header">
          <Typography.Title level={4} className="claim__list-title">
            Ti???n th?????ng theo ng??y
          </Typography.Title>
          {/* <Input.Search
                        placeholder="T??m ki???m"
                        onChange={(e: any) => {
                            setInputSearch(e.target.value)
                        }}
                        style={{ width: 260 }}
                        className="voting__list-input"
                    /> */}
          <DashDate onChange={handleDatePickerChange} />
        </div>
        {/* <p className="claim__line"> */}
        {/* <strong className="claim__amount"> */}
        {/* <div className="claim__icon"> */}
        {/* <Image src="/icon/ethereum_1.svg" preview={false} /> */}
        {/* </div> */}
        <div className="claim__content">
          <div className="claim__main">
            <p className="claim__line">
              T???ng th?????ng:
              <strong className="claim__amount">
                <span>
                  {new BigNumber(userClaimData?.totalLeftReward || 0)
                    .div(1e18)
                    .toFixed()}
                </span>
                <div className="claim__icon">
                  <Image src="/icon/ethereum_1.svg" preview={false} />
                </div>
              </strong>
            </p>
            <p className="claim__line">
              ???? l??nh:
              <strong className="claim__amount">
                <span>
                  {new BigNumber(userClaimData?.totalClaimedReward || 0)
                    .div(1e18)
                    .toFixed()}
                </span>
                <div className="claim__icon">
                  <Image src="/icon/ethereum_1.svg" preview={false} />
                </div>
              </strong>
            </p>
            <Button
              fontSize="17px"
              width="150px"
              maxWidth="100%"
              content="L??nh th?????ng"
              bgColor="#F0CF27"
              className="claim__cta"
              padding="20px 20px"
              onClick={() => setStartGettingSignature(true)}
              disabled={
                new BigNumber(userClaimData?.totalLeftReward).eq(0) ||
                gettingSignatureLoading
              }
            />
          </div>
          <div className="claim__block-container">
            {data &&
              data.rows.map((claimData: any) => (
                <div className="claim__block" key={claimData.id}>
                  <div className="claim__divider"></div>
                  <div className="claim__wrapper">
                    <div className="claim__left">
                      <p className="claim__line">
                        Ng??y:{" "}
                        <strong>
                          {moment(claimData.date).format("DD-MM-YYYY")}
                        </strong>
                      </p>
                      <p className="claim__line">
                        S??? l?????ng:{" "}
                        <strong className="claim__amount">
                          <span>
                            {new BigNumber(claimData.amount)
                              .div(1e18)
                              .toFixed(3)}
                          </span>
                          <div className="claim__icon">
                            <Image
                              src="/icon/ethereum_1.svg"
                              preview={false}
                            />
                          </div>
                        </strong>
                      </p>
                    </div>
                    {claimData.deletedAt && (
                      <Tooltip title="???? l??nh">
                        <Image
                          className="claim__claimed"
                          src="/icon/reward.svg"
                          preview={false}
                        />
                      </Tooltip>
                    )}
                  </div>
                  <div className="claim__divider"></div>
                </div>
              ))}
          </div>
          {/* </strong> */}
          {/* </p> */}
        </div>
        <div className="claim__pagination-wrapper">
          <AppPagination
            defaultPageSize={data ? data.limit : 10}
            pageSize={data ? data.limit : 10}
            totalPage={data ? data.count : 0}
            current={currentPage}
            onChange={(page: number) => setCurrentPage(page)}
          />
        </div>
        {(loading ||
          startClaiming ||
          gettingSignatureLoading ||
          rewardRefreshLoading) && (
            <AppLoading
              showContent={txHash !== undefined}
              loadingContent={
                <Fade bottom>
                  <div className="tx-info">
                    <p className="tx-info__alert">
                      Giao d???ch c???a b???n ??ang ???????c x??? l?? ! Vui l??ng ki??n nh???n.
                    </p>
                    <p className="tx-info__title">
                      <strong>{txHash}</strong>
                    </p>
                    <span
                      className="tx-info__view-more"
                      onClick={() =>
                        window.open(`${explorer}/tx/${txHash}`, "_blank")
                      }
                    >
                      Nh???n ????? xem th??m
                    </span>
                  </div>
                </Fade>
              }
            />
          )}

        <AppDialog
          type="infor"
          title={`B???n ???? l??nh th?????ng th??nh c??ng!`}
          description={Message.INFOR_DC_01}
          confirmText={Message.INFOR_CF_01}
          onConfirm={() => {
            setReloadClaiming(true);
            setOpenDialog(false);
          }}
          visible={openDialog}
          onCancel={() => setOpenDialog(false)}
        />
      </div>
    </div>
  );
};

export default Claim;

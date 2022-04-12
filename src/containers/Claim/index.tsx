import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Input, Typography, Image, message, Tooltip } from 'antd';
import Button from '../../components/Button';
import BigNumber from 'bignumber.js';
import useFetch from '../../hooks/useFetch';
import AppPagination from '../../components/AppPagination';
import AppLoading from '../../components/AppLoading';
import useDebounce from '../../hooks/useDebounce';
import { useTreasuryContract } from '../../hooks/useContract';
import { useWeb3React } from 'web3-react-core';
import { CHAIN_INFO } from '../../constants/chainInfo';
import { SupportedChainId } from '../../constants/chains';
import AppDialog from '../../components/AppDialog';
import Message from '../../constants/message';
import DashDate from '../Dashboard/component/DashDate';
import "./index.scss";

const Claim: React.FC = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [txHash, setTxHash] = useState<undefined | string>(undefined);
    const [inputSearch, setInputSearch] = useState("");
    const [startGettingSignature, setStartGettingSignature] = useState<boolean | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [startClaiming, setStartClaiming] = useState<boolean | undefined>(undefined);
    const [reloadClaiming, setReloadClaiming] = useState<boolean | undefined>(true);
    const userData = useSelector((state: any) => state.userLayout.userData);
    const [pickedDate, setPickedDate] = useState<{
        from: number,
        to: number
    } | undefined>(undefined)

    const { account, chainId } = useWeb3React();
    const treasuryContract = useTreasuryContract();

    const debouncedKeyword = useDebounce<string>(inputSearch, 500);

    const {
        explorer
    } = CHAIN_INFO[
        chainId ? (chainId as SupportedChainId) : SupportedChainId.CHARITY
        ];

    const handleDatePickerChange = (dates: any, dateStrings: any) => {
        setPickedDate({
            from: parseInt(`${dates[0].toDate().getTime()}`),
            to: parseInt(`${dates[1].toDate().getTime()}`),
        });
    }

    const { data, loading } = useFetch<any>(
        userData ? (pickedDate ? `reward?userId=${userData?.id}&keyword=${debouncedKeyword}&fromDate=${pickedDate.from}&toDate=${pickedDate.to}`: `reward?userId=${userData?.id}&keyword=${debouncedKeyword}`) : '',
        {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        false,
        [userData, reloadClaiming],
        {},
        () => { setReloadClaiming(undefined) },
        () => { setReloadClaiming(undefined) }
    );

    const { data: userClaimData } = useFetch<any>(
        `reward/me`,
        {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        false,
        []
    );

    const { data: claimSignatureData, loading: gettingSignatureLoading, error } = useFetch<{
        signature: string,
        payload: {
            nonce: string,
            token: string,
            amount: string
            from: string,
            expire: string
        }
    }>(
        `reward/claim`,
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        false,
        [startGettingSignature],
        {
            method: "POST",
        },
        () => { setStartGettingSignature(undefined) },
        () => { setStartGettingSignature(undefined) }
    )

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
                )

                setTxHash(tx.hash);

                await tx.wait(3);

                setStartClaiming(false);
                setTxHash(undefined);
                setOpenDialog(true);
            } catch (err: any) {
                message.error(err.message, 3);
                setStartClaiming(false);
            }
        }

        claimSignatureData && treasuryContract && account && issueTokens();
    }, [setStartClaiming, claimSignatureData, treasuryContract, account]);

    return (
        <div className="claim">
            <Typography.Title level={3} className="claim__title">
                Tiền Thưởng
            </Typography.Title>
            <div className="claim__list">
                <div className="claim__list-header">
                    <Typography.Title level={4} className="claim__list-title">
                        Tiền thưởng theo ngày
                    </Typography.Title>
                    {/* <Input.Search
                        placeholder="Tìm kiếm"
                        onChange={(e: any) => {
                            setInputSearch(e.target.value)
                        }}
                        style={{ width: 260 }}
                        className="voting__list-input"
                    /> */}
                    <DashDate onChange={handleDatePickerChange}/>
                </div>
                <div className="claim__content">
                    <div className="claim__main">
                        <p className="claim__line">
                            Tổng thưởng:
                            <strong className="claim__amount">
                                <span>{new BigNumber(userClaimData?.totalLeftReward || 0).div(1e18).toFixed()}</span>
                                <div className="claim__icon">
                                    <Image src="/icon/ethereum_1.svg" preview={false} />
                                </div>
                            </strong>
                        </p>
                        <p className="claim__line">Đã lĩnh:
                            <strong className="claim__amount">
                                <span>{new BigNumber(userClaimData?.totalClaimedReward || 0).div(1e18).toFixed()}</span>
                                <div className="claim__icon">
                                    <Image src="/icon/ethereum_1.svg" preview={false} />
                                </div>
                            </strong>
                        </p>
                        <Button
                            fontSize="17px"
                            width="150px"
                            maxWidth="100%"
                            content="Lĩnh thưởng"
                            bgColor="#F0CF27"
                            className="claim__cta"
                            padding="20px 20px"
                            onClick={() => setStartGettingSignature(true)}
                            disabled={new BigNumber(userClaimData?.totalLeftReward).eq(0) || gettingSignatureLoading}
                        />
                    </div>
                    {
                        data && data.rows.map((claimData: any) => (
                            <div className="claim__block" key={claimData.id}>
                                <div className="claim__divider"></div>
                                <div className="claim__wrapper">
                                    <div className="claim__left">
                                        <p className="claim__line">Ngày: <strong>{moment(claimData.date).format("DD-MM-YYYY")}</strong></p>
                                        <p className="claim__line">
                                            Số lượng: <strong className="claim__amount">
                                                <span>{new BigNumber(claimData.amount).div(1e18).toFixed(3)}</span>
                                                <div className="claim__icon">
                                                    <Image src="/icon/ethereum_1.svg" preview={false} />
                                                </div>
                                            </strong>
                                        </p>
                                    </div>
                                    <Tooltip title="Đã lĩnh">
                                        <Image className="claim__claimed" src="/icon/reward.svg" preview={false} />
                                    </Tooltip>
                                </div>
                                <div className="claim__divider"></div>
                            </div>
                        ))
                    }
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
                {
                    (loading || startClaiming || gettingSignatureLoading) && (
                        <AppLoading showContent={txHash !== undefined} loadingContent={
                            <div className="tx-info">
                                <p className="tx-info__alert">Your transaction is processing! Please be patient.</p>
                                <p className="tx-info__title"><strong>{txHash}</strong></p>
                                <span className="tx-info__view-more" onClick={() => window.open(`${explorer}/tx/${txHash}`, '_blank')}>Click to view more</span>
                            </div>
                        } />
                    )
                }

                {openDialog ? (
                    <AppDialog
                        type="infor"
                        title={`Bạn đã lĩnh thưởng thành công!`}
                        description={Message.INFOR_DC_01}
                        confirmText={Message.INFOR_CF_01}
                        onConfirm={() => {
                            setReloadClaiming(true);
                            setOpenDialog(false);
                        }}
                    />
                ) : null}
            </div>
        </div>
    )
}

export default Claim;
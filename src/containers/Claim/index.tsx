import React, { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Input, Typography, Image } from 'antd';
import Button from '../../components/Button';
import BigNumber from 'bignumber.js';
import useFetch from '../../hooks/useFetch';
import AppPagination from '../../components/AppPagination';
import AppLoading from '../../components/AppLoading';
import useDebounce from '../../hooks/useDebounce';
import "./index.scss";

const Claim: React.FC = () => {
    const [inputSearch, setInputSearch] = useState("");
    const [startGettingSignature, setStartGettingSignature] = useState<boolean | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const userData = useSelector((state: any) => state.userLayout.userData);

    const debouncedKeyword = useDebounce<string>(inputSearch, 500);

    const { data, loading } = useFetch<any>(
        `reward?userId=${userData?.id}&keyword=${debouncedKeyword}`,
        {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        false,
        [userData]
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

    const { data: claimSignatureData, loading: gettingSignatureLoading } = useFetch<{
        signature: string,
        payload: {
            nonce: string,
            token: string,
            amount: string
            from: string
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

    console.log(claimSignatureData);

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
                    <Input.Search
                        placeholder="Tìm kiếm"
                        onChange={(e: any) => {
                            setInputSearch(e.target.value)
                        }}
                        style={{ width: 260 }}
                        className="voting__list-input"
                    />
                </div>
                <div className="claim__content">
                    <div className="claim__main">
                        <p className="claim__line">Tổng thưởng: <strong>{new BigNumber(userClaimData?.totalClaimedReward || 0).div(1e18).toFixed(3)}</strong></p>
                        <p className="claim__line">Đã lĩnh:
                            <strong className="claim__amount">
                                <span>{userClaimData?.totalLeftReward}</span>
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
                            disabled={new BigNumber(userClaimData?.totalClaimedReward).minus(new BigNumber(userClaimData?.totalLeftReward)).eq(0) || gettingSignatureLoading}
                        />
                    </div>
                    {
                        data && data.rows.map((claimData: any) => (
                            <div className="claim__block" key={claimData.id}>
                                <div className="claim__divider"></div>
                                <p className="claim__line">Ngày: <strong>{moment(claimData.date).format("DD-MM-YYYY")}</strong></p>
                                <p className="claim__line">
                                    Số lượng: <strong className="claim__amount">
                                        <span>{new BigNumber(claimData.amount).div(1e18).toFixed(3)}</span>
                                        <div className="claim__icon">
                                            <Image src="/icon/ethereum_1.svg" preview={false} />
                                        </div>
                                    </strong>
                                </p>
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
                    (loading || gettingSignatureLoading) && <AppLoading showContent={false} loadingContent={<div></div>} />
                }
            </div>
        </div>
    )
}

export default Claim;
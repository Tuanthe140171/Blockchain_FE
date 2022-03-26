import { Typography, Image, InputNumber, Avatar, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { CloseOutlined } from '@ant-design/icons';
import { useWeb3React } from "web3-react-core";
//@ts-ignore
import Fade from 'react-reveal/Fade';
import Button from "../Button";
import { useCharityVerseContract } from "../../hooks/useContract";
import "./index.scss";
import BigNumber from "bignumber.js";

type AppDonateProps = {
    onClose: () => void;
}

const AppDonate: React.FC<AppDonateProps> = (props) => {
    const [userBalance, setUserBalance] = useState<string>("0");
    const { account } = useWeb3React();
    const charityContract = useCharityVerseContract();

    useEffect(() => {
        let interval: any;

        const getCRVBalance = async () => {
            const balance = await charityContract.balanceOf(account);
            setUserBalance(new BigNumber(ethers.utils.formatEther(balance)).toFixed(2));
        }

        charityContract && account && getCRVBalance();

        return () => {
            clearInterval(interval);
        }
    }, [charityContract, account]);
    return (
        <div className="app-donate">

            <div className="app-donate__backdrop"></div>
            <Fade bottom>
                <div className="app-donate__wrapper">
                    <CloseOutlined className="app-donate__close" onClick={props.onClose} />
                    <Typography.Title level={4} className="app-donate__title">Donate</Typography.Title>
                    <div className="app-donate__content">
                        <div className="app-donate__donation">
                            <div className="app-donate__amount">
                                <header className="app-donate__header">
                                    <Typography.Title level={4} className="app-donate__amount-title">
                                        Enter the amount
                                    </Typography.Title>
                                    <Typography.Paragraph className="app-donate__balance">
                                        Your balance: {userBalance}
                                    </Typography.Paragraph>
                                </header>
                                <InputNumber
                                    addonAfter={
                                        <div className="app-donate__icon">
                                            <Image src="/icon/ethereum_1.svg" preview={false} />
                                            <p>CRV</p>
                                        </div>
                                    }
                                    controls={false}
                                    className="app-donate__input"
                                />
                                <Button width="215px" maxWidth="100%" content="Donate now" bgColor="#F0CF27" className="app-donate__cta" />
                                <span className="app-donate__policy">By continuing, you agree with Cverse terms and privacy policy</span>
                            </div>
                        </div>
                        <div className="app-donate__transaction">
                            <div className="transaction-details">
                                <p className="transaction-details__title">Your transaction details</p>
                                <div className="transaction-details__info">
                                    <div className="details-info__block">
                                        <span className="details-info__label">
                                            Số coin mua
                                        </span>
                                        <span className="details-info__text">
                                            <strong>{0}</strong>
                                            <Image src="/icon/ethereum_2.svg" preview={false} />
                                        </span>
                                    </div>
                                    <div className="details-info__block">
                                        <span className="details-info__label">
                                            Fee giao dịch
                                        </span>
                                        <span className="details-info__text">
                                            <strong>10000</strong>
                                            <Image src="/icon/ethereum_2.svg" preview={false} />
                                        </span>
                                    </div>
                                    <div className="details-info__divider"></div>
                                    <div className="details-info__block">
                                        <span className="details-info__label">
                                            Total due today
                                        </span>
                                        <span className="details-info__text">
                                            <strong>310</strong>
                                            <Image src="/icon/ethereum_2.svg" preview={false} />
                                        </span>
                                    </div>
                                </div>
                                <div className="transaction-details__receipt details-receipt">
                                    <Avatar src="/icon/bad-lucker.svg" className="details-receipt__label">
                                        Total due today
                                    </Avatar>
                                    <span className="details-receipt__text">
                                        <p>You're supporting</p>
                                        <strong>Mai Thị Mây</strong>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        </div >
    )
}

export default AppDonate;
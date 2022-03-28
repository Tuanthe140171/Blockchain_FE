import { Typography, Image, InputNumber, Avatar, message } from "antd";
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
import AppDialog from "../AppDialog";
import Message from "../../constants/message";
import AppLoading from "../AppLoading";
import { CHAIN_INFO } from "../../constants/chainInfo";
import { SupportedChainId } from "../../constants/chains";

type AppDonateProps = {
    onClose: () => void;
    walletAddress: string,
    avatar: string,
    name: string
}

const AppDonate: React.FC<AppDonateProps> = (props) => {
    const { name, avatar, walletAddress } = props;
    const [txHash, setTxHash] = useState<undefined | string>(undefined);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [loadingDonate, setLoadingDonate] = useState<boolean>(false);
    const [inputAmount, setInputAmount] = useState<string>("0");
    const [userBalance, setUserBalance] = useState<string>("0");
    const [donateFee, setDonateFee] = useState(0);
    const { account, chainId } = useWeb3React();
    const charityContract = useCharityVerseContract();

    const {
        explorer
      } = CHAIN_INFO[
        chainId ? (chainId as SupportedChainId) : SupportedChainId.CHARITY
    ];

    useEffect(() => {
        const queryDonateFee = async () => {
            const donateFee = await charityContract.donateFeePercent();
            setDonateFee(donateFee / 10000);
        }

        charityContract && queryDonateFee();
    }, [charityContract]);

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

    const handleUserDonation = async () => {
        try {
            if (charityContract && account && walletAddress) {
                setLoadingDonate(true);

                const tx = await charityContract.donate(walletAddress, new BigNumber(inputAmount).multipliedBy(1e18).toFixed());

                setTxHash(tx.hash);

                await tx.wait(3);

                setTxHash(undefined);
                setLoadingDonate(false);
                setInputAmount("0");

                message.success(`Bạn đã ủng hộ thành công ${inputAmount} coin cho ${name}`, 5)
            }
        } catch (err: any) {
            setLoadingDonate(false);
            message.error(err.message, 3);
        }
    }

    return (
        <>
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
                                        placeholder="0"
                                        value={inputAmount}
                                        onChange={(e: any) => {
                                            !e ? setInputAmount("0") : setInputAmount(e)
                                        }}
                                        controls={false}
                                        className="app-donate__input"
                                    />
                                    <Button onClick={() => { setOpenDialog(true) }} disabled={loadingDonate || new BigNumber(inputAmount).gt(new BigNumber(userBalance)) || new BigNumber(inputAmount).lte(0)} width="215px" maxWidth="100%" content="Donate now" bgColor="#F0CF27" className="app-donate__cta" />
                                    <span className="app-donate__policy">By continuing, you agree with Cverse terms and privacy policy</span>
                                </div>
                            </div>
                            <div className="app-donate__transaction">
                                <div className="app-donate-details">
                                    <p className="app-donate-details__title">Your transaction details</p>
                                    <div className="app-donate-details__info">
                                        <div className="app-details-info__block">
                                            <span className="app-details-info__label">
                                                Your donation
                                            </span>
                                            <span className="app-details-info__text">
                                                <strong style={{ maxWidth: 100, wordBreak: "break-word" }}>{inputAmount ? inputAmount : "0"}</strong>
                                                <Image src="/icon/ethereum_2.svg" preview={false} />
                                            </span>
                                        </div>
                                        <div className="app-details-info__block">
                                            <span className="app-details-info__label">
                                                Fee giao dịch
                                            </span>
                                            <span className="app-details-info__text">
                                                <strong style={{ maxWidth: 100, wordBreak: "break-word" }}>{new BigNumber(inputAmount || "0").multipliedBy(donateFee).toFixed(2)}</strong>
                                                <Image src="/icon/ethereum_2.svg" preview={false} />
                                            </span>
                                        </div>
                                        <div className="app-details-info__divider"></div>
                                        <div className="app-details-info__block">
                                            <span className="details-info__label">
                                                Total due today
                                            </span>
                                            <span className="app-details-info__text">
                                                <strong style={{ maxWidth: 100, wordBreak: "break-word" }}>{new BigNumber(inputAmount || "0").multipliedBy(donateFee + 1).toFixed(2)}</strong>
                                                <Image src="/icon/ethereum_2.svg" preview={false} />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="app-donate-details__receipt app-details-receipt">
                                        <Avatar src={avatar} className="app-details-receipt__label">
                                        </Avatar>
                                        <span className="app-details-receipt__text">
                                            <p>You're supporting</p>
                                            <strong>{name}</strong>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </div >
            {openDialog ? (
                <AppDialog
                    type="confirm"
                    title={`Bạn có chắc chắn muốn ủng hộ ${inputAmount} coin cho ${name} ?`}
                    description="Nếu chưa thì xem xét hết thông tin, hãy xem lại"
                    confirmText={"Yes"}
                    cancelText={"No"}
                    onConfirm={() => {
                        setOpenDialog(false);
                        handleUserDonation();
                    }}
                    onClose={() => {
                        setOpenDialog(false);
                    }}
                />
            ) : null}
            {
                loadingDonate && <AppLoading showContent={txHash !== undefined} loadingContent={
                    <div className="tx-info">
                        <p className="tx-info__alert">Your transaction is processing! Please be patient.</p>
                        <p className="tx-info__title"><strong>{txHash}</strong></p>
                        <span className="tx-info__view-more" onClick={() => window.open(`${explorer}/tx/${txHash}`, '_blank')}>Click to view more</span>
                    </div>  
                }/>
            }
        </>
    )
}

export default AppDonate;
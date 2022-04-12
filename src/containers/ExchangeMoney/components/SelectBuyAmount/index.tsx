import { Typography, InputNumber, Image, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useWeb3React } from "web3-react-core";
import { ethers } from "ethers";
import { BigNumber } from "bignumber.js";
import { useCharityVerseContract } from "../../../../hooks/useContract";
import "./index.scss";

const MINIMUM_THRESHOLD = 200000;

type SelectBuyAmountProps = {
    setCurrentStep: () => void,
    onChange: (amount: string) => void,
    inputAmount: string,
    setInputAmount: React.Dispatch<React.SetStateAction<string>>,
    isBuy: boolean
}

const SelectBuyAmount: React.FC<SelectBuyAmountProps> = (props) => {
    const { inputAmount, onChange, isBuy, setInputAmount } = props;
    const [userBalance, setUserBalance] = useState<string>("0");
    const charityContract = useCharityVerseContract();
    const { account } = useWeb3React();

    useEffect(() => {
        const getCRVBalance = async () => {
            const balance = await charityContract.balanceOf(account);
            setUserBalance(ethers.utils.formatEther(balance));
        };

        charityContract && account && !isBuy && getCRVBalance();
    }, [charityContract, account, isBuy]);


    return (
        <div className="select-buy-amount">
            <Typography.Title level={4} className="select-buy-amount__title">
                1. {isBuy ? 'Nhập số tiền mà bạn muốn mua' : 'Nhập số tokens mà bạn muốn bán'}
            </Typography.Title>
            <Typography.Paragraph className="select-buy-amount__input-title">
                Số lượng
            </Typography.Paragraph>
            <InputNumber
                addonAfter={
                    <div className="select-buy-amount__addOns">
                        {
                            !isBuy &&
                            (
                                <div className="select-buy-amount__max" onClick={() => { setInputAmount(new BigNumber(userBalance).toFixed()) }}>
                                    Tối đa
                                </div>
                            )
                        }

                        <div className="select-buy-amount__icon">
                            <Image src="/icon/ethereum_1.svg" preview={false} />
                            <p>{isBuy ? `VND` : `VNC`}</p>
                        </div>
                    </div>
                }
                onChange={onChange}
                onKeyDown={(e: any) => {
                    if ((e.code === 'ArrowLeft') || (e.code === 'ArrowRight') ||
                        (e.code === 'ArrowUp') || (e.code === 'ArrowDown') ||
                        (e.code === 'Delete') || (e.code === 'Backspace')) {
                        return;
                    } else if (e.key.search(/\d/) === -1) {
                        e.preventDefault();
                    } else if ((isBuy && e.target.value.length >= 14) || e.target.value.length >= 20) {
                        e.preventDefault();
                    }
                }}
                value={inputAmount}
                controls={false}
                className="select-buy-amount__input"
            />
            <p className="select-buy-amount__rate">1 VNC ~ <strong>1000</strong> VND</p>
            <Button
                disabled={(function () {
                    if (!inputAmount) {
                        return true;
                    }

                    if (!isBuy) {
                        return new BigNumber(inputAmount).lte(0) || new BigNumber(inputAmount).gt(userBalance);
                    }

                    return new BigNumber(inputAmount).lt(MINIMUM_THRESHOLD);
                }())}
                className="select-buy-amount__btn"
                onClick={props.setCurrentStep}
            >
                Xác nhận
            </Button>
        </div>
    )
}

export default SelectBuyAmount;
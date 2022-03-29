import React, { useState, useEffect } from 'react';
import { Typography, Button, Input, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useWeb3React } from 'web3-react-core';
import { BigNumber } from 'bignumber.js';
import useFetch from '../../../../hooks/useFetch';
import { useCharityVerseContract } from '../../../../hooks/useContract';
import AppLoading from '../../../../components/AppLoading';
import { SupportedChainId } from '../../../../constants/chains';
import { CHAIN_INFO } from '../../../../constants/chainInfo';
import "./index.scss";

type VerificationProps = {
    setCurrentStep: () => void,
    inputAmount: number,
    paymentTxId: string,
    setPaymentTxId: (text: string) => void;
}

const Verification: React.FC<VerificationProps> = (props) => {
    const { inputAmount, paymentTxId, setPaymentTxId, setCurrentStep } = props;

    const [txHash, setTxHash] = useState<undefined | string>(undefined);
    const [startIssuing, setStartIssuing] = useState<boolean | undefined>(undefined);
    const [startGettingSignature, setStartGettingSignature] = useState<boolean | undefined>(undefined);

    const { account, chainId } = useWeb3React();
    const charityContract = useCharityVerseContract();
    const [searchParams] = useSearchParams();
    // const navigate = useNavigate();

    const orderId = searchParams.get("orderId");
    const orderMessage = searchParams.get("message");
    const orderAmount = searchParams.get("amount");
    const orderResultCode = searchParams.get("resultCode");

    const {
        explorer
      } = CHAIN_INFO[
        chainId ? (chainId as SupportedChainId) : SupportedChainId.CHARITY
    ];

    const { data, loading } = useFetch<{
        signature: string,
        nonce: string
    }>(
        `transactions/buy`, 
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        }, 
        false, 
        [startGettingSignature], 
        {
            method: "POST",
            body: JSON.stringify({
                amount: new BigNumber(inputAmount).multipliedBy(1e18).toFixed()
            })
        }, 
        () => { setStartGettingSignature(undefined) },
        () => { setStartGettingSignature(undefined) }
    )

    useEffect(() => {
        data ? setStartIssuing(true): setStartIssuing(false);
    }, [data]);

    useEffect(() => {
        if (orderMessage && orderResultCode) {
            if (orderMessage === "Successful.") {
                message.success("Bạn đã chuyển tiền thành công", 4);
            } else if (orderMessage === "Transaction denied by user.") {
                message.error("Bạn đã hủy giao dịch chuyển tiền", 4);
                // navigate("/exchange?tab=0");
            }
        }
    }, [orderMessage, orderResultCode]);

    useEffect(() => {
        const issueTokens = async () => {
            try {
                setStartIssuing(true);

                const tx = await charityContract.issueTokensByInvestor(
                    account,
                    new BigNumber(inputAmount).multipliedBy(1e18).toFixed(),
                    data?.nonce,
                    data?.signature
                )

                setTxHash(tx.hash);

                await tx.wait(3);

                setStartIssuing(false);
                setTxHash(undefined);
                setCurrentStep();
            } catch (err: any) {
                message.error(err.message, 3);
                setStartIssuing(false);
            }
        }

        // startIssuing && data && charityContract && account && issueTokens();
    }, [startIssuing, data, charityContract, account, inputAmount, setCurrentStep]);

    return (
        <div className="verification">
            <Typography.Title level={4} className="verification__title">
                3. Security verification
            </Typography.Title>
            <div>
                <span>Order ID: </span>
                <span>{orderId}</span>
            </div>
            <div>
                <span>Amount: </span>
                <span>{orderAmount}</span>
            </div>
            <Input
                className="verification__input"
                value={paymentTxId}
                onChange={e => setPaymentTxId(e.target.value)}
            />
            <Button className="verification__btn"
                onClick={() => {
                    setStartGettingSignature(true);
                }}
                disabled={paymentTxId.length <= 0 || loading || startIssuing}
            >
                Confirm
            </Button>
            {
                (loading || startIssuing) && (
                    <AppLoading showContent={txHash !== undefined} loadingContent={
                        <div className="tx-info">
                            <p className="tx-info__alert">Your transaction is processing! Please be patient.</p>
                            <p className="tx-info__title"><strong>{txHash}</strong></p>
                            <span className="tx-info__view-more" onClick={() => window.open(`${explorer}/tx/${txHash}`, '_blank')}>Click to view more</span>
                        </div>  
                    }/>
                )
            }
        </div>
    )
}

export default Verification;
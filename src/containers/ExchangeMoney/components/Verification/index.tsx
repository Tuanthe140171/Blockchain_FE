import React, { useState, useEffect } from 'react';
import { Typography, Button, Input, message } from 'antd';
import { useWeb3React } from 'web3-react-core';
import { Link } from 'react-router-dom';
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
                amount: inputAmount
            })
        }, 
        () => { setStartGettingSignature(undefined) },
        () => { setStartGettingSignature(undefined) }
    )

    useEffect(() => {
        data ? setStartIssuing(true): setStartIssuing(false);
    }, [data]);

    useEffect(() => {
        const issueTokens = async () => {
            try {
                setStartIssuing(true);

                const tx = await charityContract.issueTokensByInvestor(
                    account,
                    inputAmount,
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

        startIssuing && data && charityContract && account && issueTokens();
    }, [startIssuing, data, charityContract, account, inputAmount, setCurrentStep]);

    return (
        <div className="verification">
            <Typography.Title level={4} className="verification__title">
                3. Security verification
            </Typography.Title>
            <Typography.Paragraph className="verification__input-title">
                Enter email verification code
            </Typography.Paragraph>
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
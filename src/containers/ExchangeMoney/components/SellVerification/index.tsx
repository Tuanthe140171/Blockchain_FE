import React, { useState, useEffect } from 'react';
import { Typography, Button, message } from 'antd';
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
    inputAmount: string,
    paymentTxId: string,
    setPaymentTxId: (text: string) => void,
    setInputAmount: React.Dispatch<React.SetStateAction<string>>,
}

const SellVerification: React.FC<VerificationProps> = (props) => {
    const { inputAmount, setCurrentStep } = props;

    const [txHash, setTxHash] = useState<undefined | string>(undefined);
    const [startIssuing, setStartIssuing] = useState<boolean | undefined>(undefined);

    const { account, chainId } = useWeb3React();
    const charityContract = useCharityVerseContract();

    const {
        explorer
      } = CHAIN_INFO[
        chainId ? (chainId as SupportedChainId) : SupportedChainId.CHARITY
    ];

    const { data, loading } = useFetch<{
        signature: string,
        nonce: string,
        amount: string
    }>(
        `transactions/sell`, 
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        }, 
        false, 
        [true], 
        {
            method: "POST",
            body: JSON.stringify({
                amount: `${inputAmount}`
            })
        }
    )

    useEffect(() => {
        data ? setStartIssuing(true): setStartIssuing(false);
    }, [data]);

    useEffect(() => {
        const issueTokens = async () => {
            try {
                setStartIssuing(true);

                const tx = await charityContract.redeemDonate(
                    account,
                    data?.amount,
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
    }, [startIssuing, data, charityContract, account, inputAmount]);

    return (
        <div className="verification">
            <Typography.Title level={4} className="verification__title">
                3. Security verification
            </Typography.Title>
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

export default SellVerification;
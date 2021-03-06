import React, { useState, useEffect } from "react";
import { Typography, Button, message } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useWeb3React } from "web3-react-core";
//@ts-ignore
import Fade from "react-reveal/Fade";
import useFetch from "../../../../hooks/useFetch";
import { useCharityVerseContract } from "../../../../hooks/useContract";
import AppLoading from "../../../../components/AppLoading";
import { SupportedChainId } from "../../../../constants/chains";
import { CHAIN_INFO } from "../../../../constants/chainInfo";
import "./index.scss";

type VerificationProps = {
  setCurrentStep: () => void;
  inputAmount: string;
  paymentTxId: string;
  setPaymentTxId: (text: string) => void;
  setInputAmount: React.Dispatch<React.SetStateAction<string>>;
};

const Verification: React.FC<VerificationProps> = (props) => {
  const {
    inputAmount,
    setInputAmount,
    paymentTxId,
    setPaymentTxId,
    setCurrentStep,
  } = props;

  const [txHash, setTxHash] = useState<undefined | string>(undefined);
  const [startIssuing, setStartIssuing] = useState<boolean | undefined>(
    undefined
  );
  const [startGettingSignature, setStartGettingSignature] = useState<
    boolean | undefined
  >(undefined);

  const { account, chainId } = useWeb3React();
  const charityContract = useCharityVerseContract();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("orderId");
  const orderMessage = searchParams.get("message");
  const orderAmount = searchParams.get("amount");
  const orderResultCode = searchParams.get("resultCode");
  const payType = searchParams.get("payType");

  let disableButton = true;

  if (
    orderResultCode &&
    orderMessage === "Successful." &&
    parseInt(orderResultCode) === 0
  ) {
    disableButton = false;
  }

  const { explorer } =
    CHAIN_INFO[
    chainId ? (chainId as SupportedChainId) : SupportedChainId.CHARITY
    ];

  const { data, loading } = useFetch<{
    signature: string;
    nonce: string;
    paymentID: string;
    amount: string;
  }>(
    `transactions/buy`,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    false,
    [startGettingSignature],
    {
      method: "POST",
      body: JSON.stringify({
        paymentId: orderId,
      }),
    },
    () => {
      setStartGettingSignature(undefined);
    },
    () => {
      setStartGettingSignature(undefined);
    }
  );

  useEffect(() => {
    data ? setStartIssuing(true) : setStartIssuing(false);
  }, [data]);

  useEffect(() => {
    if (orderMessage && orderResultCode) {
      if (orderMessage === "Successful." && parseInt(orderResultCode) === 0) {
        message.success("B???n ???? chuy???n ti???n th??nh c??ng", 4);
      } else if (
        orderMessage === "Transaction denied by user." &&
        parseInt(orderResultCode) === 1006
      ) {
        message.error("B???n ???? h???y giao d???ch chuy???n ti???n", 4);
        navigate("/exchange?type=buy&tab=0");
      } else if (orderMessage === "Transaction+expired.") {
        message.error("Giao d???ch c???a b???n ???? h???t h???n", 4);
        navigate("/exchange?type=buy&tab=0");
      }
    }
  }, [orderMessage, orderResultCode, navigate]);

  useEffect(() => {
    const issueTokens = async () => {
      try {
        setStartIssuing(true);

        const tx = await charityContract.issueTokensByInvestor(
          account,
          data?.amount,
          data?.nonce,
          data?.paymentID,
          data?.signature
        );

        setTxHash(tx.hash);

        await tx.wait(3);

        setStartIssuing(false);
        setTxHash(undefined);
        setCurrentStep();
      } catch (err: any) {
        message.error(err.message, 3);
        setStartIssuing(false);
      }
    };

    startIssuing && data && charityContract && account && issueTokens();
  }, [
    startIssuing,
    data,
    charityContract,
    account,
    inputAmount,
    setCurrentStep,
  ]);

  useEffect(() => {
    orderAmount && setInputAmount && setInputAmount(orderAmount);
  }, [orderAmount, setInputAmount]);

  return (
    <div className="verification">
      <Typography.Title level={4} className="verification__title">
        3. Security verification
      </Typography.Title>
      <div className="verification__order-detail">
        <div className="order-detail">
          <span className="order-detail__label">Order ID: </span>
          <span className="order-detail__value">{orderId}</span>
        </div>
        <div className="order-detail">
          <span className="order-detail__label">Amount: </span>
          <span className="order-detail__value">{orderAmount} VND</span>
        </div>
        <div className="order-detail">
          <span className="order-detail__label">Ph????ng th???c tr??? ti???n: </span>
          <span className="order-detail__value">{payType?.toUpperCase()}</span>
        </div>
      </div>
      <Button
        className="verification__btn"
        onClick={() => {
          setStartGettingSignature(true);
        }}
        disabled={disableButton}
      >
        ???? chuy???n ti???n
      </Button>
      {(loading || startIssuing) && (
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
    </div>
  );
};

export default Verification;

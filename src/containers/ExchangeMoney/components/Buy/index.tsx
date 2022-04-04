import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import SelectBuyAmount from '../SelectBuyAmount';
import PaymentMethod from '../PaymentMethod';
import TransactionDetails from '../TransactionDetails';
import Verification from '../Verification';
import TimeLine from '../TimeLine';
import Message from "../../../../constants/message";
import AppDialog from '../../../../components/AppDialog';
import "./index.scss";
import useFetch from '../../../../hooks/useFetch';

export enum SUPPORTED_METHODS {
    MOMO,
}

const ALL_SUPPORTED_METHODS = {
    [SUPPORTED_METHODS.MOMO]: {
        label: "/icon/momo.svg",
        title: "MOMO",
        account: "Mai Thi Chuyen",
        accountNumber: "42710000387624"
    }
}

const Buy: React.FC = () => {
    const [paymentTxId, setPaymentTxId] = useState("");
    const [paymentMethod, setPaymentMethod] = useState(SUPPORTED_METHODS.MOMO);
    const [inputAmount, setInputAmount] = useState<string>('0');
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const tab = searchParams.get('tab');

    const { data, loading } = useFetch<{ paymentName: string, paymentNumber: string }>("payment/get-payment-information");

    useEffect(() => {
        if (currentStep === 3) {
            setOpenDialog(true);
        }
    }, [currentStep]);

    useEffect(() => {
        tab && setCurrentStep &&  setCurrentStep(parseInt(tab));
    }, [tab, setCurrentStep]);

    const BUY_STEPS = [
        {
            title: "Enter amount",
            description: "",
            component: (
                    <SelectBuyAmount
                    isBuy
                    setCurrentStep={() => {
                        navigate(`/exchange?type=buy&tab=1&amount=${inputAmount}`)
                        setCurrentStep(1)
                    }}
                    onChange={input => setInputAmount(input)}
                    inputAmount={inputAmount}
                    setInputAmount={setInputAmount}
                />
            )
        },
        {
            title: "Payment method",
            description: "",
            component: <PaymentMethod account={data?.paymentName || ""} accountNumber={data?.paymentNumber || ""} chosenPaymentMethod={paymentMethod} supportedPaymentMethods={ALL_SUPPORTED_METHODS} setPaymentMethod={setPaymentMethod} setCurrentStep={() => {
                navigate('/exchange?type=buy&tab=0')
                setCurrentStep(0);
            }} />
        },
        {
            title: "Verification",
            description: "",
            component: <Verification paymentTxId={paymentTxId} setInputAmount={setInputAmount} setPaymentTxId={(text) => setPaymentTxId(text)} inputAmount={inputAmount} setCurrentStep={() => {
                navigate('/exchange?type=buy&tab=3')
                setCurrentStep(3)
            }} />
        },
        {
            title: "Confirmation",
            description: ""
        }
    ]

    return (
        <div className="buy">
            <div className="buy__step">
                <TimeLine
                    steps={BUY_STEPS.map((STEP, key) => ({
                        title: STEP.title,
                        description: STEP.description,
                        id: key
                    }))}
                    curStep={currentStep}
                    setCurStep={setCurrentStep}
                />
                {BUY_STEPS[currentStep].component}
            </div>
            <TransactionDetails 
                isBuy
                loading={loading} 
                account={data?.paymentNumber || ""} 
                accountNumber={data?.paymentName || ""} 
                inputAmount={inputAmount} 
                chosenPaymentMethod={ALL_SUPPORTED_METHODS[paymentMethod]} 
            />
            {openDialog ? (
                <AppDialog
                    type="infor"
                    title={`Bạn đã mua thành công thành công ${inputAmount} coin từ nhà phát hành`}
                    description=""
                    confirmText={Message.INFOR_CF_01}
                    onConfirm={() => {
                        setOpenDialog(false);
                        setInputAmount("0");
                        setCurrentStep(0);
                        navigate(`/exchange?tab=0`);
                    }}
                />
            ) : null}
        </div>
    )
}

export default Buy;
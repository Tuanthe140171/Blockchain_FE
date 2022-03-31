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
    // BIDV,
    // TECHCOMBANK
}

const ALL_SUPPORTED_METHODS = {
    // [SUPPORTED_METHODS.BIDV]: {
    //     label: "/icon/bidv.svg",
    //     title: "BIDV",
    //     account: "Mai Thi Chuyen",
    //     accountNumber: "42710000387624"
    // },
    [SUPPORTED_METHODS.MOMO]: {
        label: "/icon/momo.svg",
        title: "MOMO",
        account: "Mai Thi Chuyen",
        accountNumber: "42710000387624"
    }
    // [SUPPORTED_METHODS.TECHCOMBANK]: {
    //     label: "/icon/techcombank.svg",
    //     title: "TECHCOMBANK",
    //     account: "Mai Thi Chuyen",
    //     accountNumber: "42710000387624"
    // }
}

const Sell: React.FC = () => {
    const [paymentMethod, setPaymentMethod] = useState(SUPPORTED_METHODS.MOMO);
    const [paymentTxId, setPaymentTxId] = useState("");
    const [inputAmount, setInputAmount] = useState<string>("0");
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

    const BUY_STEPS = [
        {
            title: "Enter amount",
            description: "",
            component: <SelectBuyAmount
                isBuy={false}
                setCurrentStep={() => setCurrentStep(1)}
                onChange={input => setInputAmount(input)}
                inputAmount={inputAmount}
                setInputAmount={setInputAmount}
            />
        },
        {
            title: "Payment method",
            description: "",
            component: <PaymentMethod isBuy={false} account={data?.paymentName || ""} accountNumber={data?.paymentNumber || ""} chosenPaymentMethod={paymentMethod} supportedPaymentMethods={ALL_SUPPORTED_METHODS} setPaymentMethod={setPaymentMethod} setCurrentStep={() => {
                navigate('/exchange')
                setCurrentStep(0);
            }} />
        },
        {
            title: "Verification",
            description: "",
            component: <Verification paymentTxId={paymentTxId} setInputAmount={setInputAmount} setPaymentTxId={(text) => setPaymentTxId(text)} inputAmount={inputAmount} setCurrentStep={() => {
                navigate('/exchange?tab=3')
                setCurrentStep(3)
            }} />
        },
        {
            title: "Confirmation",
            description: ""
        }
    ]

    return (
        <div className="sell">
            <div className="sell__step">
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
            <TransactionDetails isBuy={false} account={data?.paymentNumber || ""} accountNumber={data?.paymentName || ""} loading={loading} inputAmount={inputAmount} chosenPaymentMethod={ALL_SUPPORTED_METHODS[paymentMethod]} />
            {openDialog ? (
                <AppDialog
                    type="infor"
                    title={"Bạn đã mua thành công thành công 100 coin từ nhà phát hành"}
                    description={Message.INFOR_DC_01}
                    confirmText={Message.INFOR_CF_01}
                    onConfirm={() => {
                        setOpenDialog(false);
                        setCurrentStep(0);
                    }}
                />
            ) : null}
        </div>
    )
}

export default Sell;
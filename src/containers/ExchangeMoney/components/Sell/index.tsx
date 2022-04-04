import React, { useEffect, useState } from 'react';
import SelectBuyAmount from '../SelectBuyAmount';
import PaymentMethod from '../PaymentMethod';
import TransactionDetails from '../TransactionDetails';
import SellVerification from '../SellVerification';
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

const Sell: React.FC = () => {
    const [paymentMethod, setPaymentMethod] = useState(SUPPORTED_METHODS.MOMO);
    const [paymentTxId, setPaymentTxId] = useState("");
    const [inputAmount, setInputAmount] = useState<string>("0");
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [openDialog, setOpenDialog] = useState(false);

    const { data, loading } = useFetch<{ paymentName: string, paymentNumber: string }>("payment/get-payment-information");

    useEffect(() => {
        if (currentStep === 3) {
            setOpenDialog(true);
        }
    }, [currentStep]);

    const BUY_STEPS = [
        {
            title: "Nhập số tiền",
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
            title: "Chọn phương thức",
            description: "",
            component: <PaymentMethod isBuy={false} account={data?.paymentName || ""} accountNumber={data?.paymentNumber || ""} chosenPaymentMethod={paymentMethod} supportedPaymentMethods={ALL_SUPPORTED_METHODS} setPaymentMethod={setPaymentMethod} setCurrentStep={() => {
                setCurrentStep(0);
            }} onNext={() => { setCurrentStep(2) }}/>
        },
        {
            title: "Xác minh",
            description: "",
            component: <SellVerification paymentTxId={paymentTxId} setInputAmount={setInputAmount} setPaymentTxId={(text: any) => setPaymentTxId(text)} inputAmount={inputAmount} setCurrentStep={() => {
                setCurrentStep(3)
            }} />
        },
        {
            title: "Xác nhận",
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
                    title={`Bạn đã bán thành công thành công ${inputAmount} coin từ nhà phát hành`}
                    description={Message.INFOR_DC_01}
                    confirmText={Message.INFOR_CF_01}
                    onConfirm={() => {
                        setOpenDialog(false);
                        setCurrentStep(0);
                        setInputAmount("0");
                    }}
                />
            ) : null}
        </div>
    )
}

export default Sell;
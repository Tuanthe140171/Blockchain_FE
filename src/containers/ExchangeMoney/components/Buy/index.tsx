import React, { useEffect, useState } from 'react';
import SelectBuyAmount from '../SelectBuyAmount';
import PaymentMethod from '../PaymentMethod';
import TransactionDetails from '../TransactionDetails';
import Verification from '../Verification';
import TimeLine from '../TimeLine';
import Message from "../../../../constants/message";
import AppDialog from '../../../../components/AppDialog';
import "./index.scss";

export enum SUPPORTED_METHODS {
    MOMO,
    BIDV,
    TECHCOMBANK
}

const ALL_SUPPORTED_METHODS = {
    [SUPPORTED_METHODS.BIDV]: {
        label: "/icon/bidv.svg",
        title: "BIDV",
        account: "Mai Thi Chuyen",
        accountNumber: "42710000387624"
    },
    [SUPPORTED_METHODS.MOMO]: {
        label: "/icon/momo.svg",
        title: "MOMO",
        account: "Mai Thi Chuyen",
        accountNumber: "42710000387624"
    },
    [SUPPORTED_METHODS.TECHCOMBANK]: {
        label: "/icon/techcombank.svg",
        title: "TECHCOMBANK",
        account: "Mai Thi Chuyen",
        accountNumber: "42710000387624"
    }
}

const Buy: React.FC = () => {
    const [paymentMethod, setPaymentMethod] = useState(SUPPORTED_METHODS.MOMO);
    const [inputAmount, setInputAmount] = useState<number>(0);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        if (currentStep === 3) {
            setOpenDialog(true);
        }
    }, [currentStep]);

    const BUY_STEPS = [
        {
            title: "Enter amount",
            description: "",
            component: (
                    <SelectBuyAmount
                    setCurrentStep={() => setCurrentStep(1)}
                    onChange={input => setInputAmount(input)}
                    inputAmount={inputAmount}
                />
            )
        },
        {
            title: "Payment method",
            description: "",
            // component: <PaymentMethod setCurrentStep={() => setCurrentStep(2)} />
        },
        {
            title: "Verification",
            description: "",
            component: <Verification setCurrentStep={() => setCurrentStep(3)} />
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
            <TransactionDetails inputAmount={inputAmount} />
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

export default Buy;
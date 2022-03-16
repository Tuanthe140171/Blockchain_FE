import React, { useEffect, useState } from 'react';
import SelectBuyAmount from '../SelectBuyAmount';
import PaymentMethod from '../PaymentMethod';
import TransactionDetails from '../TransactionDetails';
import Verification from '../Verification';
import TimeLine from '../TimeLine';
import Message from "../../../../constants/message";
import AppDialog from '../../../../components/AppDialog';
import "./index.scss";

const Sell: React.FC = () => {
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
            component: <SelectBuyAmount
                setCurrentStep={() => setCurrentStep(1)}
            />
        },
        {
            title: "Payment method",
            description: "",
            component: <PaymentMethod setCurrentStep={() => setCurrentStep(2)} />
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
            <TransactionDetails />
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
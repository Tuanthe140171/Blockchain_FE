import React, { useEffect, useState } from 'react';
import { Steps } from 'antd';
import "./index.scss";

const { Step } = Steps;

type TimeLineStepProps = {
    title: string,
    description: string,
    id: number
}

type TimeLineProps = {
    steps: TimeLineStepProps[],
    curStep: number,
    setCurStep: React.Dispatch<React.SetStateAction<number>>
}

const TimeLine: React.FC<TimeLineProps> = (props) => {
    const { steps, curStep, setCurStep } = props;
    const [currentStep, setCurrentStep] = useState<number>(0);

    const customDot = (dot: any) => {
        return (
            <div className="custom-dot">
            </div>
        )
    };

    useEffect(() => {
        setCurrentStep(curStep);
    }, [curStep]);

    return (
        <Steps progressDot={customDot} current={currentStep}>
            {
                steps.map(step => <Step onClick={() => {
                    // setCurStep(step.id);
                }} title={step.title} description={step.description} />)
            }
        </Steps>
    )
}

export default TimeLine;
import React from 'react';
import { Typography, Button, Input } from 'antd';
import "./index.scss";

type VerificationProps = {
    setCurrentStep: () => void,
}

const Verification: React.FC<VerificationProps> = (props) => {
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
            />
            <Button className="verification__btn" onClick={props.setCurrentStep}>Confirm</Button>
        </div>
    )
}

export default Verification;
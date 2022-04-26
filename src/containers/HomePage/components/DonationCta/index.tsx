import React, { useContext } from "react";
import { Typography, Image } from "antd";
import Button from "../../../../components/Button";

import useLocalStorage from "../../../../hooks/useLocalStorage";
import { AuthorizationContext } from "../../../../components/Web3ReactManager";
import { AuthorizeErrorType } from "../../../../hooks/useAuthorization";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const { Title } = Typography;

const DonationCta: React.FC = () => {
    const navigate = useNavigate();
    const { error: authorizeError } = useContext(AuthorizationContext);
    const [_, setSelectedKey] = useLocalStorage("activeTab", "Dashboard");

    return (
        <div className="donation-cta">
            <Title level={3} className="donation-cta__title">
                Hãy tham gia quyên góp cùng chúng tôi nhé
            </Title>
            <p className="donation-cta__desc">Trong số 3.000 gia đình mà chương trình Mỗi Ngày Một Quả Trứng (MNMQT)</p>
            <Button content="Ủng hộ" className="donation-cta__btn" padding="25px 100px" onClick={() => {
                if (authorizeError === AuthorizeErrorType.NONE) {
                    setSelectedKey("Donee");
                    navigate("/donee");
                }
            }} />
            <div className="donation-cta__img">
                <Image
                    src="/icon/hand_shake.svg"
                    preview={false}
                />
            </div>

        </div>
    )
}

export default DonationCta;
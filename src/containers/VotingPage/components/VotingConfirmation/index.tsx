import React from "react";
import { Drawer, Button, Image, Avatar } from 'antd';
import { LeftOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
import AppDrawer from "../../../../components/AppDrawer";
import VotingSituationView from "../VotingSituationView";
import "./index.scss";


type VotingConfirmationProps = {
    visible: boolean,
    onClose?: () => void,
    setConfirmationVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const VotingConfirmation: React.FC<VotingConfirmationProps> = (props) => {
    // const navigate = useNavigate();
    const { visible, onClose, setConfirmationVisible } = props;

    return (
        <AppDrawer className="voting-confirmation" isVisible={visible} closeModal={onClose} content={
            <>
                <header className="voting-confirmation__header">
                    <div className="voting-confirmation__back" onClick={() => setConfirmationVisible(false)}>
                        <LeftOutlined />
                        <span>Voting</span>
                    </div>
                    <Button className="voting-confirmation__btn-back">Confirm</Button>
                </header>
                <div className="profile-personal__header">
                    <p className="personal-header__title">Personal Information</p>
                </div>
                <div className="profile-personal-wrapper">
                    <div className="profile-personal__view">
                        <Avatar src="/icon/bad-lucker-4.svg" className="profile-personal__avatar" />
                        <Button className="profile-personal__btn-link">View Profile</Button>
                    </div>
                    <div className="profile-personal">
                        <ul className="profile-personal__details">
                            <li className="profile-personal__detail">
                                <div className="profile-personal__detail-label">
                                    <Image src="/icon/user-admin_3.svg" className="profile-personal__detail-icon" preview={false} />
                                    <span>Họ và Tên</span>
                                </div>
                                <span className="profile-personal__detail-content">Mai Thị Mây</span>
                            </li>
                            <li className="profile-personal__detail">
                                <div className="profile-personal__detail-label">
                                    <Image src="/icon/calendar.svg" className="profile-personal__detail-icon" preview={false} />
                                    <span>Ngày Sinh</span>
                                </div>
                                <span className="profile-personal__detail-content">5/ 10/ 2000</span>
                            </li>
                            <li className="profile-personal__detail">
                                <div className="profile-personal__detail-label">
                                    <Image src="/icon/location.svg" className="profile-personal__detail-icon" preview={false} />
                                    <span>Trú quán</span>
                                </div>
                                <span className="profile-personal__detail-content">Hà Nội, Việt Nam</span>
                            </li>
                            <li className="profile-personal__detail">
                                <div className="profile-personal__detail-label">
                                    <Image src="/icon/home_1.svg" className="profile-personal__detail-icon" preview={false} />
                                    <span>Nguyên quán</span>
                                </div>
                                <span className="profile-personal__detail-content">Hà Giang, Việt Nam</span>
                            </li>
                            <li className="profile-personal__detail">
                                <div className="profile-personal__detail-label">
                                    <Image src="/icon/id-management.svg" className="profile-personal__detail-icon" preview={false} />
                                    <span>Số CMND</span>
                                </div>
                                <span className="profile-personal__detail-content">0312 0908 1123</span>
                            </li>
                            <li className="profile-personal__detail">
                                <div className="profile-personal__detail-label">
                                    <Image src="/icon/id-management.svg" className="profile-personal__detail-icon" preview={false} />
                                    <span>Ngày cấp CMND</span>
                                </div>
                                <span className="profile-personal__detail-content">3/2/2019</span>
                            </li>
                            <li className="profile-personal__detail">
                                <div className="profile-personal__detail-label">
                                    <Image src="/icon/id-management.svg" className="profile-personal__detail-icon" preview={false} />
                                    <span>Nơi cấp CMND</span>
                                </div>
                                <span className="profile-personal__detail-content">Cục Cảnh Sát</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="profile-situation-verification">
                    <p className="profile-situation-verification__header">Situation (2)</p>
                    <div className="profile-situation-verification__content">
                        <VotingSituationView
                            title="Người nghèo"
                            verificationType="Giấy chứng nhận hộ nghèo"
                            images={["/icon/bad-lucker-2.svg", "/icon/bad-lucker-5.svg"]}
                        />
                        <VotingSituationView
                            title="Thương binh"
                            verificationType="Giấy chứng nhận thương binh"
                            images={["/icon/bad-lucker-2.svg", "/icon/bad-lucker-4.svg"]}
                        />
                    </div>
                </div>
            </>
        } />
    )
}

export default VotingConfirmation;
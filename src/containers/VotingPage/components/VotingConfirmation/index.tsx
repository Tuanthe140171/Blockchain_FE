import React, { useEffect, useState } from "react";
import { Button, Image, Avatar } from 'antd';
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import moment from 'moment';
// import { useNavigate } from "react-router-dom";
import AppDrawer from "../../../../components/AppDrawer";
import VotingSituationView from "../VotingSituationView";
import "./index.scss";

export type SelectedUser = {
    donee: string,
    dob: string,
    createDate: string,
    address: string,
    id: string,
    situations: any,
    situationsType: any,
    avatar: string | null,
    identityPlace: string,
    identityDate: string,
    status: string,
    userId: string
}

type VotingConfirmationProps = {
    visible: boolean,
    onClose?: () => void,
    setConfirmationVisible: React.Dispatch<React.SetStateAction<boolean>>
    selectedUser: SelectedUser | undefined
}

const VotingConfirmation: React.FC<VotingConfirmationProps> = (props) => {
    const { selectedUser, visible, onClose, setConfirmationVisible } = props;
    const [userSituations, setUserSituations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedUser) {
            const { situations, situationsType } = selectedUser;
            console.log(
                situations, 
                situationsType
            )

            const mappedSituationsType: any = {};

            situationsType.forEach((situationType: any) => {
                mappedSituationsType[situationType.situationId] = {
                    medias: situationType.BadLuckMedia
                }
            })

            setUserSituations(situations.map((situation: any) => {
                return {
                    ...situation,
                    ...mappedSituationsType[parseInt(situation.id)]
                }
            }));

        }
    }, [selectedUser]);
    
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
                        <Avatar src={selectedUser?.avatar} className="profile-personal__avatar" />
                        <Button className="profile-personal__btn-link" onClick={() => navigate(`/profile/${selectedUser?.userId}`)}>View Profile</Button>
                    </div>
                    <div className="profile-personal">
                        <ul className="profile-personal__details">
                            <li className="profile-personal__detail">
                                <div className="profile-personal__detail-label">
                                    <Image src="/icon/user-admin_3.svg" className="profile-personal__detail-icon" preview={false} />
                                    <span>Họ và Tên</span>
                                </div>
                                <span className="profile-personal__detail-content">{selectedUser?.donee}</span>
                            </li>
                            <li className="profile-personal__detail">
                                <div className="profile-personal__detail-label">
                                    <Image src="/icon/calendar.svg" className="profile-personal__detail-icon" preview={false} />
                                    <span>Ngày Sinh</span>
                                </div>
                                <span className="profile-personal__detail-content">{moment(selectedUser?.dob).format("DD-MM-yy")}</span>
                            </li>
                            <li className="profile-personal__detail">
                                <div className="profile-personal__detail-label">
                                    <Image src="/icon/location.svg" className="profile-personal__detail-icon" preview={false} />
                                    <span>Trú quán</span>
                                </div>
                                <span className="profile-personal__detail-content">{selectedUser?.address}</span>
                            </li>
                            <li className="profile-personal__detail">
                                <div className="profile-personal__detail-label">
                                    <Image src="/icon/home_1.svg" className="profile-personal__detail-icon" preview={false} />
                                    <span>Nguyên quán</span>
                                </div>
                                <span className="profile-personal__detail-content">{selectedUser?.address}</span>
                            </li>
                            <li className="profile-personal__detail">
                                <div className="profile-personal__detail-label">
                                    <Image src="/icon/id-management.svg" className="profile-personal__detail-icon" preview={false} />
                                    <span>Số CMND</span>
                                </div>
                                <span className="profile-personal__detail-content">{selectedUser?.id}</span>
                            </li>
                            <li className="profile-personal__detail">
                                <div className="profile-personal__detail-label">
                                    <Image src="/icon/id-management.svg" className="profile-personal__detail-icon" preview={false} />
                                    <span>Ngày cấp CMND</span>
                                </div>
                                <span className="profile-personal__detail-content">{moment(selectedUser?.identityDate).format("DD-MM-yy")}</span>
                            </li>
                            <li className="profile-personal__detail">
                                <div className="profile-personal__detail-label">
                                    <Image src="/icon/id-management.svg" className="profile-personal__detail-icon" preview={false} />
                                    <span>Nơi cấp CMND</span>
                                </div>
                                <span className="profile-personal__detail-content">{selectedUser?.identityPlace}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="profile-situation-verification">
                    <p className="profile-situation-verification__header">Situation ({userSituations.length})</p>
                    <div className="profile-situation-verification__content">
                        {
                            userSituations.map((userSituation: any) => (
                                <VotingSituationView
                                    title={userSituation.name}
                                    verificationType={`Giấy chứng nhận ${userSituation.message}`}
                                    images={userSituation.medias.map((media: any) => media.link)}
                                />
                            ))
                        }
                    </div>
                </div>
            </>
        } />
    )
}

export default VotingConfirmation;
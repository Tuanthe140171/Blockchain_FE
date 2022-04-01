import React, { useState } from 'react';
import { Typography } from "antd";

import Buy from './components/Buy';
import Sell from './components/Sell';
import OrderInput from './components/OrderInput';
import { useNavigate } from 'react-router-dom';
import "./index.scss";

enum TABS {
    SELL,
    BUY,
    ORDER_INPUT
};

const renderComponents = {
    [TABS.SELL]: <Sell />,
    [TABS.BUY]: <Buy />,
    [TABS.ORDER_INPUT]: <OrderInput />
}

const ExchangeMoney: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TABS>(TABS.BUY);
    const navigate = useNavigate();

    const renderTabComponents = () => {
        return renderComponents[activeTab];
    }

    return (
        <div className="exchange">
            <Typography.Title level={3} className="exchange__title">
                Exchange Money
            </Typography.Title>
            <div className="exchange__actions">
                <div className={`exchange__actions--buy ${activeTab === TABS.BUY ? 'exchange__actions--active': ''}`} onClick={() =>{
                     setActiveTab(TABS.BUY);
                     navigate('/exchange?type=buy&tab=0')
                }}>Buy</div>
                <div className={`exchange__actions--sell ${activeTab === TABS.SELL ? 'exchange__actions--active': ''}`} onClick={() => {
                    setActiveTab(TABS.SELL)
                    navigate('/exchange?type=sell&tab=0')
                }}>Sell</div>
                <div className={`exchange__actions--order-input ${activeTab === TABS.ORDER_INPUT ? 'exchange__actions--active': ''}`} onClick={() => {
                    setActiveTab(TABS.ORDER_INPUT)
                    navigate('/exchange?type=order&tab=0')
                }}>Order</div>
            </div>
            <div className="exchange__content">
                {renderTabComponents()}
            </div>
        </div>
    )
}

export default ExchangeMoney;
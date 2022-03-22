import React, { useState } from 'react';
import { Typography } from "antd";

import Buy from './components/Buy';
import Sell from './components/Sell';
import "./index.scss";

enum TABS {
    SELL,
    BUY
};

const renderComponents = {
    [TABS.SELL]: <Sell />,
    [TABS.BUY]: <Buy />
}

const ExchangeMoney: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TABS>(TABS.BUY);

    const renderTabComponents = () => {
        return renderComponents[activeTab];
    }

    return (
        <div className="exchange">
            <Typography.Title level={3} className="exchange__title">
                Exchange Money
            </Typography.Title>
            <div className="exchange__actions">
                <div className={`exchange__actions--buy ${activeTab === TABS.BUY ? 'exchange__actions--active': ''}`} onClick={() => setActiveTab(TABS.BUY)}>Buy</div>
                <div className={`exchange__actions--sell ${activeTab === TABS.SELL ? 'exchange__actions--active': ''}`} onClick={() => setActiveTab(TABS.SELL)}>Sell</div>
            </div>
            <div className="exchange__content">
                {renderTabComponents()}
            </div>
        </div>
    )
}

export default ExchangeMoney;
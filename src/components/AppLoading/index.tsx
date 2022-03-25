import React from 'react';
//@ts-ignore
import Lottie from 'react-lottie';
import * as animationData from '../../lottie/exchange.json'
import "./index.scss";

type AppLoadingProps = {
    loadingContent: React.ReactElement,
    showContent: boolean
}

const AppLoading: React.FC<AppLoadingProps> = (props) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="app-loading">
            <Lottie options={defaultOptions}
                height={450}
                width={450}
            />
            {
                props.showContent && (
                    <div className="app-loading__text">
                        {props.loadingContent}
                    </div>
                )
            }
        </div>
    )
}

export default AppLoading;
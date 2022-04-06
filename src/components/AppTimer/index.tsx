import React from 'react';
import { useCountdown } from '../../hooks/useCountDown';
import "./index.scss";

const AppTimer = ({ targetDate }: any) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return (
        <div className="expired-notice">
            <span>Qúa hạn!</span>
        </div>
    );
  } else {
    return (
       <div className="app-timer">
            <span className="app-timer__display">{days < 10 ?`0${days}`: days}</span>
            <span className="app-timer__divider">:</span>
            <span className="app-timer__display">{hours < 10 ?`0${hours}`: hours}</span>
            <span className="app-timer__divider">:</span>
            <span className="app-timer__display">{minutes < 10 ?`0${minutes}`: minutes}</span>
            <span className="app-timer__divider">:</span>
            <span className="app-timer__display">{seconds < 10 ?`0${seconds}`: seconds}</span>
       </div>
    );
  }
};

export default AppTimer;
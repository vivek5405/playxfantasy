import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ timestamp }) => {
  const getTimeRemaining = (targetTimestamp) => {
    const now = Math.floor(Date.now() / 1000);
    const timeDiff = targetTimestamp - now;

    const days = Math.floor(timeDiff / (24 * 60 * 60));
    const hours = Math.floor((timeDiff % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((timeDiff % 3600) / 60);
    const seconds = timeDiff % 60;

    return { days, hours, minutes, seconds };
  };

  const formatTimeUnit = (value) => (value < 10 ? `0${value}` : `${value}`);

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(timestamp));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(getTimeRemaining(timestamp));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timestamp]);

  const timeUnits = [];

  if (timeRemaining.days > 0) {
    timeUnits.push(`${timeRemaining.days} day${timeRemaining.days > 1 ? 's' : ''}`);
  } else if (timeRemaining.hours >= 1) {
    timeUnits.push(`${formatTimeUnit(timeRemaining.hours)}h`);
    timeUnits.push(`${formatTimeUnit(timeRemaining.minutes)}m`);
  } else {
    timeUnits.push(`${formatTimeUnit(timeRemaining.minutes)}m`);
    timeUnits.push(`${formatTimeUnit(timeRemaining.seconds)}s`);
  }

  return <>{timeUnits.join(' ')}</>;
};

export default CountdownTimer;

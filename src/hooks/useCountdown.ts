import { useEffect, useState } from 'react';

const useCountdown = ({
  targetDate,
  callback,
  triggerWhen = 0,
}: {
  targetDate: number;
  callback?: (time: number) => void;
  triggerWhen?: number;
}) => {
  const [isCalled, setIsCalled] = useState(false);

  const [countDown, setCountDown] = useState(targetDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(targetDate - new Date().getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (countDown <= triggerWhen && !isCalled) {
    setIsCalled(true);
    if (callback) {
      callback(countDown);
    }
  }

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };

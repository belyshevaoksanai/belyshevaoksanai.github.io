import { useEffect, useState } from 'react';

const useCountdown = (): [() => void, () => void, {minutes: number, seconds: number}]  => {
  const [countDown, setCountDown] = useState({
    minutes: 25,
    seconds: 0,
  });
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, []);

  const handleStartTimer = () => {
    const interval = setInterval(() => {
        setCountDown((prevState) => ({
          minutes: prevState.seconds === 0 ? prevState.minutes - 1 : prevState.minutes,
          seconds: prevState.seconds === 0 ? 59 : prevState.seconds - 1,
        }));
      }, 1000);
    setIntervalId(interval);
  }

  const handleStopTimer = () => {
    clearInterval(intervalId);
  }

  return [handleStartTimer, handleStopTimer, countDown];
};

export { useCountdown };

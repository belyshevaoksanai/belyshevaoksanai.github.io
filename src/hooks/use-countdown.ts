import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { timerAction } from '../store/timer/timer';
import { TimerStatusEnum } from '../constants/timer-status';
import { useSelector } from 'react-redux';
import { selectorFirstTask, selectorTimerStatus } from '../store/timer/selector';

const useCountdown = (): [() => void, () => void, () => void] => {
  const dispatch = useDispatch();
  
  const task = useSelector(selectorFirstTask);
  const status = useSelector(selectorTimerStatus);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  
  useEffect(() => {
    if (status === TimerStatusEnum.INIT || status === TimerStatusEnum.PAUSE) {
      clearInterval(intervalId);
    }
  }, [status]);

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const handleStartTimer = () => {
    dispatch(timerAction.setStatus(TimerStatusEnum.IN_PROGRESS));
    dispatch(timerAction.startTimer(task));
    const interval = setInterval(() => {
      dispatch(timerAction.substractSecond());
    }, 1000);
    setIntervalId(interval);
  }

  const handleStopTimer = () => {
    dispatch(timerAction.clearTimer());
    clearInterval(intervalId);
  }

  const handlePauseTimer = () => {
    dispatch(timerAction.setPauseTimer());
    clearInterval(intervalId);
    const interval = setInterval(() => {
      dispatch(timerAction.addSecond());
    }, 1000);
    setIntervalId(interval);
  }

  return [handleStartTimer, handleStopTimer, handlePauseTimer];
};

export { useCountdown };

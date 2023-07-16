import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { timerAction } from '../store/timer/timer';
import { TimerStatusEnum } from '../constants/timer-status';
import { useSelector } from 'react-redux';
import { selectorFirstTask, selectorTimerStatus } from '../store/timer/selector';

const useCountdown = (): [() => void, () => void, () => void, () => void] => {
  const dispatch = useDispatch();

  const status = useSelector(selectorTimerStatus);
  const task = useSelector(selectorFirstTask);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  
  useEffect(() => {
    if (status === TimerStatusEnum.INIT || status === TimerStatusEnum.PAUSE) {
      clearInterval(intervalId);
    }
  // eslint-disable-next-line
  }, [status]);

  useEffect(() => {
    if (task?.type === 'PAUSE') {
      handleStartTimer();
    }
  }, [task?.type]);

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const handleStartTimer = () => {
    dispatch(timerAction.startTimer());
    const interval = setInterval(() => {
      dispatch(timerAction.substractSecond());
    }, 1000);
    setIntervalId(interval);
  }

  const handleStopTimer = () => {
    if (task.type === 'USER') {
      dispatch(timerAction.clearTimer());
    } else {
      dispatch(timerAction.stopTimer());
    }
    clearInterval(intervalId);
  }

  const handleSkipPause = () => {
    dispatch(timerAction.skipPause());
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

  return [handleStartTimer, handleStopTimer, handlePauseTimer, handleSkipPause];
};

export { useCountdown };

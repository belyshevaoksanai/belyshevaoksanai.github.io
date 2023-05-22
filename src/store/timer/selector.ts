import { TimerStatusEnum } from "../../constants/timer-status";
import { RootState } from "../store";

export const selectorTaskTimer = (state: RootState) => state.timer.status === TimerStatusEnum.PAUSE_TASK
    ? state.timer.pauseTimer
    : state.timer.taskTimer;
export const selectorTimerStatus = (state: RootState) => state.timer.status;
export const selectorPlaySound = (state: RootState) => state.timer.playSound;

export const selectorTaskName = (state: RootState) => state.timer.taskName;
export const selectorErrorMessage = (state: RootState) => state.timer.errorMessage;
export const selectorTaskList = (state: RootState) => state.timer.list;
export const selectorFirstTask = (state: RootState) => state.timer.pauseTask || state.timer.list?.[0];
export const selectorSumOfTime = (state: RootState) => state.timer.sumOfTime;
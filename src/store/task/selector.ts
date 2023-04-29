import { RootState } from "../store";

export const selectorTaskName = (state: RootState) => state.task.taskName;
export const selectorErrorMessage = (state: RootState) => state.task.errorMessage;
export const selectorTaskList = (state: RootState) => state.task.list;
export const selectorFirstTask = (state: RootState) => state.task.list?.[0];
export const selectorSumOfTime = (state: RootState) => state.task.sumOfTime;
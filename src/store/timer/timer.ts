import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TimerStatusEnum } from "../../constants/timer-status";
import { PAUSE_MINUTES, TIMER_MINUTES } from "../../constants/timer";

interface ITaskItem {
    name: string;
    count: number;
    id: string;
}

export interface IPauseTask {
    type: 'PAUSE';
}

export interface IUserTask extends ITaskItem {
    type: 'USER';
}

interface ITimer {
    taskTimer: {
        minutes: number;
        seconds: number;
    },
    pauseTimer: {
        minutes: number;
        seconds: number;
    },
    status: TimerStatusEnum;

    taskName: string;
    list: IUserTask[];
    sumOfTime: number;
    errorMessage: string;
    pauseTask: IPauseTask | null;
    playSound: boolean;
}

const INITIAL_STATE: ITimer = {
    taskTimer: {
        minutes: TIMER_MINUTES,
        seconds: 0,
    },
    pauseTimer: {
        minutes: 0,
        seconds: 0,
    },
    status: TimerStatusEnum.INIT,

    taskName: '',
    list: [] as IUserTask[],
    sumOfTime: 0,
    errorMessage: '',
    pauseTask: null,
    playSound: false,
}

export const timerSlice = createSlice({
    name: 'timer',
    initialState: INITIAL_STATE,
    reducers: {
        substractSecond: (state) => {
            if (state.taskTimer.minutes || state.taskTimer.seconds) {
                state.taskTimer.minutes = state.taskTimer.seconds === 0
                    ? state.taskTimer.minutes - 1
                    : state.taskTimer.minutes;
                state.taskTimer.seconds = state.taskTimer.seconds === 0
                    ? 59
                    : state.taskTimer.seconds - 1;
            }
            if ((state.status === TimerStatusEnum.IN_PROGRESS
                || state.status === TimerStatusEnum.PAUSE)
                && state.taskTimer.minutes === 0
                && state.taskTimer.seconds === 0
            ) {
                state.playSound = true;
                if (state.pauseTask) {
                    state.pauseTask = null;
                    state.taskTimer = {
                        minutes: TIMER_MINUTES,
                        seconds: 0,
                    }
                    state.status = TimerStatusEnum.INIT;
                } else {
                    if (state.list[0].count > 1) {
                        state.list[0].count--;
                        if (state.list[0].type === 'USER') {
                            state.pauseTask = {
                                type: 'PAUSE'
                            };
                        }
                    } else {
                        state.list = state.list.slice(1);
                        state.pauseTask = {
                            type: 'PAUSE'
                        };
                    }
                    state.taskTimer = {
                        minutes: PAUSE_MINUTES,
                        seconds: 0,
                    }
                    state.status = TimerStatusEnum.PAUSE;
                }
            }
        },
        addSecond: (state) => {
            state.pauseTimer.minutes = state.pauseTimer.seconds === 59
                ? state.pauseTimer.minutes + 1
                : state.pauseTimer.minutes;
            state.pauseTimer.seconds = state.pauseTimer.seconds === 59
                ? 0
                : state.pauseTimer.seconds + 1;
        },
        resetPlaySound: (state) => {
            state.playSound = false;
        },
        clearTimer: (state) => {
            state.taskTimer = {
                minutes: TIMER_MINUTES,
                seconds: 0,
            }
            state.pauseTimer = {
                minutes: 0,
                seconds: 0,
            }
            state.status = TimerStatusEnum.INIT;
        },
        setPauseTimer: (state) => {
            state.status = TimerStatusEnum.PAUSE_TASK;
            state.pauseTimer = {
                minutes: 0,
                seconds: 0,
            }
        },
        setStatus: (state, { payload }: PayloadAction<TimerStatusEnum>) => {
            state.status = payload;
        },
        startTimer: (state, { payload }: PayloadAction<IUserTask | IPauseTask>) => {
            state.status = TimerStatusEnum.IN_PROGRESS;
        },
        changeTaskName: (state, { payload }: PayloadAction<string>) => {
            state.taskName = payload;
            if (state.errorMessage && payload.length >= 3) {
                state.errorMessage = '';
            }
        },
        addTask: (state) => {
            if (state.taskName.length < 3) {
                state.errorMessage = 'Минимум 3 символа'
            } else {
                const task: IUserTask = {
                    name: state.taskName,
                    count: 1,
                    id: crypto.randomUUID(),
                    type: 'USER',
                };
                state.list = state.list.concat(task);
                state.sumOfTime = state.list.reduce((res, cur) => res + cur.count * TIMER_MINUTES, 0);
                state.taskName = '';
            }
        },
        reorder: (state, { payload: { startIndex, endIndex } }: PayloadAction<{ startIndex: number, endIndex: number }>) => {
            const [removed] = state.list.splice(startIndex, 1);
            state.list.splice(endIndex, 0, removed);
        },
        onAddPomodoro: (state, { payload }: PayloadAction<string>) => {
            const task = state.list.find((item) => item.id === payload);
            if (task) {
                task.count++;
            }
            state.sumOfTime += TIMER_MINUTES;
        },
        onDeletePomodoro: (state, { payload }: PayloadAction<string>) => {
            const task = state.list.find((item) => item.id === payload);
            if (task) {
                task.count--;
            }
            state.sumOfTime -= TIMER_MINUTES;
        },
        editTaskName: (state, { payload }: PayloadAction<{ id: string, taskName: string }>) => {
            const task = state.list.find((item) => item.id === payload.id);
            if (task) {
                task.name = payload.taskName;
            }
        },
        onDeleteTask: (state, { payload }: PayloadAction<string>) => {
            state.list = state.list.filter((item) => item.id !== payload);
            state.sumOfTime = state.list.reduce((res, cur) => res + cur.count * TIMER_MINUTES, 0);
        },
    }
})

export const timerAction = timerSlice.actions;
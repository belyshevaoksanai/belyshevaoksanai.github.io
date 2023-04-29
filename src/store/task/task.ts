import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ITaskItem {
    name: string;
    count: number;
    id: string;
}

const INITIAL_STATE = {
    taskName: '',
    list: [] as ITaskItem[],
    sumOfTime: 0,
    errorMessage: '',
}

export const taskSlice = createSlice({
    name: 'task',
    initialState: INITIAL_STATE,
    reducers: {
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
                state.list = state.list.concat({
                    name: state.taskName,
                    count: 1,
                    id: crypto.randomUUID(),
                });
                state.sumOfTime = state.list.reduce((res, cur) => res + cur.count * 25, 0);
                state.taskName = '';
            }
        },
        reorder: (state, {payload: {startIndex, endIndex}}: PayloadAction<{startIndex: number, endIndex: number}>) => {
            const [removed] = state.list.splice(startIndex, 1);
            state.list.splice(endIndex, 0, removed);
        },
        onAddPomodoro: (state, { payload }: PayloadAction<string>) => {
            const task = state.list.find((item) => item.id === payload);
            if (task) {
                task.count++;
            }
            state.sumOfTime += 25;
        },
        onDeletePomodoro: (state, { payload }: PayloadAction<string>) => {
            const task = state.list.find((item) => item.id === payload);
            if (task) {
                task.count--;
            }
            state.sumOfTime -= 25;
        },
        editTaskName: (state, { payload }: PayloadAction<{ id: string, taskName: string }>) => {
            const task = state.list.find((item) => item.id === payload.id);
            if (task) {
                task.name = payload.taskName;
            }
        },
        onDeleteTask: (state, { payload }: PayloadAction<string>) => {
            state.list = state.list.filter((item) => item.id !== payload);
            state.sumOfTime = state.list.reduce((res, cur) => res + cur.count * 25, 0);
        }
    }
})

export const taskAction = taskSlice.actions;
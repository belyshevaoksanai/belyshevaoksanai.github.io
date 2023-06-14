import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getDate } from "../../utils/get-date";

interface IStatistic {
    selectedDay: string;
}

const INITIAL_STATE: IStatistic = {
    selectedDay: getDate(),
}

export const statisticSlice = createSlice({
    name: 'statistic',
    initialState: INITIAL_STATE,
    reducers: {
        setSelectedDay: (state, { payload }: PayloadAction<string>) => {
            state.selectedDay = payload;
        },
    }
})

export const statisticAction = statisticSlice.actions;
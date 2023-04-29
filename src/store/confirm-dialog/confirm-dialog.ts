import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    message: '',
    onConfirm: () => {},
}

export const confirmDialogSlice = createSlice({
    name: 'confirmDialog',
    initialState: INITIAL_STATE,
    reducers: {
        setMessage: (state, { payload }: PayloadAction<{message: string, onConfirm: () => void}>) => {
            state.message = payload.message;
            state.onConfirm = payload.onConfirm;
        },
        clear: () => INITIAL_STATE,
    }
})

export const confirmDialogAction = confirmDialogSlice.actions;
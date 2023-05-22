import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { confirmDialogSlice } from './confirm-dialog/confirm-dialog';
import { timerSlice } from './timer/timer';

export const store = configureStore({
  reducer: {
    timer: timerSlice.reducer,
    confirmDialog: confirmDialogSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredPaths: ["confirmDialog.onConfirm"],
      ignoredActions: ["confirmDialog/setMessage"],
    },
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { confirmDialogSlice } from './confirm-dialog/confirm-dialog';
import { timerSlice } from './timer/timer';
import { statisticSlice } from './statistic/statistic';

const timerHistoryMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  if ( ['timer/resetPlaySound', 'timer/startTimer'].includes(action.type)) {
    const timerState = store.getState().timer.history;
    localStorage.setItem('history', JSON.stringify(timerState))
  }
  return result;
};

export const store = configureStore({
  reducer: {
    timer: timerSlice.reducer,
    confirmDialog: confirmDialogSlice.reducer,
    statistic: statisticSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredPaths: ["confirmDialog.onConfirm"],
      ignoredActions: ["confirmDialog/setMessage"],
    },
  }).concat(timerHistoryMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

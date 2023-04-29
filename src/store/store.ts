import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { taskSlice } from './task/task';
import { confirmDialogSlice } from './confirm-dialog/confirm-dialog';

export const store = configureStore({
  reducer: {
    task: taskSlice.reducer,
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

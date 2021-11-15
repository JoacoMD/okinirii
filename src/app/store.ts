import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import animeReducer from './animeSlice';

export const store = configureStore({
  reducer: {
    animes: animeReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

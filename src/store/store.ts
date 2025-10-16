import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/auth.slice';
import storeReducer from './features/store.slice';

export const store = configureStore({
  reducer: {
    auth : userReducer,
    store: storeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
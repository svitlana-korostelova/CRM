/**
 * Redux Store Configuration
 * 
 * Sets up Redux Toolkit store with RTK Query API
 */

import {configureStore} from '@reduxjs/toolkit';
import {api} from './api/api';
import appReducer from './slices/appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

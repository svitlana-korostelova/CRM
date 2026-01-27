/**
 * App State Slice
 * 
 * Example Redux slice for testing state management
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AppState {
  counter: number;
  message: string;
  lastUpdated: number | null;
}

const initialState: AppState = {
  counter: 0,
  message: 'Welcome to CRM!',
  lastUpdated: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    increment: state => {
      state.counter += 1;
      state.lastUpdated = Date.now();
    },
    decrement: state => {
      state.counter -= 1;
      state.lastUpdated = Date.now();
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.lastUpdated = Date.now();
    },
    reset: state => {
      state.counter = 0;
      state.message = 'Welcome to CRM!';
      state.lastUpdated = Date.now();
    },
  },
});

export const {increment, decrement, setMessage, reset} = appSlice.actions;
export default appSlice.reducer;

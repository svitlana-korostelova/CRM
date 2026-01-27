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
      console.log('appSlice: increment action dispatched, current counter:', state.counter);
      state.counter += 1;
      state.lastUpdated = Date.now();
      console.log('appSlice: counter after increment:', state.counter);
    },
    decrement: state => {
      console.log('appSlice: decrement action dispatched, current counter:', state.counter);
      state.counter -= 1;
      state.lastUpdated = Date.now();
      console.log('appSlice: counter after decrement:', state.counter);
    },
    setMessage: (state, action: PayloadAction<string>) => {
      console.log('appSlice: setMessage action dispatched, new message:', action.payload);
      state.message = action.payload;
      state.lastUpdated = Date.now();
      console.log('appSlice: message updated to:', state.message);
    },
    reset: state => {
      console.log('appSlice: reset action dispatched');
      state.counter = 0;
      state.message = 'Welcome to CRM!';
      state.lastUpdated = Date.now();
      console.log('appSlice: state reset to initial values');
    },
  },
});

export const {increment, decrement, setMessage, reset} = appSlice.actions;
export default appSlice.reducer;

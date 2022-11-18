import { createSlice } from "@reduxjs/toolkit";
import { TimerReducerState } from "../../interfaces/timer-store/timer-reducer-state-interface";

const initialState: TimerReducerState = {
  autoStart: false,
  isPaused: false,
  isStarted: false,
  isCompleted: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setAutoStart(state, action) {
      state.autoStart = action.payload;
    },
    setIsPaused(state, action) {
      state.isPaused = action.payload;
    },
    setIsStarted(state, action) {
      state.isStarted = action.payload;
    },
    setIsCompleted(state, action) {
      state.isCompleted = action.payload;
    },
  },
});

export const timerSliceName = timerSlice.name;
export const timerActions = timerSlice.actions;
export const timerReducer = timerSlice.reducer;

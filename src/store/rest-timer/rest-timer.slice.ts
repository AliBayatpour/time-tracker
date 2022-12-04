import { createSlice } from "@reduxjs/toolkit";
import { RestTimerReducerState } from "../../interfaces/rest-timer-store/rest-timer-reducer-state-interface";

const initialState: RestTimerReducerState = {
  restTime: 5,
};

const restTimerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setRestTime(state, action) {
      state.restTime = action.payload;
    },
  },
});

export const restTimerSliceName = restTimerSlice.name;
export const restTimerActions = restTimerSlice.actions;
export const restTimerReducer = restTimerSlice.reducer;

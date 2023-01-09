import { createSelector } from "reselect";
import { RootState } from "../../interfaces/rootState.interface";

const selectRestTimerReducer = (state: RootState) => state.restTimer;

export const selectRestTime = createSelector(
  [selectRestTimerReducer],
  (timerState) => timerState.restTime
);

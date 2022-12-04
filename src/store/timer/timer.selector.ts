import { createSelector } from "reselect";
import { RootState } from "../../interfaces/root-state-interface";

const selectTimerReducer = (state: RootState) => state.timer;

export const selectAutoStart = createSelector(
  [selectTimerReducer],
  (timerState) => timerState.autoStart
);

export const selectIsStarted = createSelector(
  [selectTimerReducer],
  (timerState) => timerState.isStarted
);

export const selectIsPaused = createSelector(
  [selectTimerReducer],
  (timerState) => timerState.isPaused
);

export const selectIsCompleted = createSelector(
  [selectTimerReducer],
  (timerState) => timerState.isCompleted
);

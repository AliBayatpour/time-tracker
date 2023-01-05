import { createSelector } from "reselect";
import { RootState } from "../../interfaces/root-state-interface";

const selectSettingsReducer = (state: RootState) => state.settings;

export const selectTheme = createSelector(
  [selectSettingsReducer],
  (settings) => settings.theme
);

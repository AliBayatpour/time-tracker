import { createSlice } from "@reduxjs/toolkit";
import { THEME_DATA, THEME_KEYS } from "../../constants/themeNames.constant";
import { SettingsReducerState } from "../../interfaces/settings-store/settings-reducer-state-interface";

const initialState: SettingsReducerState = {
  theme:
    (localStorage.getItem("theme") as THEME_KEYS) ||
    (THEME_DATA.POWER_RANGERS.key as THEME_KEYS),
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const settingsSliceName = settingsSlice.name;
export const settingsActions = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
export const settingsCaseReducers = settingsSlice.caseReducers;

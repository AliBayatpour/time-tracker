import { createSelector } from "reselect";
import { RootState } from "../../interfaces/root-state-interface";

const selectAuthReducer = (state: RootState) => state.auth;

export const selectIsLoggedIn = createSelector(
  [selectAuthReducer],
  (auth) => auth.isLoggedIn
);

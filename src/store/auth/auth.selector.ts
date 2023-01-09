import { createSelector } from "reselect";
import { RootState } from "../../interfaces/rootState.interface";

const selectAuthReducer = (state: RootState) => state.auth;

export const selectIsLoggedIn = createSelector(
  [selectAuthReducer],
  (auth) => auth.isLoggedIn
);

export type AuthReducerState = {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: null | Error["message"];
};

import {
  all,
  call,
  CallEffect,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import { authActions, authCaseReducers, authSliceName } from "./auth.slice";
import type { Action } from "@reduxjs/toolkit";
import { LoginReq } from "../../interfaces/login-req-interface";
import { UserRes } from "../../interfaces/user-res-interface";
import { loginAsyncReq, signupAsyncReq } from "../../utils/auth-utils";
import { SignupReq } from "../../interfaces/signup-req-interface";

export function* signupAsync(props: {
  type: Action;
  payload: SignupReq;
}): Generator<CallEffect<UserRes | null> | PutEffect<Action>, void, UserRes> {
  try {
    const response = yield call(signupAsyncReq, props.payload);
    if (response) {
      yield put(authActions.signupSuccess(response));
    } else {
      yield put(authActions.signupFailed("Login Failed"));
    }
  } catch (err) {
    yield put(authActions.signupFailed("Login Failed"));
  }
}

export function* onSignup() {
  yield takeLatest(
    `${authSliceName}/${authCaseReducers.signupStart.name}`,
    signupAsync
  );
}

export function* loginAsync(props: {
  type: Action;
  payload: LoginReq;
}): Generator<CallEffect<UserRes | null> | PutEffect<Action>, void, UserRes> {
  try {
    const response = yield call(loginAsyncReq, props.payload);
    if (response) {
      yield put(authActions.loginSuccess());
    } else {
      yield put(authActions.loginFailed("Login Failed"));
    }
  } catch (err) {
    yield put(authActions.loginFailed("Login Failed"));
  }
}

export function* onLogin() {
  yield takeLatest(
    `${authSliceName}/${authCaseReducers.loginStart.name}`,
    loginAsync
  );
}
export function* authSaga() {
  yield all([call(onLogin), call(onSignup)]);
}

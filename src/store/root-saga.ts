import { call, all } from "redux-saga/effects";
import { authSaga } from "./auth/auth.saga";
import { itemsSaga } from "./item/item.saga";

export function* rootSaga() {
  yield all([call(itemsSaga), call(authSaga)]);
}

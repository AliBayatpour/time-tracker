import { call, all } from "redux-saga/effects";
import { itemsSaga } from "./item/item.saga";

export function* rootSaga() {
  yield all([call(itemsSaga)]);
}

import {
  takeLatest,
  all,
  call,
  put,
  CallEffect,
  PutEffect,
} from "redux-saga/effects";
import { Item } from "../../interfaces/item-interface";

import { itemActions, itemCaseReducers, itemSliceName } from "./item.slice";
import type { Action } from "@reduxjs/toolkit";
import {
  addItemAsyncReq,
  deleteItemAsyncReq,
  getItemsAsyncReq,
  getLastNDaysItemsAsyncReq,
  updateItemAsyncReq,
} from "../utils/item-req-utils";

// GET ITEMS
export function* fetchItemsAsync(): Generator<
  CallEffect<Item[]> | PutEffect<Action>,
  void,
  Item[] | []
> {
  try {
    const response = yield call(getItemsAsyncReq);
    yield put(itemActions.fetchItemsSuccess(response));
  } catch (err) {
    yield put(itemActions.fetchItemsFailed("fetching items failed"));
  }
}

export function* onFetchItems() {
  yield takeLatest(
    `${itemSliceName}/${itemCaseReducers.fetchItemsStart.name}`,
    fetchItemsAsync
  );
}

// ADD ITEMS
export function* addItemsAsync(props: {
  type: Action;
  payload: Item;
}): Generator<CallEffect<Response> | PutEffect<Action>, any, Response> {
  try {
    const response = yield call(addItemAsyncReq, props.payload);
    if (response.ok) {
      yield put(itemActions.addItemSuccess());
      yield put(itemActions.fetchItemsStart());
    } else {
      yield put(itemActions.addItemFailed("add item failed"));
    }
  } catch (err) {
    yield put(itemActions.addItemFailed("add item failed"));
  }
}

export function* onAddItem() {
  yield takeLatest(
    `${itemSliceName}/${itemCaseReducers.addItemStart.name}`,
    addItemsAsync
  );
}

// UPDATE ITEMS
export function* updateItemsAsync(props: {
  type: Action;
  payload: Item;
}): Generator<CallEffect<Response> | PutEffect<Action>, any, Response> {
  try {
    const response = yield call(updateItemAsyncReq, props.payload);
    if (response.ok) {
      yield put(itemActions.updateItemSuccess());
      yield put(itemActions.fetchItemsStart());
    } else {
      yield put(itemActions.updateItemFailed("updating item failed"));
    }
  } catch (err) {
    yield put(itemActions.updateItemFailed("updating item failed"));
  }
}

export function* onUpdateItem() {
  yield takeLatest(
    `${itemSliceName}/${itemCaseReducers.updateItemStart.name}`,
    updateItemsAsync
  );
}

// DELETE ITEMS
export function* deleteItemsAsync(props: {
  type: Action;
  payload: Item;
}): Generator<CallEffect<Response> | PutEffect<Action>, any, Response> {
  try {
    const response = yield call(deleteItemAsyncReq, props.payload);
    if (response.ok) {
      yield put(itemActions.updateItemSuccess());
      yield put(itemActions.fetchItemsStart());
    } else {
      yield put(itemActions.updateItemFailed("delete item failed"));
    }
  } catch (err) {
    yield put(itemActions.updateItemFailed("delete item failed"));
  }
}

export function* onDeleteItem() {
  yield takeLatest(
    `${itemSliceName}/${itemCaseReducers.deleteItemStart.name}`,
    deleteItemsAsync
  );
}

// GET LAST N ITEMS
export function* fetchLastNDaysItemsAsync(props: {
  type: Action;
  payload: number;
}): Generator<CallEffect<Item[]> | PutEffect<Action>, void, Item[] | []> {
  try {
    const response = yield call(getLastNDaysItemsAsyncReq, props.payload);
    yield put(itemActions.fetchLastNDaysSuccess(response));
  } catch (err) {
    yield put(itemActions.fetchLastNDaysFailed("unexpected error happened"));
  }
}
export function* onFetchLastNDaysItems() {
  yield takeLatest(
    `${itemSliceName}/${itemCaseReducers.fetchLastNDaysStart.name}`,
    fetchLastNDaysItemsAsync
  );
}

export function* itemsSaga() {
  yield all([
    call(onFetchItems),
    call(onUpdateItem),
    call(onAddItem),
    call(onDeleteItem),
    call(onFetchLastNDaysItems),
  ]);
}

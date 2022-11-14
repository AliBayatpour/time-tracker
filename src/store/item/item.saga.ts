import { ActionType } from "@redux-saga/types";
import {
  takeLatest,
  all,
  call,
  put,
  CallEffect,
  PutEffect,
} from "redux-saga/effects";
import { ItemInterface } from "../../interfaces/item-interface";
import {
  addItemAsyncReq,
  deleteItemAsyncReq,
  getItemsAsyncReq,
  getLastNDaysItemsAsyncReq,
  updateItemAsyncReq,
} from "../../utils/items-utils";
import { itemActions, itemCaseReducers, itemSliceName } from "./item.slice";
import type { Action } from '@reduxjs/toolkit'


// GET ITEMS
export function* fetchItemsAsync(): Generator<
  CallEffect<ItemInterface[]> | PutEffect<Action>,
  void,
  ItemInterface[] | []
> {
  try {
    const response = yield call(getItemsAsyncReq);
    yield put(itemActions.fetchItemsSuccess(response));
  } catch (err) {
    if (err instanceof Error) {
      yield put(itemActions.fetchItemsFailed(err.message));
    } else {
      yield put(itemActions.fetchItemsFailed("unexpected error happened"));
    }
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
  type: ActionType;
  payload: ItemInterface;
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
    if (err instanceof Error) {
      yield put(itemActions.fetchItemsFailed(err.message));
    } else {
      yield put(itemActions.fetchItemsFailed("unexpected error happened"));
    }
  }
}

export function* onAddItem() {
  yield takeLatest(`${itemSliceName}/${itemCaseReducers.addItemStart.name}`, addItemsAsync);
}

// UPDATE ITEMS
export function* updateItemsAsync(props: {
  type: ActionType;
  payload: ItemInterface;
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
    if (err instanceof Error) {
      yield put(itemActions.fetchItemsFailed(err.message));
    } else {
      yield put(itemActions.fetchItemsFailed("unexpected error happened"));
    }
  }
}

export function* onUpdateItem() {
  yield takeLatest(`${itemSliceName}/${itemCaseReducers.updateItemStart.name}`, updateItemsAsync);
}

// DELETE ITEMS
export function* deleteItemsAsync(props: {
  type: ActionType;
  payload: ItemInterface;
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
    if (err instanceof Error) {
      yield put(itemActions.fetchItemsFailed(err.message));
    } else {
      yield put(itemActions.fetchItemsFailed("unexpected error happened"));
    }
  }
}

export function* onDeleteItem() {
  yield takeLatest(`${itemSliceName}/${itemCaseReducers.deleteItemStart.name}`, deleteItemsAsync);
}

// GET LAST N ITEMS
export function* fetchLastNDaysItemsAsync(props: {
  type: ActionType;
  payload: number;
}): Generator<
  CallEffect<ItemInterface[]> | PutEffect<Action>,
  void,
  ItemInterface[] | []
> {
  try {
    const response = yield call(getLastNDaysItemsAsyncReq, props.payload);
    const successPayload = { nDays: props.payload, lastNDaysItems: response };
    yield put(itemActions.fetchLastNDaysSuccess(successPayload));
  } catch (err) {
    if (err instanceof Error) {
      yield put(itemActions.fetchLastNDaysFailed(err.message));
    } else {
      yield put(itemActions.fetchLastNDaysFailed("unexpected error happened"));
    }
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

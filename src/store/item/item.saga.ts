import { AnyAction } from "redux";
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
import {
  addItemFailure,
  addItemSuccess,
  fetchItemsFailure,
  fetchItemsStart,
  fetchItemsSuccess,
  fetchLastNDaysItemsFailure,
  fetchLastNDaysItemsSuccess,
  updateItemFailure,
  updateItemSuccess,
} from "./item.action";
import { ITEM_ACTION_TYPES } from "./item.types";

// GET ITEMS
export function* fetchItemsAsync(): Generator<
  CallEffect<ItemInterface[]> | PutEffect<AnyAction>,
  void,
  ItemInterface[] | []
> {
  try {
    const response = yield call(getItemsAsyncReq);
    yield put(fetchItemsSuccess(response));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchItemsFailure(err.message));
    } else {
      yield put(fetchItemsFailure("unexpected error happened"));
    }
  }
}

export function* onFetchItems() {
  yield takeLatest(ITEM_ACTION_TYPES.FETCH_ITEMS_START, fetchItemsAsync);
}

// ADD ITEMS
export function* addItemsAsync(props: {
  type: ITEM_ACTION_TYPES;
  payload: ItemInterface;
}): Generator<CallEffect<Response> | PutEffect<AnyAction>, any, Response> {
  try {
    const response = yield call(addItemAsyncReq, props.payload);
    if (response.ok) {
      yield put(addItemSuccess());
      yield put(fetchItemsStart());
    } else {
      yield put(addItemFailure("add item failed"));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchItemsFailure(err.message));
    } else {
      yield put(fetchItemsFailure("unexpected error happened"));
    }
  }
}

export function* onAddItem() {
  yield takeLatest(ITEM_ACTION_TYPES.ADD_ITEM_START, addItemsAsync);
}

// UPDATE ITEMS
export function* updateItemsAsync(props: {
  type: ITEM_ACTION_TYPES;
  payload: ItemInterface;
}): Generator<CallEffect<Response> | PutEffect<AnyAction>, any, Response> {
  try {
    const response = yield call(updateItemAsyncReq, props.payload);
    if (response.ok) {
      yield put(updateItemSuccess());
      yield put(fetchItemsStart());
    } else {
      yield put(updateItemFailure("updating item failed"));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchItemsFailure(err.message));
    } else {
      yield put(fetchItemsFailure("unexpected error happened"));
    }
  }
}

export function* onUpdateItem() {
  yield takeLatest(ITEM_ACTION_TYPES.UPDATE_ITEM_START, updateItemsAsync);
}

// DELETE ITEMS
export function* deleteItemsAsync(props: {
  type: ITEM_ACTION_TYPES;
  payload: ItemInterface;
}): Generator<CallEffect<Response> | PutEffect<AnyAction>, any, Response> {
  try {
    const response = yield call(deleteItemAsyncReq, props.payload);
    if (response.ok) {
      yield put(updateItemSuccess());
      yield put(fetchItemsStart());
    } else {
      yield put(updateItemFailure("delete item failed"));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchItemsFailure(err.message));
    } else {
      yield put(fetchItemsFailure("unexpected error happened"));
    }
  }
}

export function* onDeleteItem() {
  yield takeLatest(ITEM_ACTION_TYPES.DELETE_ITEM_START, deleteItemsAsync);
}

// GET LAST N ITEMS
export function* fetchLastNDaysItemsAsync(props: {
  type: ITEM_ACTION_TYPES;
  payload: number;
}): Generator<
  CallEffect<ItemInterface[]> | PutEffect<AnyAction>,
  void,
  ItemInterface[] | []
> {
  try {
    const response = yield call(getLastNDaysItemsAsyncReq, props.payload);
    yield put(fetchLastNDaysItemsSuccess(response, props.payload));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchLastNDaysItemsFailure(err.message));
    } else {
      yield put(fetchLastNDaysItemsFailure("unexpected error happened"));
    }
  }
}
export function* onFetchLastNDaysItems() {
  yield takeLatest(
    ITEM_ACTION_TYPES.FETCH_LAST_N_DAYS_ITEMS_START,
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

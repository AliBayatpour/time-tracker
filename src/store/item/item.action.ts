import { ITEM_ACTION_TYPES } from "./item.types";
import { ItemInterface } from "../../interfaces/item-interface";

// ADD ITEM
export const addItemStart = (
  item: ItemInterface
): { type: ITEM_ACTION_TYPES; payload: ItemInterface } => {
  return { type: ITEM_ACTION_TYPES.ADD_ITEM_START, payload: item };
};
export const addItemSuccess = () => {
  return { type: ITEM_ACTION_TYPES.ADD_ITEM_SUCCESS };
};
export const addItemFailure = (error: Error["message"]) => {
  return { type: ITEM_ACTION_TYPES.ADD_ITEM_FAILED, payload: error };
};

// GET ITEMS
export const fetchItemsStart = (): { type: ITEM_ACTION_TYPES } => {
  return { type: ITEM_ACTION_TYPES.FETCH_ITEMS_START };
};
export const fetchItemsSuccess = (itemsArr: ItemInterface[]) => {
  return { type: ITEM_ACTION_TYPES.FETCH_ITEMS_SUCCESS, payload: itemsArr };
};
export const fetchItemsFailure = (error: Error["message"]) => {
  return { type: ITEM_ACTION_TYPES.FETCH_ITEMS_FAILED, payload: error };
};

// UPDATE ITEM
export const updateItemStart = (
  item: ItemInterface
): { type: ITEM_ACTION_TYPES; payload: ItemInterface } => {
  return { type: ITEM_ACTION_TYPES.UPDATE_ITEM_START, payload: item };
};
export const updateItemSuccess = () => {
  return { type: ITEM_ACTION_TYPES.UPDATE_ITEM_SUCCESS };
};
export const updateItemFailure = (error: Error["message"]) => {
  return { type: ITEM_ACTION_TYPES.UPDATE_ITEM_FAILED, payload: error };
};

// DELETE ITEM
export const deleteItemStart = (
  item: ItemInterface
): { type: ITEM_ACTION_TYPES; payload: ItemInterface } => {
  return { type: ITEM_ACTION_TYPES.DELETE_ITEM_START, payload: item };
};
export const deleteItemSuccess = () => {
  return { type: ITEM_ACTION_TYPES.DELETE_ITEM_SUCCESS };
};
export const deleteItemFailure = (error: Error["message"]) => {
  return { type: ITEM_ACTION_TYPES.DELETE_ITEM_FAILED, payload: error };
};

// GET LAST N DAYS
export const fetchLastNDaysItemsStart = (
  nDays: number
): {
  type: ITEM_ACTION_TYPES;
  payload: number;
} => {
  return {
    type: ITEM_ACTION_TYPES.FETCH_LAST_N_DAYS_ITEMS_START,
    payload: nDays,
  };
};
export const fetchLastNDaysItemsSuccess = (
  itemsArr: ItemInterface[],
  nDays: number
) => {
  return {
    type: ITEM_ACTION_TYPES.FETCH_LAST_N_DAYS_ITEMS_SUCCESS,
    payload: { lastNDaysItems: itemsArr, nDays },
  };
};
export const fetchLastNDaysItemsFailure = (error: Error["message"]) => {
  return {
    type: ITEM_ACTION_TYPES.FETCH_LAST_N_DAYS_ITEMS_FAILED,
    payload: error,
  };
};

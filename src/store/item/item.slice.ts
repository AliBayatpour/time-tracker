import { ItemsReducerState } from "../../interfaces/items-store/items-reducer-state-interface";
import { createSlice } from "@reduxjs/toolkit";
const initialState: ItemsReducerState = {
  items: [],
  statData: { stat: [], categories: {}, total: 0 },
  isLoading: false,
  error: null,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addItemStart(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    addItemSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    addItemFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchItemsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchItemsSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
    },
    fetchItemsFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateItemStart(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    updateItemSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    updateItemFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteItemStart(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    deleteItemSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    deleteItemFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchLastNDaysStart(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    fetchLastNDaysSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.statData = action.payload;
    },
    fetchLastNDaysFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const itemSliceName = itemSlice.name;
export const itemActions = itemSlice.actions;
export const itemReducer = itemSlice.reducer;
export const itemCaseReducers = itemSlice.caseReducers;

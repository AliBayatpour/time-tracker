import { ItemsReducerState } from "../../interfaces/items-store/items-reducer-state-interface";
import { createSlice } from "@reduxjs/toolkit";
const initialState: ItemsReducerState = {
  items: [],
  last7Days: [],
  last14Days: [],
  last28Days: [],
  last180Days: [],
  last360Days: [],
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

      switch (action.payload.nDays) {
        case 7:
          state.last7Days = action.payload.lastNDaysItems;
          break;
        case 14:
          state.last14Days = action.payload.lastNDaysItems;
          break;
        case 28:
          state.last28Days = action.payload.lastNDaysItems;
          break;
        case 180:
          state.last180Days = action.payload.lastNDaysItems;
          break;
        case 360:
          state.last360Days = action.payload.lastNDaysItems;
          break;
        default:
          break;
      }
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

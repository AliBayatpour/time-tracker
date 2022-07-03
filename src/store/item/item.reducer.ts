import { ItemsReducerState } from "../../interfaces/items-store/items-reducer-state-interface";
import { ITEM_ACTION_TYPES } from "./item.types";

const ITEMS_INITIAL_STATE: ItemsReducerState = {
  items: [],
  last7Days: [],
  last14Days: [],
  last30Days: [],
  last180Days: [],
  last360Days: [],
  isLoading: false,
  error: null,
};

export const itemReducer = (
  state: ItemsReducerState = ITEMS_INITIAL_STATE,
  action: { type: string; payload: any }
): ItemsReducerState => {
  const { type, payload } = action;

  switch (type) {
    // ADD ITEM
    case ITEM_ACTION_TYPES.ADD_ITEM_START:
      return { ...state, isLoading: true, error: null };
    case ITEM_ACTION_TYPES.ADD_ITEM_SUCCESS:
      return { ...state, isLoading: false, error: null };
    case ITEM_ACTION_TYPES.ADD_ITEM_FAILED:
      return { ...state, isLoading: false, error: payload };

    // GET ITEMS
    case ITEM_ACTION_TYPES.FETCH_ITEMS_START:
      return { ...state, isLoading: true, error: null };
    case ITEM_ACTION_TYPES.FETCH_ITEMS_SUCCESS:
      return { ...state, isLoading: false, items: payload, error: null };
    case ITEM_ACTION_TYPES.FETCH_ITEMS_FAILED:
      return { ...state, isLoading: false, error: payload };

    // UPDATE ITEM
    case ITEM_ACTION_TYPES.UPDATE_ITEM_START:
      return { ...state, isLoading: true, error: null };
    case ITEM_ACTION_TYPES.UPDATE_ITEM_SUCCESS:
      return { ...state, isLoading: false, error: null };
    case ITEM_ACTION_TYPES.UPDATE_ITEM_FAILED:
      return { ...state, isLoading: false, error: payload };

    // DELETE ITEM
    case ITEM_ACTION_TYPES.DELETE_ITEM_START:
      return { ...state, isLoading: true, error: null };
    case ITEM_ACTION_TYPES.DELETE_ITEM_SUCCESS:
      return { ...state, isLoading: false, error: null };
    case ITEM_ACTION_TYPES.DELETE_ITEM_FAILED:
      return { ...state, isLoading: false, error: payload };

    // GET LAST N DAYS
    case ITEM_ACTION_TYPES.FETCH_LAST_N_DAYS_ITEMS_START:
      return { ...state, isLoading: true, error: null };
    case ITEM_ACTION_TYPES.FETCH_LAST_N_DAYS_ITEMS_SUCCESS:
      switch (payload.nDays) {
        case 7:
          return {
            ...state,
            isLoading: false,
            last7Days: payload.lastNDaysItems,
            error: null,
          };
        case 14:
          return {
            ...state,
            isLoading: false,
            last14Days: payload.lastNDaysItems,
            error: null,
          };
        case 30:
          return {
            ...state,
            isLoading: false,
            last30Days: payload.lastNDaysItems,
            error: null,
          };
        case 180:
          return {
            ...state,
            isLoading: false,
            last180Days: payload.lastNDaysItems,
            error: null,
          };
        case 360:
          return {
            ...state,
            isLoading: false,
            last360Days: payload.lastNDaysItems,
            error: null,
          };

        default:
          return state;
      }
    case ITEM_ACTION_TYPES.FETCH_LAST_N_DAYS_ITEMS_FAILED:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};

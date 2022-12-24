import { createSelector } from "reselect";
import { RootState } from "../../interfaces/root-state-interface";
import { filterDoneItems, filterTodoItems } from "../../utils/items-utils";

const selectItemsReducer = (state: RootState) => state.item;

export const selectItems = createSelector(
  [selectItemsReducer],
  (item) => item.items
);

export const selectTodoItems = createSelector([selectItems], (items) =>
  filterTodoItems(items)
);

export const selectDoneItems = createSelector([selectItems], (items) =>
  filterDoneItems(items)
);

export const selectStatData = createSelector(
  [selectItemsReducer],
  (item) => item.statData
);

export const selectIsLoading = createSelector(
  [selectItemsReducer],
  (item) => item.isLoading
);

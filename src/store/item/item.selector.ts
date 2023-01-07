import { createSelector } from "reselect";
import { RootState } from "../../interfaces/rootState.interface";
import { filterDoneItems, filterTodoItems } from "../../utils/items.utils";

const selectItemsReducer = (state: RootState) => state.item;

export const selectItems = createSelector(
  [selectItemsReducer],
  (item) => item.items
);

export const selectTodoItems = createSelector([selectItems], (items) =>
  filterTodoItems(items).sort()
);

export const selectDoneItems = createSelector([selectItems], (items) =>
  filterDoneItems(items).sort()
);

export const selectStatData = createSelector(
  [selectItemsReducer],
  (item) => item.statData
);

export const selectItemIsLoading = createSelector(
  [selectItemsReducer],
  (item) => item.isLoading
);

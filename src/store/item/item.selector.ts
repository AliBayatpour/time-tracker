import { createSelector } from "reselect";
import { RootState } from "../../interfaces/root-state-interface";
import { filterDoneItems, filterTodoItems } from "../../utils/items-utils";
import { lastNDaysChartDataBuilder } from "../../utils/stat-utils";

const selectItemsReducer = (state: RootState) => state.item;

export const selectItems = createSelector(
  [selectItemsReducer],
  (item) => item.items
);

// SELECT TODO ITEMS
export const selectTodoItems = createSelector([selectItems], (items) =>
  filterTodoItems(items)
);

// SELECT DONE ITEMS
export const selectDoneItems = createSelector([selectItems], (items) =>
  filterDoneItems(items)
);

// LAST 7 DAYS ITEMS
export const selectLast7DaysItems = createSelector(
  [selectItemsReducer],
  (item) => item.last7Days
);

// LAST 14 DAYS ITEMS
export const selectLast14DaysItems = createSelector(
  [selectItemsReducer],
  (item) => item.last14Days
);

// LAST 28 DAYS ITEMS
export const selectLast28DaysItems = createSelector(
  [selectItemsReducer],
  (item) => item.last28Days
);

// LAST 180 DAYS ITEMS
export const selectLast180DaysItems = createSelector(
  [selectItemsReducer],
  (item) => item.last180Days
);

// LAST 360 DAYS ITEMS
export const selectLast360DaysItems = createSelector(
  [selectItemsReducer],
  (item) => item.last360Days
);

// LAST 7 DAYS STAT DATA
export const selectLast7DaysStatData = createSelector(
  [selectLast7DaysItems],
  (last7DaysItems) => {
    let { lastNDaysChartResult, itemCategories } = lastNDaysChartDataBuilder(
      last7DaysItems,
      7
    );
    return { lastNDaysChartResult, itemCategories };
  }
);

// LAST 14 DAYS STAT DATA
export const selectLast14DaysStatData = createSelector(
  [selectLast14DaysItems],
  (last14DaysItems) => {
    let { lastNDaysChartResult, itemCategories } = lastNDaysChartDataBuilder(
      last14DaysItems,
      14
    );
    return { lastNDaysChartResult, itemCategories };
  }
);

// LAST 28 DAYS STAT DATA
export const selectLast28DaysStatData = createSelector(
  [selectLast28DaysItems],
  (last28DaysItems) => {
    let { lastNDaysChartResult, itemCategories } = lastNDaysChartDataBuilder(
      last28DaysItems,
      28
    );
    return { lastNDaysChartResult, itemCategories };
  }
);

// LAST 180 DAYS STAT DATA
export const selectLast180DaysStatData = createSelector(
  [selectLast180DaysItems],
  (last180DaysItems) => {
    let { lastNDaysChartResult, itemCategories } = lastNDaysChartDataBuilder(
      last180DaysItems,
      180
    );
    return { lastNDaysChartResult, itemCategories };
  }
);

// LAST 360 DAYS STAT DATA
export const selectLast360DaysStatData = createSelector(
  [selectLast360DaysItems],
  (last360DaysItems) => {
    let { lastNDaysChartResult, itemCategories } = lastNDaysChartDataBuilder(
      last360DaysItems,
      360
    );
    return { lastNDaysChartResult, itemCategories };
  }
);
export const selectIsLoading = createSelector(
  [selectItemsReducer],
  (item) => item.isLoading
);

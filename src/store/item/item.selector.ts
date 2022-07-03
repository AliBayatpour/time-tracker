import { createSelector } from "reselect";
import { filterDoneItems, filterTodoItems } from "../../utils/items-utils";
import { lastNDaysChartDataBuilder } from "../../utils/stat-utils";
import { RootState } from "../store";

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

// LAST 30 DAYS ITEMS
export const selectLast30DaysItems = createSelector(
  [selectItemsReducer],
  (item) => item.last30Days
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

// LAST 30 DAYS STAT DATA
export const selectLast30DaysStatData = createSelector(
  [selectLast30DaysItems],
  (last30DaysItems) => {
    let { lastNDaysChartResult, itemCategories } = lastNDaysChartDataBuilder(
      last30DaysItems,
      30
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

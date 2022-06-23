import { ChartCategoryInterface } from "../interfaces/chart-category-interface";
import { ItemInterface } from "../interfaces/item-interface";
import { convertMinToReadable, formatDateV1, getLastNDays } from "./date-utils";

export const totalTime = (doneItems: ItemInterface[]) => {
  let totalProgress = 0;
  doneItems?.forEach((doneItem) => {
    totalProgress = totalProgress + doneItem.progress;
  });
  return totalProgress;
};

export const totalTodoTime = (todoItems: ItemInterface[]) => {
  let totalTodo = 0;
  todoItems?.forEach((todoItem) => {
    totalTodo = totalTodo + todoItem.goal;
  });
  return totalTodo;
};

const randomColorGenerator = (): string => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const lastNDaysChartDataBuilder = (
  items: ItemInterface[],
  nDays: number
): {
  lastNDaysChartResult: { [key: string]: any }[];
  itemCategories: ChartCategoryInterface[];
} => {
  let colorList = [
    "#E3D954",
    "#E33D6D",
    "#27B7E3",
    "#418499",
    "#961A7D",
    "#E3CA54",
    "#E33DC2",
    "#27E3DC",
    "#219692",
    "#201A96",
    "#E38954",
    "#463DE3",
    "#46E327",
    "#399925",
    "#961A3E",
    "#1A9689",
    "#E6B1E2",
    "#3DE3D1",
    "#E3BD27",
    "#9C967D",
  ];
  let lastNDaysChartResult: any = [];
  let itemCategoriesNames: string[] = [];
  let itemCategories: ChartCategoryInterface[] = [];
  let lastNDaysArr = getLastNDays(nDays);
  lastNDaysArr.forEach((date) => {
    lastNDaysChartResult.push({ date });
  });
  // array of objects is created with date attribute
  items.forEach((item) => {
    if (!itemCategoriesNames.includes(item.category)) {
      itemCategoriesNames.push(item.category);
      itemCategories.push({
        category: item.category,
        color: colorList[itemCategoriesNames.length]
          ? colorList[itemCategoriesNames.length]
          : randomColorGenerator(),
      });
    }
    const indexOfItem = lastNDaysArr.findIndex(
      (date) => date === formatDateV1(new Date(item.finished_at * 1000))
    );
    if (!lastNDaysChartResult[indexOfItem][item.category]) {
      lastNDaysChartResult[indexOfItem][item.category] = item.progress;
    } else {
      lastNDaysChartResult[indexOfItem][item.category] =
        lastNDaysChartResult[indexOfItem][item.category] + item.progress;
    }
  });
  return { lastNDaysChartResult, itemCategories };
};

export const calculateTotalForCategory = (
  chartCategory: string,
  chartData: {
    [key: string]: any;
  }[]
): string => {
  let sum = 0;
  chartData.forEach((dataObj) => {
    if (dataObj[chartCategory]) {
      sum = sum + dataObj[chartCategory];
    }
  });
  return convertMinToReadable(sum);
};

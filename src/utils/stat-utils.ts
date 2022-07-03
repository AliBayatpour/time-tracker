import { ChartCategoryInterface } from "../interfaces/chart-category-interface";
import { ItemInterface } from "../interfaces/item-interface";
import { convertMinToReadable, formatDateV1, getLastNDays } from "./date-utils";

let colorList = [
  "#E3D954",
  "#E33D6D",
  "#27B7E3",
  "#399925",
  "#E33DC2",
  "#46E327",
  "#3DE3D1",
  "#E38954",
  "#463DE3",
  "#9C967D",
  "#961A7D",
  "#E3CA54",
  "#27E3DC",
  "#219692",
  "#201A96",
  "#46E327",
  "#961A3E",
  "#1A9689",
  "#E6B1E2",
  "#E3BD27",
  "#418499",
];
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
  // if (nDays === 28) {
  //   return subCategoryGenerator(itemCategories, lastNDaysChartResult);
  // } else {
  // }
  return { lastNDaysChartResult, itemCategories };
};

// const subCategoryGenerator = (
//   itemCategories: ChartCategoryInterface[],
//   lastNDaysChartResult: {
//     [key: string]: any;
//   }[]
// ): {
//   lastNDaysChartResult: { [key: string]: any }[];
//   itemCategories: ChartCategoryInterface[];
// } => {};

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
const chunkify = (
  a: {
    [key: string]: any;
  }[],
  n: number,
  balanced: boolean
): {
  [key: string]: any;
}[][] => {
  if (n < 2) return [a];

  var len = a.length,
    out = [],
    i = 0,
    size;

  if (len % n === 0) {
    size = Math.floor(len / n);
    while (i < len) {
      out.push(a.slice(i, (i += size)));
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, (i += size)));
    }
  } else {
    n--;
    size = Math.floor(len / n);
    if (len % size === 0) size--;
    while (i < size * n) {
      out.push(a.slice(i, (i += size)));
    }
    out.push(a.slice(size * n));
  }

  return out;
};

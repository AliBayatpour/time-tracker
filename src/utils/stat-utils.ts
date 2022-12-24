import { ChartData } from "../interfaces/chart-category-interface";
import { Item } from "../interfaces/item-interface";
import { ItemsReducerState } from "../interfaces/items-store/items-reducer-state-interface";

export const colorList = [
  "#E6C229",
  "#D11149",
  "#F17105",
  "#59D102",
  "#FF00CC",
  "#463DE3",
  "#9C967D",
  "#961A7D",
  "#E3CA54",
  "#27E3DC",
  "#219692",
  "#201A96",
  "#46E327",
  "#961A3E",
  "#E33DC2",
  "#1A9689",
  "#E6B1E2",
  "#E3BD27",
  "#418499",
  "#27B7E3",
];
export const totalTime = (doneItems: Item[]) => {
  let totalProgress = 0;
  doneItems?.forEach((doneItem) => {
    totalProgress = totalProgress + doneItem.progress;
  });
  return totalProgress;
};

export const totalTodoTime = (todoItems: Item[]) => {
  let totalTodo = 0;
  todoItems?.forEach((todoItem) => {
    totalTodo = totalTodo + todoItem.goal;
  });
  return totalTodo;
};

export const randomColorGenerator = (): string => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const buildChartData = (
  itemsList: ItemsReducerState["statData"]["stat"]
) => {
  const result: ChartData = [];
  itemsList.forEach((item) => {
    result.push({
      label: item[0],
      ...item[1],
    });
  });
  return result;
};

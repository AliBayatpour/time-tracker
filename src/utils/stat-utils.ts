import { ChartData } from "../interfaces/chart-category-interface";
import { Item } from "../interfaces/item-interface";
import { ItemsReducerState } from "../interfaces/items-store/items-reducer-state-interface";

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

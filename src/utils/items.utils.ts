import { Item } from "../interfaces/item.interface";

export const filterTodoItems = (items: Item[]): Item[] => {
  let filteredItems = items.filter((item) => !item.done);
  return filteredItems.sort((a, b) => (a.sort > b.sort ? 1 : -1));
};
export const filterDoneItems = (items: Item[]) => {
  let filteredItems = items.filter((item) => item.done);
  return filteredItems.sort((a, b) => (a.finishedAt > b.finishedAt ? 1 : -1));
};

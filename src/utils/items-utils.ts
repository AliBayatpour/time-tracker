import { Item } from "../interfaces/item-interface";

export const filterTodoItems = (items: Item[]): Item[] => {
  let filteredItems = items.filter((item) => !item.done);
  return filteredItems.sort((a, b) => (a.sort > b.sort ? 1 : -1));
};
export const filterDoneItems = (items: Item[]) => {
  let filteredItems = items.filter((item) => item.done);
  return filteredItems.sort((a, b) => (a.finished_at > b.finished_at ? 1 : -1));
};

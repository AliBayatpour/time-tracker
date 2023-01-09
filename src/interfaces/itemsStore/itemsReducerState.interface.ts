import { Item } from "../item.interface";

export type ItemsReducerState = {
  items: Item[];
  statData: {
    stat: [string, { [key: string]: number }][];
    categories: { [key: string]: { color: string; total: number } };
    total: number;
  };
  isLoading: boolean;
  error: null | Error["message"];
};

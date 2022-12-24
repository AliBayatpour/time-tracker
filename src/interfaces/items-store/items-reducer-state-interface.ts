import { Item } from "../item-interface";

export type ItemsReducerState = {
  items: Item[];
  statData: {
    stat: [string, { [key: string]: number }][];
    categories: string[];
  };
  isLoading: boolean;
  error: null | Error["message"];
};

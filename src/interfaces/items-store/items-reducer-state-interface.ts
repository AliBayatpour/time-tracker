import { Item } from "../item-interface";

export type ItemsReducerState = {
  items: Item[];
  last7Days: Item[];
  last14Days: Item[];
  last28Days: Item[];
  last180Days: Item[];
  last360Days: Item[];
  isLoading: boolean;
  error: null | Error["message"];
};

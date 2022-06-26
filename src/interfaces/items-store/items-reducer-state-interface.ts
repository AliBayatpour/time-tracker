import { ItemInterface } from "../item-interface";

export interface ItemsReducerState {
  items: ItemInterface[];
  last7Days: ItemInterface[];
  last14Days: ItemInterface[];
  last30Days: ItemInterface[];
  isLoading: boolean;
  error: null | Error["message"];
}

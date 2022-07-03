import { ItemInterface } from "../item-interface";

export interface ItemsReducerState {
  items: ItemInterface[];
  last7Days: ItemInterface[];
  last14Days: ItemInterface[];
  last28Days: ItemInterface[];
  last180Days: ItemInterface[];
  last360Days: ItemInterface[];
  isLoading: boolean;
  error: null | Error["message"];
}

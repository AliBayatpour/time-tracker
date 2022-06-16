import { ItemInterface } from "./item-interface";

export interface StatItemInterface {
  category: ItemInterface["category"];
  progress: number;
  date: string;
}

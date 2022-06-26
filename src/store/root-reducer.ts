import { combineReducers } from "redux";
import { itemReducer } from "./item/item.reducer";

export const rootReducer = combineReducers({
     item: itemReducer
});

import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { itemReducer } from "./item/item.slice";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware();
const middleWares = [logger, sagaMiddleware];

export const store = configureStore({
  reducer: { item: itemReducer },
  middleware: middleWares,
});

sagaMiddleware.run(rootSaga);



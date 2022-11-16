import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { authReducer } from "./auth/auth.slice";
import { itemReducer } from "./item/item.slice";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware();
const middleWares = [logger, sagaMiddleware];

export const store = configureStore({
  reducer: { item: itemReducer, auth: authReducer },
  middleware: middleWares,
});

sagaMiddleware.run(rootSaga);

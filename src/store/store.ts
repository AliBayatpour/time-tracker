import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { authReducer } from "./auth/auth.slice";
import { itemReducer } from "./item/item.slice";
import { restTimerReducer } from "./rest-timer/rest-timer.slice";
import { rootSaga } from "./root-saga";
import { settingsReducer } from "./settings/settings.slice";
import { timerReducer } from "./timer/timer.slice";

const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    item: itemReducer,
    auth: authReducer,
    timer: timerReducer,
    restTimer: restTimerReducer,
    settings: settingsReducer,
  },
  middleware: middleWares,
});

sagaMiddleware.run(rootSaga);

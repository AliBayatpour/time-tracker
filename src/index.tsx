import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context";
import { TimerContextProvider } from "./context/timer-context";
import { ModalContextProvider } from "./context/modal-context";
import { store } from "./store/store";
import { RestTimerContextProvider } from "./context/rest-timer-context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <ModalContextProvider>
          <RestTimerContextProvider>
            <TimerContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </TimerContextProvider>
          </RestTimerContextProvider>
        </ModalContextProvider>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import { ItemContextProvider } from "./store/item-context";
import { StatContextProvider } from "./store/stats-context";
import { TimerContextProvider } from "./store/timer-context";
import { ModalContextProvider } from "./store/modal-context";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ModalContextProvider>
        <ItemContextProvider>
          <StatContextProvider>
            <TimerContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </TimerContextProvider>
          </StatContextProvider>
        </ItemContextProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import { ItemContextProvider } from "./store/item-context";
import { StatContextProvider } from "./store/stats-context";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ItemContextProvider>
        <StatContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StatContextProvider>
      </ItemContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

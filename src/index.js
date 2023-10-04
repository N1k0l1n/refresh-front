import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { store } from "./app/store";
import { Provider } from "react-redux";

import { BroswerRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BroswerRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BroswerRouter>
    </Provider>
  </React.StrictMode>
);

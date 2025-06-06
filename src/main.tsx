import ReactDOM from "react-dom/client";
import { App } from "./App";

import "./global.css";

import React from "react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

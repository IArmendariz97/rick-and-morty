import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  // encierro mi app en Browser Router para que funcione la config. de las Routes en App.js
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

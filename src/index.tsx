import React from "react";
import ReactDOM from "react-dom";
import App from './App'
// import ContextProvider from "./stores/store";
import "./themes/index.css";

ReactDOM.render(
  // <ContextProvider>
  <App />,
  // </ContextProvider>,
  document.getElementById("root")
);

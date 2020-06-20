import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Root from "./pages";
import { AppProvider } from "./store";
import "antd/dist/antd.css";
import "./index.css";

ReactDOM.render(
  <Router>
    <AppProvider>
      <Root />
    </AppProvider>
  </Router>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Root from "./pages";
import "antd/dist/antd.css";
import "./index.css";

ReactDOM.render(
  <Router>
    <Root />
  </Router>,
  document.getElementById("root")
);

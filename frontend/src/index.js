import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import Root from "./pages";

ReactDOM.render(
  <Router>
    <Root />
  </Router>,
  document.getElementById("root")
);

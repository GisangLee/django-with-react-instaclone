import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import AccountRoutes from "./accounts/index";
import LoginRequiredRoute from "../utils/LoginRequiredRoute";
import PostNew from "./PostNew";
import PostModify from "./PostModify";

function Root() {
  return (
    <>
      <LoginRequiredRoute exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <LoginRequiredRoute exact path="/posts/new" component={PostNew} />
      <LoginRequiredRoute
        exact
        path="/posts/:postid/modify"
        component={PostModify}
      />
      <Route path="/accounts" component={AccountRoutes} />
    </>
  );
}

export default Root;

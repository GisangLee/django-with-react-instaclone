import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "../store";

export default function LoginRequiredRoute({ component: Component, ...rest }) {
  const {
    store: { isAuthenticated },
  } = useAppContext();

  if (isAuthenticated) {
    console.log("isAuthenticated: ", isAuthenticated);
  } else {
    console.log("isAuthenticated: ", isAuthenticated);
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/accounts/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}

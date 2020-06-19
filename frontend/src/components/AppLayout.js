import React from "react";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import AppSidebar from "./AppSidebar";
import "./AppLayout.scss";

function AppLayout({ children }) {
  return (
    <>
      <div className="app">
        <AppHeader />
        <div className="contents">{children}</div>
        <AppSidebar />
        <AppFooter />
      </div>
    </>
  );
}

export default AppLayout;

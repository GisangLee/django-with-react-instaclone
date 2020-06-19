import React from "react";
import { Input, Menu } from "antd";
import "./AppHeader.scss";
import LogoImage from "../assets/instalogo.png";

function AppHeader() {
  return (
    <div className="header">
      <h1 className="header__title">
        <img src={LogoImage} alt="logo" />
      </h1>
      <div className="header__search">
        <Input.Search placeholder="검색어를 입력하세요." />
      </div>
      <div className="header__topnav">
        <Menu mode="horizontal">
          <Menu.Item>메뉴1</Menu.Item>
          <Menu.Item>메뉴2</Menu.Item>
          <Menu.Item>메뉴3</Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default AppHeader;

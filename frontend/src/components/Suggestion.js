import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./Suggestion.scss";

const Suggestion = () => {
  return (
    <div className="suggestion">
      <div className="suggestion__avatar">
        <UserOutlined />
      </div>
      <div className="suggestion__username">Username</div>
      <div className="suggestion__btn">
        <Button danger>Follow</Button>
      </div>
    </div>
  );
};

export default Suggestion;

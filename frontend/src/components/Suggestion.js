import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import "./Suggestion.scss";

const Suggestion = ({ suggestionUser }) => {
  const { username, name, avatar_url } = suggestionUser;

  return (
    <div className="suggestion">
      <div className="suggestion__avatar">
        <Avatar
          icon={
            <img
              src={"http://localhost:8000" + avatar_url}
              alt={`${name.length === 0 ? username : name}'s avatar`}
            />
          }
        />
      </div>
      <div className="suggestion__username">
        {name.length === 0 ? username : name}
      </div>
      <div className="suggestion__btn">
        <Button danger>Follow</Button>
      </div>
    </div>
  );
};

export default Suggestion;

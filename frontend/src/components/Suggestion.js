import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import "./Suggestion.scss";

const Suggestion = ({ suggestionUser, onFollowUser }) => {
  const { username, name, avatar_url, is_follow } = suggestionUser;

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
        {is_follow && "팔로잉 중"}
        {!is_follow && (
          <Button size="small" onClick={() => onFollowUser(username)}>
            Follow
          </Button>
        )}
      </div>
    </div>
  );
};

export default Suggestion;

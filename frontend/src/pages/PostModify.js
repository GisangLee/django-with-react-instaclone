import React from "react";
import PostModifyForm from "../components/PostModifyForm";
import { Card } from "antd";
import "./PostNew.scss";

export default function PostNew({ location }) {
  const {
    state: { postId },
  } = location;
  return (
    <div className="PostNew">
      <Card title="포스팅 수정하기">
        <PostModifyForm postId={postId} />;
      </Card>
    </div>
  );
}

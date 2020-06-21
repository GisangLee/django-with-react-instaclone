import React from "react";
import { Avatar, Tooltip, Comment as AntdComment } from "antd";
import moment from "moment";

export default function Comment({ comment }) {
  const {
    author: { username, avatar_url, name },
    message,
    id,
    created_at,
  } = comment;

  const displayName = name.length === 0 ? username : name;
  return (
    <AntdComment
      actions={[<span key="comment-nested-reply-to">댓글달기</span>]}
      author={displayName}
      avatar={
        //FIXME: avatar_url 호스트 지정
        <Avatar src={"http://localhost:8000" + avatar_url} alt={displayName} />
      }
      content={<p>{message}</p>}
      datetime={
        <Tooltip title={moment().format(created_at)}>
          <span>{moment(created_at).fromNow()}</span>
        </Tooltip>
      }
    />
  );
}

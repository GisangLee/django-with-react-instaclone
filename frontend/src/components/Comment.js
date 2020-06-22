import React from "react";
import { Avatar, Tooltip, Button, Comment as AntdComment } from "antd";
import styled from "styled-components";
import moment from "moment";

export default function Comment({ comment, post, handleDeleteComment }) {
  const {
    author: { username, avatar_url, name },
    message,
    id,
    created_at,
  } = comment;

  const myHost = localStorage.getItem("username");

  const toDelComment = () => {
    return (
      <Button
        type="link"
        danger
        onClick={() => handleDeleteComment({ comment })}
      >
        삭제하기
      </Button>
    );
  };

  const notToDelete = () => {
    return;
  };

  const displayName = name.length === 0 ? username : name;
  return (
    <>
      <div>
        <AntdComment
          actions={[
            <span key="comment-nested-reply-to">댓글달기</span>,
            username === myHost ? toDelComment() : notToDelete(),
          ]}
          author={displayName}
          avatar={
            //FIXME: avatar_url 호스트 지정
            <Avatar
              src={"http://localhost:8000" + avatar_url}
              alt={displayName}
            />
          }
          content={<p>{message}</p>}
          datetime={
            <Tooltip title={moment().format(created_at)}>
              <span>{moment(created_at).fromNow()}</span>
            </Tooltip>
          }
        />
      </div>
    </>
  );
}

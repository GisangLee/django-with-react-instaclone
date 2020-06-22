import React, { Children, useState } from "react";
import { Avatar, Tooltip, Input, Button } from "antd";
import moment from "moment";
import useAxios from "axios-hooks";
import Axios from "axios";
import { useAppContext } from "../store";
import Comment from "./Comment";

export default function CommentList({ post }) {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [commentContent, setCommentContent] = useState("");

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: commentList, loading, error }, refetch] = useAxios({
    url: `http://localhost:8000/api/posts/${post.id}/comments/`,
    headers,
  });

  const handleCommentSave = async () => {
    const apiUrl = `http://localhost:8000/api/posts/${post.id}/comments/`;

    try {
      const response = await Axios.post(
        apiUrl,
        { message: commentContent },
        { headers }
      );
      console.log("response: ", response);
      refetch();
      setCommentContent("");
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const handleDeleteComment = async ({ comment }) => {
    const apiUrl = `http://localhost:8000/api/posts/${post.id}/comments/${comment.id}/`;
    const method = "DELETE";
    console.log("comment : ", comment);
    try {
      await Axios({
        url: apiUrl,
        method,
        headers,
      });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {commentList &&
        commentList.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            post={post}
            handleDeleteComment={handleDeleteComment}
          />
        ))}

      <Input.TextArea
        style={{ marginBottom: "0.5em" }}
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <Button
        block
        type="primary"
        disabled={commentContent.length === 0}
        onClick={handleCommentSave}
      >
        댓글작성
      </Button>
    </div>
  );
}

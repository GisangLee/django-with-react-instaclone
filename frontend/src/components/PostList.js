import React, { useState, useEffect } from "react";
import Axios from "axios";
import useAxios from "axios-hooks";
import Post from "./Post";
import { useAppContext } from "../store";
import { Alert } from "antd";
import { useHistory } from "react-router-dom";
import PostModify from "../pages/PostModify";

function PostList() {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [postList, setPostList] = useState([]);

  const history = useHistory();

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: originPostList, loading, error }, refetch] = useAxios({
    url: "http://localhost:8000/api/posts/",
    headers,
  });

  const [fileList, setFileList] = useState([]);
  const [previewPhoto, setPreviewPhoto] = useState({
    visible: false,
    base64: null,
  });
  const [fieldErrors, setFieldError] = useState({});

  useEffect(() => {
    setPostList(originPostList);
  }, [originPostList]);

  const handleLike = async ({ post, isLike }) => {
    const apiUrl = `http://localhost:8000/api/posts/${post.id}/like/`;
    const method = isLike ? "POST" : "DELETE";

    try {
      const response = await Axios({
        url: apiUrl,
        method,
        headers,
      });
      console.log("response: ", response);
      setPostList((prevList) => {
        return prevList.map((currentPost) =>
          currentPost === post
            ? { ...currentPost, is_like: isLike }
            : currentPost
        );
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleDelete = async ({ post }) => {
    const apiUrl = `http://localhost:8000/api/posts/${post.id}/`;
    const method = "DELETE";
    console.log("post : ", post);
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

  const handleModify = ({ post }) => {
    const postId = post.id;
    history.push({ pathname: `/posts/${post.id}/modify`, state: { postId } });
  };
  return (
    <div>
      {postList && postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다." />
      )}
      {postList &&
        postList.map((post) => (
          <Post
            post={post}
            key={post.id}
            handleLike={handleLike}
            handleModify={handleModify}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  );
}

export default PostList;

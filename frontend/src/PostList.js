import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

const API_URL = "http://127.0.0.1:8000/api/posts/";

function PostList() {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        const { data } = response;
        console.log("loaded response:", response);
        setPostList(data);
      })
      .catch((error) => {
        //error.response;
      });
  }, []);
  return (
    <div>
      <h2>Post List</h2>
      {postList.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default PostList;

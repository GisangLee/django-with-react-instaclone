import React, { useState } from "react";
import { Card, Avatar, Button, Popover } from "antd";
import { HeartOutlined, HeartFilled, HeartTwoTone } from "@ant-design/icons";

import CommentList from "./CommentList";
import { setStorageItem } from "../utils/useLocalStorage";
import { useHistory } from "react-router-dom";

function Post({ post, handleLike, handleModify, handleDelete }) {
  const { author, caption, location, photo, tag_set, is_like } = post;
  const { username, name, avatar_url } = author;
  const [visible, setVisible] = useState(false);
  const host = localStorage.getItem("username");

  const history = useHistory();

  const printAuthor = () => {
    console.log("author: ", author);
    console.log("author2: ", username);
    console.log("host: ", host);
  };

  const modifyContent = (
    <div>
      <Button type="link" block onClick={() => handleModify({ post })}>
        수정하기
      </Button>
      <Button type="link" block onClick={() => handleDelete({ post })}>
        삭제하기
      </Button>
    </div>
  );

  const onClose = () => {
    setVisible({ visible: true });
  };

  const printModify = () => {
    return (
      <Popover content={modifyContent}>
        <Button block type="link" danger>
          포스팅 수정하기
        </Button>
      </Popover>
    );
  };

  const notHost = () => {
    return;
  };

  return (
    <div>
      <Card
        hoverable
        cover={<img src={photo} alt={caption} />}
        actions={[
          is_like ? (
            <HeartTwoTone
              twoToneColor="##eb2f96"
              onClick={() => handleLike({ post, isLike: false })}
            />
          ) : (
            <HeartOutlined onClick={() => handleLike({ post, isLike: true })} />
          ),
          host === username ? printModify() : notHost(),
        ]}
      >
        <Card.Meta
          avatar={
            <Avatar
              icon={
                <img
                  src={`http://localhost:8000` + avatar_url}
                  alt={username}
                />
              }
            />
          }
          title={location}
          description={caption}
          style={{ marginBottom: "0.5em" }}
        ></Card.Meta>
        <CommentList post={post}></CommentList>
      </Card>
      {/* <img src={photo} alt={caption} style={{ width: "100px" }} />
      {caption}, {location} */}
    </div>
  );
}

export default Post;

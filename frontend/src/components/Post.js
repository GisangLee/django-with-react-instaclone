import React from "react";
import { Card, Avatar } from "antd";
import { HeartOutlined, HeartFilled, HeartTwoTone } from "@ant-design/icons";

function Post({ post, handleLike }) {
  const { author, caption, location, photo, tag_set, is_like } = post;
  const { username, name, avatar_url } = author;
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
        ></Card.Meta>
      </Card>
      {/* <img src={photo} alt={caption} style={{ width: "100px" }} />
      {caption}, {location} */}
    </div>
  );
}

export default Post;

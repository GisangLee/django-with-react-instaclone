import React from "react";
import { Card, Avatar } from "antd";
import { HeartOutlined, HeartFilled, UserAddOutlined } from "@ant-design/icons";

function Post({ post }) {
  const { caption, location, photo } = post;
  return (
    <div>
      <Card
        hoverable
        cover={<img src={photo} alt={caption} />}
        actions={[<HeartOutlined />]}
      >
        <Card.Meta
          avatar={<Avatar icon={<UserAddOutlined />} />}
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

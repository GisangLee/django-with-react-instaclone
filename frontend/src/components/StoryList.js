import React from "react";
import { Card } from "antd";
import "./StoryList.scss";

const StoryList = ({ style }) => {
  return (
    <div style={style}>
      <Card title="스토리" size="small">
        Stories from people you follow will show up
      </Card>
    </div>
  );
};

export default StoryList;

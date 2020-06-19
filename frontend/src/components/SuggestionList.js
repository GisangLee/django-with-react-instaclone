import React from "react";
import { Card } from "antd";
import "./SuggestionList.scss";
import Suggestion from "./Suggestion";

const SuggestionList = ({ style }) => {
  return (
    <div style={style}>
      <Card title="친구 추천" size="small">
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
      </Card>
    </div>
  );
};

export default SuggestionList;

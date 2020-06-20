import React from "react";
import { Card, notification } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import Suggestion from "./Suggestion";
import useAxios from "axios-hooks";
import { useAppContext } from "../store";
import "./SuggestionList.scss";

const SuggestionList = ({ style }) => {
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };

  const apiUrl = "http://localhost:8000/accounts/suggestions/";

  const [{ data: userList, loading, error }, refetch] = useAxios({
    url: apiUrl,
    headers,
  });

  return (
    <div style={style}>
      <Card title="친구 추천" size="small">
        {loading && <div></div>}
        {error &&
          notification.open({
            message: "로딩 중 에러가 발생했습니다.",
            description: "에러 발생",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          })}
        <button onClick={() => refetch()}>Reload</button>
        {userList &&
          userList.map((suggestionUser) => (
            <Suggestion
              key={suggestionUser.username}
              suggestionUser={suggestionUser}
            />
          ))}
      </Card>
    </div>
  );
};

export default SuggestionList;

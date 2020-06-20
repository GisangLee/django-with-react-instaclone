import React, { useMemo, useState, useEffect } from "react";
import { Card, notification } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import Suggestion from "./Suggestion";
import Axios from "axios";
import useAxios from "axios-hooks";
import { useAppContext } from "../store";
import "./SuggestionList.scss";

const SuggestionList = ({ style }) => {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [userList, setUserList] = useState([]);

  const headers = { Authorization: `JWT ${jwtToken}` };

  const apiUrl = "http://localhost:8000/accounts/suggestions/";

  const [{ data: origUserList, loading, error }, refetch] = useAxios({
    url: apiUrl,
    headers,
  });

  useEffect(() => {
    if (!origUserList) setUserList([]);
    else
      setUserList(origUserList.map((user) => ({ ...user, is_follow: false })));
  }, [origUserList]);

  const onFollowUser = (username) => {
    const data = { username };
    const confing = { headers };
    Axios.post("http://localhost:8000/accounts/follow/", data, confing)
      .then((reponse) => {
        setUserList((prevUserList) =>
          prevUserList.map((user) =>
            user.username !== username ? user : { ...user, is_follow: true }
          )
        );
      })
      .catch((e) => {
        console.error(e);
      });
  };

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
              onFollowUser={onFollowUser}
            />
          ))}
      </Card>
    </div>
  );
};

export default SuggestionList;

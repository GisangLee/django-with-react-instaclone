import React, { useState, useEffect } from "react";
import { Card } from "antd";
import "./SuggestionList.scss";
import Suggestion from "./Suggestion";
import axios from "axios";
import { useAppContext } from "../store";

const SuggestionList = ({ style }) => {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function fetchUserList() {
      const apiUrl = "http://localhost:8000/accounts/suggestions/";
      const headers = { Authorization: `JWT ${jwtToken}` };
      try {
        const { data } = await axios.get(apiUrl, { headers });
        setUserList(data);
        console.log("data:", data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserList();
  }, []);
  return (
    <div style={style}>
      <Card title="친구 추천" size="small">
        {userList.map((suggestionUser) => (
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

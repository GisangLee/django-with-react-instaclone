import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "antd";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();
  const [userdata, setUserdata] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formdisable, setFormDisable] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors({});

    axios
      .post("http://localhost:8000/accounts/signup/", userdata)
      .then((response) => {
        history.push("/accounts/login");
      })
      .catch((e) => {
        console.log("erorr:", e);
        if (e.response) {
          setErrors({
            username: (e.response.data.username || []).join(" "),
            password: (e.response.data.password || []).join(" "),
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const isEnable = Object.values(userdata).every((s) => s.length > 0);
    setFormDisable(!isEnable);
  }, [userdata]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" name="username" onChange={onChange} />
          {errors.username && (
            <Alert
              message="Error"
              description={errors.username}
              type="error"
              showIcon
            />
          )}
        </div>
        <div>
          <input type="password" name="password" onChange={onChange} />
          {errors.password && (
            <Alert
              message="Error"
              description={errors.password}
              type="error"
              showIcon
            />
          )}
        </div>
        <input
          type="submit"
          value="회원가입"
          disabled={isLoading || formdisable}
        />
      </form>
    </div>
  );
};

export default Signup;

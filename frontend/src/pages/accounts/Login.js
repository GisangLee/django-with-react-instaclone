import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { Alert, Form, Input, Button, notification, Card } from "antd";
import { HeartFilled, FrownOutlined } from "@ant-design/icons";
import { useAppContext, setToken } from "../../store";
import { parseErrorMessages } from "../../utils/errorForms";

export default function Login() {
  const { dispatch } = useAppContext();
  const location = useLocation();
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});

  const { from: loginRedirectUrl } = location.state || {
    from: { patname: "/" },
  };

  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;
      setFieldErrors({});
      const data = { username, password };
      try {
        const response = await axios.post(
          "http://localhost:8000/accounts/token/",
          data
        );
        const {
          data: { token: jwtToken },
        } = response;

        console.log("username: ", username);

        dispatch(setToken(jwtToken));

        notification.open({
          message: "로그인 성공~❤",
          description: "커플에 오신 것을 환영합니다.",
          icon: <HeartFilled style={{ color: "#108ee9" }} />,
        });
        console.log(loginRedirectUrl);
        history.push("/");
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "로그인 실패 😢",
            description: "아이디 혹은 비밀번호를 다시 입력해 주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
          const { data: fieldsErrorMessages } = error.response;
          console.log(fieldsErrorMessages);

          //python  : dict.items()

          setFieldErrors(parseErrorMessages(fieldsErrorMessages));
        }
      }
    }
    fn();
  };
  return (
    <Card title="로그인">
      <Form
        {...layout}
        onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "이름을 입력해주세요" },
            { min: 5, message: "5글자 이상입력하세요" },
          ]}
          hasFeedback
          {...fieldErrors.username}
          {...fieldErrors.non_field_errors}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}
          {...fieldErrors.password}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

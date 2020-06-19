import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Alert, Form, Input, Button, notification } from "antd";
import { HeartFilled, FrownOutlined } from "@ant-design/icons";

export default function Signup() {
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});

  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;
      setFieldErrors({});
      const data = { username, password };
      try {
        const response = await axios.post(
          "http://localhost:8000/accounts/signup/",
          data
        );
        notification.open({
          message: "회원가입을 축하합니다~❤",
          description:
            "커플에 오신 것을 환영합니다. 로그인 페이지로 이동합니다.",
          icon: <HeartFilled style={{ color: "#108ee9" }} />,
        });
        history.push("/accounts/login");
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "회원가입 실패 😢",
            description: "아이디 혹은 비밀번호를 다시 입력해 주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
          const { data: fieldsErrorMessages } = error.response;
          console.log(fieldsErrorMessages);

          //python  : dict.items()
          setFieldErrors(
            Object.entries(fieldsErrorMessages).reduce(
              (acc, [fieldName, errors]) => {
                console.log("acc : ", acc);
                console.log("filedName : ", fieldName);
                console.log("errors : ", errors);
                acc[fieldName] = {
                  validateStatus: "error",
                  help: errors.join(" "),
                };
                return acc;
              },
              {}
            )
          );
        }
      }
    }
    fn();
  };

  return (
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
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

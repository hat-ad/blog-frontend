"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Divider,
  Card,
  message,
} from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import * as yup from "yup";
import Link from "next/link"; // Import Link from Next.js
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { register, socialRegister } from "@/requests/auth.requests";
import Loader from "@/components/Loader";

import { useDispatch } from "react-redux";
import { loginUser } from "@/slice/auth.slice";
import withGuest from "@/components/AuthGuards/withGuest";

const SignUp: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const onFinish = async (values: any) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      onSubmit(values);
    } catch (validationError: any) {
      const customErrors: Record<string, string> = {};

      validationError.inner.forEach((error: any) => {
        customErrors[error.path] = error.message;
      });

      setErrors(customErrors);
    }
  };

  const onSubmit = async (values: any) => {
    setLoading(true);
    const payload = {
      email: values.email,
      password: values.password,
      name: values.name,
    };
    const response = await register(payload);
    if (typeof response === "string") {
      messageApi.open({
        type: "error",
        content: response,
      });
    } else {
      dispatch(loginUser(response));
    }
    setLoading(false);
  };

  const onSuccess = async (
    credentialResponse: CredentialResponse
  ): Promise<void> => {
    setLoading(true);
    const response = await socialRegister(credentialResponse);
    if (typeof response === "string") {
      messageApi.open({
        type: "error",
        content: response,
      });
    } else {
      dispatch(
        loginUser({
          payload: response,
        })
      );
    }
    setLoading(false);
  };

  const onError = () => {
    messageApi.open({
      type: "error",
      content: "Failed to sign-up!",
    });
  };

  return (
    <>
      {contextHolder}
      <div className="sign-up-container">
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
          <Col xs={24} sm={20} md={16} lg={12} xl={8}>
            <Card className="sign-up-card">
              <Typography.Title level={2} style={{ textAlign: "center" }}>
                Create an Account
              </Typography.Title>
              <Form name="signup" onFinish={onFinish}>
                <Form.Item
                  name="name"
                  validateStatus={errors.name ? "error" : ""}
                  help={errors.name}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Name"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  validateStatus={errors.email ? "error" : ""}
                  help={errors.email}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Email"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  validateStatus={errors.password ? "error" : ""}
                  help={errors.password}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                    size="large"
                  />
                </Form.Item>
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%" }}
                        size="large"
                      >
                        Sign Up
                      </Button>
                    </Form.Item>
                    <Divider>Or</Divider>
                    <GoogleLogin
                      onSuccess={onSuccess}
                      onError={onError}
                      size="large"
                    />
                    <Divider>
                      Already have an account?{" "}
                      <Link href="/auth/sign-in">Sign In</Link>
                    </Divider>
                  </>
                )}
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default withGuest(SignUp);

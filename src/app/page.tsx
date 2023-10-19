"use client";
import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Typography, Divider } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import * as yup from "yup";

const SignIn: React.FC = () => {
  const validationSchema = yup.object().shape({
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
      // If validation is successful, proceed with sign-in logic
    } catch (validationError: any) {
      // Handle custom error handling
      const customErrors: Record<string, string> = {};

      validationError.inner.forEach((error: any) => {
        customErrors[error.path] = error.message;
      });

      setErrors(customErrors);
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google social auth login logic here
    console.log("Google login clicked");
  };

  return (
    <div className="sign-in-container">
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <div className="sign-in-form">
            <Typography.Title
              level={2}
              style={{ marginBottom: 20, textAlign: "center" }}
            >
              Sign In
            </Typography.Title>
            <Form name="signin" onFinish={onFinish}>
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
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%", marginBottom: 10 }}
                  size="large"
                >
                  Sign In
                </Button>
                <Divider plain>Or</Divider>
                <Button
                  type="default"
                  icon={<GoogleOutlined />}
                  onClick={handleGoogleLogin}
                  style={{ width: "100%", marginTop: 10 }}
                  size="large"
                >
                  Sign In with Google
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;

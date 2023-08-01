import { Form, Input, Button, Card, Col, Row } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  LOGIN_ACTION,
  useLoginContentDispatch,
} from "../contexts/login-context";
import { login } from "../services/login-service";
import { showErrorNotification } from "../components/notifications";

const LoginPage = () => {
  const dispatch = useLoginContentDispatch();

  const onFinish = async (values: any) => {
    try {
      const responce = await login(values);
      const { access_token } = responce.data;
      console.log(access_token);
      dispatch({
        action: LOGIN_ACTION.LOGIN,
        data: access_token,
      });
    } catch (e: any) {
      showErrorNotification(e.response.statusText, e.response.data.msg);
    }
  };

  return (
    <Row
      style={{
        height: "100vh",
        justifyContent: "center",
        background: "#f2f2f2",
      }}
    >
      <Col
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            width: 500,
          }}
        >
          <img
            src="victorian-government-word-text-logo-symbol-transparent-png-222281.png"
            alt="Logo"
            className="logo"
          />
          <br />
          <br />
          <Form
            name="login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <br />
            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;

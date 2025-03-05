import { Button, Form, FormProps, Input, message } from "antd";
import useLoginPost from "../service/mutation/use-login-post";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../config/cookie";
import { UserInfoEnum } from "../../../enum";

type FieldType = {
  login: string;
  hashed_password: string;
};

const LoginForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { data, isPending, error, mutate, isError } = useLoginPost();
  const onFinish: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
    mutate(values);
  };
  if (isError) {
    messageApi.error(error?.response?.data?.error?.message);
    form.resetFields();
  }
  if (data) {
    setCookie(UserInfoEnum.ACCESS_TOKEN, data.accessToken, 14);
    setCookie(UserInfoEnum.REFRESH_TOKEN, data.refreshToken, 30);
    setCookie(UserInfoEnum.USER, data.store, 14);
    navigate("/");
  }

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="basic"
        layout="vertical"
        style={{ maxWidth: "100%" }}
        onFinish={onFinish}
        className="login__form"
      >
        <Form.Item<FieldType>
          label="Username"
          name="login"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="hashed_password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null} style={{width: '100%'}}>
          <Button disabled={isPending} type="primary" htmlType="submit" style={{textAlign: 'center', width: '100%'}}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;

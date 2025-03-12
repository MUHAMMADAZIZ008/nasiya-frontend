import { useNavigate, useParams } from "react-router-dom";
import useOneDebt from "./service/query/use-one-debt";
import { IDebtImage } from "../../interface";
import { Button, Form, FormProps, Image, Input, message, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect } from "react";

import "./css/debt-about.css";
import { useDispatch } from "react-redux";
import { changeValue } from "../../store/slices/boart";
type FieldType = {
  debt_name: string;
  next_payment_date: string;
  debt_status: string;
  debt_period: number;
  debt_sum: string;
  total_month: number;
  description: string;
  images?: IDebtImage[];
};

const DebtAbout = () => {
  const dispatch = useDispatch();
  dispatch(changeValue({ title: "Debt", subTitle: "About" }));

  const [messageApi, setOutput] = message?.useMessage();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error } = useOneDebt(id || "");
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };
  
  if (error) {
    messageApi.error(error.message);
  }

  const [form] = Form.useForm();
  useEffect(() => {
    
    if (data) {
      form.setFieldsValue({
        debt_name: data?.debt_name,
        next_payment_date: data?.next_payment_date,
        debt_status: data?.debt_status,
        debt_period: data?.debt_period,
        debt_sum: data?.debt_sum,
        description: data?.description,
        total_month: data?.total_month,
      });
    }
  }, [data, isLoading, form]);

  if (isLoading) <Spin />;

  const goBack = () => {
    navigate(-1);
  };
  
  return (
    <section className="debt__about">
      {setOutput}
      <Button style={{ marginBottom: "10px" }} type="primary" onClick={goBack}>
        <ArrowLeftOutlined />
      </Button>
      <div>
        <div className="debt__form">
          <Form
            form={form}
            name="basic"
            layout="vertical"
            style={{ maxWidth: 500 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Debt name"
              name="debt_name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Debt sum"
              name="debt_sum"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Next payment date"
              name="next_payment_date"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Description"
              name="description"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Status"
              name="debt_status"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Period"
              name="debt_period"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Total month"
              name="total_month"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              {data?.images?.map((item) => (
                <Image src={item.image}/>
              ))}
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div>
          <h2>{data?.debt_name}</h2>
        </div>
      </div>
    </section>
  );
};

export default DebtAbout;

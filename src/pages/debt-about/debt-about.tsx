import { useNavigate, useParams } from "react-router-dom";
import useOneDebt from "./service/query/use-one-debt";
import { IDebtImage } from "../../interface";
import {
  Button,
  Form,
  FormProps,
  Image,
  Input,
  message,
  Select,
  Spin,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import "./css/debt-about.css";
import { useDispatch } from "react-redux";
import { changeValue } from "../../store/slices/boart";
import useUpdateDebt from "./service/mutation/use-update-debt";
import { DebtStatus } from "../../enum";
import QuenchOneMonth from "./components/quench-one-month";
import QuenchMultiMonth from "./components/quench-multi-month";
import QuenchAnyMonth from "./components/quench-any-month";
type FieldType = {
  debt_name: string;
  next_payment_date: string;
  debt_status: string;
  debt_period: number;
  debt_sum: string;
  total_month: string;
  description: string;
  images?: IDebtImage[];
};

const DebtAbout = () => {
  const dispatch = useDispatch();
  dispatch(changeValue({ title: "Debt", subTitle: "About" }));

  const [submitToggle, setSubmitToggle] = useState<boolean>(false);

  const [messageApi, setOutput] = message?.useMessage();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error } = useOneDebt(id || "");
  console.log(data?.total_month, data?.debt_period);

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

  // update debt
  const { mutate: debtUpdateMu } = useUpdateDebt();
  const onValuesChange = () =>
    // changedValues: Partial<FieldType>,
    // allValues: FieldType
    {
      setSubmitToggle(true);
    };

  const onFinish: FormProps<Partial<FieldType>>["onFinish"] = (values) => {
    console.log("Success:", values);
    debtUpdateMu(
      { id: data?.id || "", data: values },
      {
        onSuccess: () => {
          messageApi.success("successfully update!");
        },
        onError: (error) => {
          console.log(error);

          messageApi.error(error.message);
        },
      }
    );
  };

  return (
    <section className="debt__about">
      {setOutput}
      <Button style={{ marginBottom: "10px" }} type="primary" onClick={goBack}>
        <ArrowLeftOutlined />
      </Button>
      <div className="debt__wrapper">
        <div className="debt__form">
          <Form
            form={form}
            name="basic"
            onValuesChange={onValuesChange}
            layout="vertical"
            style={{ maxWidth: 500 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className="debt__about_form"
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
              <Select
                defaultValue={data?.debt_status}
                style={{ width: 120 }}
                value={"debt_status"}
                options={[
                  { value: DebtStatus.ACTIVE, label: "ACTIVE" },
                  { value: DebtStatus.CLOSED, label: "CLOSED" },
                ]}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Total month"
              name="total_month"
              rules={[{ required: true }]}
            >
              <Select defaultValue={data?.debt_period}>
                <Select.Option value="1">Month 1</Select.Option>
                <Select.Option value="2">Month 2</Select.Option>
                <Select.Option value="3">Month 3</Select.Option>
                <Select.Option value="4">Month 4</Select.Option>
                <Select.Option value="5">Month 5</Select.Option>
                <Select.Option value="6">Month 6</Select.Option>
                <Select.Option value="7">Month 7</Select.Option>
                <Select.Option value="8">Month 8</Select.Option>
                <Select.Option value="9">Month 9</Select.Option>
                <Select.Option value="10">Month 10</Select.Option>
                <Select.Option value="11">Month 11</Select.Option>
                <Select.Option value="12">Month 12</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ display: "flex", alignItems: "center", gap: "20px" }}
            >
              {data?.images?.map((item, index) => (
                <Image key={index} width={150} src={item.image} />
              ))}
            </Form.Item>
            <Form.Item label={null}>
              {submitToggle ? (
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              ) : (
                ""
              )}
            </Form.Item>
          </Form>
        </div>
        <div className="debt__quench-box">
          {data ? <QuenchOneMonth data={data} /> : ""}
          {data ? <QuenchMultiMonth data={data} /> : ""}
          {data ? <QuenchAnyMonth data={data} /> : ""}
        </div>
      </div>
    </section>
  );
};

export default DebtAbout;

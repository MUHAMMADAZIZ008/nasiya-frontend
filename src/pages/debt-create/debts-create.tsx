import {
  Button,
  Form,
  FormProps,
  Input,
  message,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUploadImg from "../customer-create/service/mutation/use-upload-img";
import { IUploadedFileRes } from "../../interface";
import { ArrowLeftOutlined } from "@ant-design/icons";
import useDebtCreate from "./service/mutation/use-debt-create";
import "./css/debts-create.css";
import { useDispatch } from "react-redux";
import { changeValue } from "../../store/slices/boart";

export type DebtForm = {
  debt_name: string;
  debt_period: number;
  debt_sum: string;
  description: string;
  images: string[];
  debtor?: string;
};

const DebtsCreate = () => {
  const dispatch = useDispatch();
  dispatch(changeValue({ title: "Customers", subTitle: "Debt create" }));

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    mutate: DebtMutate,
    isPending: DebtPending,
    isError: DebtIsError,
    error: DebtError,
  } = useDebtCreate();

  const [debtImages, setDebtImages] = useState<string[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { mutate, isError, error } = useUploadImg();

  if (isError) {
    messageApi.error(error.message);
  }

  if (DebtIsError) {
    messageApi.error(DebtError.message);
  }

  const [form] = Form.useForm();

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const changeUpload: UploadProps["onChange"] = ({ fileList }) => {
    const formData = new FormData();
    formData.append(`files`, fileList[0].originFileObj as Blob);
    mutate(formData, {
      onSuccess: (data: IUploadedFileRes[]) => {
        const image = data[0].path;

        setDebtImages((state) => [...state, image]);
      },
      onError: (error) => {
        messageApi.error(`Yuklashda xatolik: ${error.message}`);
      },
    });
    setFileList(fileList);
  };

  const onFinish: FormProps<DebtForm>["onFinish"] = (values) => {
    values.images = debtImages;
    values.debtor = id;
    values.debt_period = +values.debt_period;
    console.log(values);

    DebtMutate(values, {
      onSuccess: () => {
        messageApi.success("successfully create!");
        setDebtImages([]);
        form.resetFields();
        navigate(-1);
      },
    });
  };

  const goBack = () => {
    navigate(-1);
  };



  return (
    <section className="debt__create-page">
      {contextHolder}
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button type="primary" onClick={goBack}>
          <ArrowLeftOutlined />
        </Button>
      </div>
      <Form
        layout="vertical"
        form={form}
        name="basic"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<DebtForm>
          label="Product name"
          name="debt_name"
          rules={[
            { required: true, message: "Please input your product name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<DebtForm>
          label="Debt sum"
          name="debt_sum"
          rules={[{ required: true, message: "Please input your debt sum!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Loan term"
          name="debt_period"
          rules={[{ required: true, message: "Please input your loan term!" }]}
        >
          <Select>
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

        <Form.Item<DebtForm>
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Upload Image">
          <Upload
            beforeUpload={() => false}
            listType="picture-card"
            fileList={fileList}
            maxCount={2}
            onChange={changeUpload}
            onPreview={onPreview}
          >
            {fileList.length < 2 && "+ Upload"}
          </Upload>
        </Form.Item>

        <Form.Item label={null}>
          <Button disabled={DebtPending} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default DebtsCreate;

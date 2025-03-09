import {
  Button,
  Form,
  Input,
  message,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import useUploadImg from "./service/mutation/use-upload-img";
import { IUploadedFileRes } from "../../interface";
import useCreateDebtor from "./service/mutation/use-create-debtor";
import { useDispatch } from "react-redux";
import { changeValue } from "../../store/slices/boart";

export type FieldType = {
  full_name: string;
  phone_numbers: string[];
  address: string;
  description: string;
  images: string[];
};

const CustomerCreate = () => {
  const dispatch = useDispatch();

  dispatch(changeValue({ title: "Customers", subTitle: "Create customers" }));

  const [messageApi, contextHolder] = message.useMessage();

  const [debtorImages, setDebtorImages] = useState<string[]>([]);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { mutate, isError, error, isPending } = useUploadImg();

  if (isError) {
    messageApi.error(error.message);
  }

  const [form] = Form.useForm();

  const {
    mutate: debtorMutate,
    isError: debtorIsError,
    isPaused: isPausedDebtor,
    error: errorDebtor,
  } = useCreateDebtor();

  if (debtorIsError) {
    messageApi.error(errorDebtor?.message);
  }

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
        console.log(image);

        // if (image.length > 2) {
        //   messageApi.error("Only enter 2 images");
        //   message;
        //   return;
        // }
        setDebtorImages((state) => [...state, image]);
      },
      onError: (error) => {
        messageApi.error(`Yuklashda xatolik: ${error.message}`);
      },
    });
    setFileList(fileList);
  };
  message;

  const onFinish = (values: FieldType) => {
    // const formData = new FormData();

    // fileList.forEach((file) => {
    //   formData.append(`files`, file.originFileObj as Blob);
    // });

    // mutate(formData, {
    //   onSuccess: (data: IUploadedFileRes[]) => {
    //     const images = data.map((item) => item.path);
    //     console.log(images);

    //     if (images.length !== 2) {
    //       messageApi.error("Only enter 2 images");
    //       message;
    //       return;
    //     }
    //     form.setFieldsValue({ images });
    //   },
    //   onError: (error) => {
    //     messageApi.error(`Yuklashda xatolik: ${error.message}`);
    //   },
    // });

    form.setFieldsValue({ images: debtorImages });
    values.images = debtorImages;
    console.log(values);
    console.log(debtorImages);

    debtorMutate(values, {
      onSuccess: (res) => {
        messageApi.success("User successfully created!");
        form.resetFields();
        setDebtorImages([]);
      },
      onError: (error) => {
        messageApi.error(error.message);
        console.log(error);
      },
    });
  };

  const onFinishFailed = () => {
    console.log("Failed:");
  };

  return (
    <section className="customer__create-page">
      {contextHolder}
      <div>
        <Button type="primary" onClick={goBack}>
          <ArrowLeftOutlined />
        </Button>
      </div>

      <Form
        form={form}
        layout="vertical"
        name="dynamic_form_item"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Full name"
          name="full_name"
          rules={[{ required: true, message: "Please input full name!" }]}
        >
          <Input />
        </Form.Item>

        {/* Dinamik telefon raqamlari qo'shish */}
        <Form.List name="phone_numbers">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Form.Item
                  label={key === 0 ? "Phone numbers" : ""}
                  required={true}
                  key={key}
                >
                  <Form.Item
                    {...restField}
                    name={name}
                    rules={[
                      { required: true, message: "Please input phone number!" },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="Enter phone number"
                      style={{ width: "80%" }}
                    />
                  </Form.Item>
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(name)}
                  />
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add phone number
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
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

        <Form.Item>
          <Button disabled={isPausedDebtor} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default CustomerCreate;

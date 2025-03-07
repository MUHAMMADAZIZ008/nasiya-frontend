import { Button, Form, GetProp, Input, Upload, UploadFile, UploadProps } from "antd";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";

type FieldType = {
  full_name: string;
  phone_number: string[];
  address: string;
  description?: string;
  images: Blob[];
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


const CustomerCreate = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };


  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };


  const onFinish = (values: FieldType) => {
    console.log("Success:", values);
  };

  return (
    <section className="customer__create-page">
      <div>
        <Button type="primary" onClick={goBack}>
          <ArrowLeftOutlined />
        </Button>
      </div>

      <Form
        layout="vertical"
        name="dynamic_form_item"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
        <Form.List name="phone_number">
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

        <Form.Item
          label="Upload Image"
          name="images"
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList}
        >
          <ImgCrop rotationSlider>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 5 && "+ Upload"}
            </Upload>
          </ImgCrop>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default CustomerCreate;

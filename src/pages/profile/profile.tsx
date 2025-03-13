import {
  Button,
  Form,
  FormProps,
  Image,
  Input,
  message,
  Upload,
  UploadProps,
} from "antd";
import { useEffect } from "react";
import useGetProfile from "./service/query/use-get-profile";
import {
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import useAvatarUpload from "./service/mutation/use-avatar-upload";
import useUpdateStore from "./service/mutation/use-update-store";
import { QueryClient } from "@tanstack/react-query";
import "./css/profile.css";
import { useDispatch } from "react-redux";
import { changeValue } from "../../store/slices/boart";
import useAvatarDelete from "./service/mutation/use-avatar-delete";

type FieldType = {
  full_name?: string;
  phone_number?: string;
  email?: string;
};

export interface UpdateType {
  image?: string;
  full_name?: string;
  phone_number?: string;
  email?: string;
}

const Profile = () => {
  const dispatch = useDispatch();

  dispatch(changeValue({ title: "Profile", subTitle: "Profile" }));

  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm(); // Form instance
  const client = new QueryClient();
  const { data } = useGetProfile();
  const { mutate, isPending } = useAvatarUpload();
  const { mutate: updateMutate } = useUpdateStore();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        full_name: data.full_name,
        phone_number: data.phone_number,
        email: data.email,
      });
    }
  }, [data, form]);

  const handleChange: UploadProps["onChange"] = ({ fileList }) => {
    const formData = new FormData();
    formData.append(`files`, fileList[0].originFileObj as Blob);
    mutate(formData, {
      onSuccess: (data2) => {
        updateMutate(
          { id: data?.id || "", data: { image: data2[0].path } },
          {
            onSuccess: () => {
              client.invalidateQueries({ queryKey: ["profile"] });
            },
          }
        );
      },
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    updateMutate(
      { id: data?.id || "", data: values },
      {
        onSuccess: () => {
          client.invalidateQueries({
            queryKey: ["profile"],
          });
          messageApi.success("successfully updated!");
        },
      }
    );
  };

  // delete avatar
  const { mutate: deleteAvatarMu } = useAvatarDelete();

  const deletePicture = () => {
    deleteAvatarMu(
      { id: data?.id || "", image: null },
      {
        onSuccess: () => {
          client.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (error) => {
          messageApi.error(error.message);
        },
      }
    );
  };

  return (
    <section className="profile">
      {contextHolder}
      <div className="profile__wrapper">
        <div className="profile__aside">
          <div style={{ position: "relative", width: "100px" }}>
            {data?.image ? (
              <div>
                <Image
                  width={100}
                  src={data?.image}
                  alt="avatar"
                  height={100}
                  style={{ width: "100%" }}
                />
                <button
                  onClick={deletePicture}
                  style={{
                    border: 0,
                    position: "absolute",
                    right: "0",
                    bottom: "0",
                    color: "white",
                    fontWeight: "bold",
                    width: "25px",
                    height: "25px",
                    borderRadius: "100%",
                    fontSize: "16px",
                    backgroundColor: "red",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  type="button"
                >
                  {isPending ? <LoadingOutlined /> : <DeleteOutlined />}
                </button>
              </div>
            ) : (
              <Upload
                style={{ marginBottom: "20px" }}
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleChange}
              >
                <button style={{ border: 0, background: "none" }} type="button">
                  {isPending ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            )}
          </div>
          <h2 className="profile__name">{data?.full_name}</h2>
        </div>
        <div className="profile__content">
          <Form
            form={form} // Form instance
            name="basic"
            layout="vertical"
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<FieldType> label="Full name" name="full_name">
              <Input />
            </Form.Item>

            <Form.Item<FieldType> label="Phone number" name="phone_number">
              <Input />
            </Form.Item>

            <Form.Item<FieldType> label="Email" name="email">
              <Input />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Profile;

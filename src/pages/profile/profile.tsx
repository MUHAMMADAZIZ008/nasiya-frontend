import { Upload, UploadProps } from "antd";
import useGetProfile from "./service/query/use-get-profile";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import useAvatarUpload from "./service/mutation/use-avatar-upload";

const Profile = () => {
  const { data } = useGetProfile();

  const { mutate, isPending } = useAvatarUpload();

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {isPending ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleChange: UploadProps["onChange"] = ({ fileList }) => {
    const formData = new FormData();
    formData.append(`files`, fileList[0].originFileObj as Blob);
    mutate(formData, {
      onSuccess: (data) => {
        console.log(data);
      },
    });
  };

  return (
    <section className="profile">
      <div className="profile__wrapper">
        <div className="profile__aside">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleChange}
          >
            {data?.image ? (
              <img src={data.image} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div className="profile__content"></div>
      </div>
    </section>
  );
};

export default Profile;

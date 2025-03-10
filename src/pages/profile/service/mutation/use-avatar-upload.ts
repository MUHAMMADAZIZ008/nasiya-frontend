import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

const useAvatarUpload = () => {
  return useMutation({
    mutationFn: (uploadFile: FormData) =>
      request
        .post("upload", uploadFile, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
  });
};

export default useAvatarUpload;

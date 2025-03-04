import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { ILogin } from "../../../../interface";

const useLoginPost = () => {
  return useMutation({
    mutationFn: (data: ILogin) =>
      request.post("auth/login", data).then((res) => res.data),
  });
};

export default useLoginPost;

import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { LikeApiResponse } from "../../../../interface";

const useLikeCreate = () => {
  return useMutation({
    mutationFn: (id: string) =>
      request.post<LikeApiResponse>("/likes", { debtor: id }).then((res) => res.data),
  });
};

export default useLikeCreate;

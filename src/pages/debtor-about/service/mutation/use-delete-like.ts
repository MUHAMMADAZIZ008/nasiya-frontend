import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

const useDeleteLike = () => {
  return useMutation({
    mutationFn: (id: string) =>
      request.delete(`/likes/${id}`).then((res) => res.data),
  });
};

export default useDeleteLike;

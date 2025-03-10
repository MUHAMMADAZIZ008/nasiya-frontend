import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

const useGetLike = (id: string) => {
  return useQuery({
    queryKey: ["like_one", id],
    queryFn: () =>
      request
        .get<{ status_code: number; data: any }>(`/likes/${id}`)
        .then((res) => res.data),
  });
};

export default useGetLike;

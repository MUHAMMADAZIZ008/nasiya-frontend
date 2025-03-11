import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { UpdateType } from "../../profile";

interface dataT {
  id: string;
  data: UpdateType;
}

const useUpdateStore = () => {
  return useMutation({
    mutationFn: (data: dataT) =>
      request.put(`/store/${data.id}`, data.data).then((res) => res.data),
  });
};

export default useUpdateStore;

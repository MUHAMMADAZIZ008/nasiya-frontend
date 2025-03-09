import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

const useDeleteDebtor = () => {
  return useMutation({
    mutationFn: (id: string) =>
      request.delete(`debtor/${id}`).then((res) => res.data),
  });
};

export default useDeleteDebtor;

import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

const useDeleteDebt = () => {
  return useMutation({
    mutationFn: (id: string) =>
      request.delete(`/debts/${id}`).then((res) => res.data),
  });
};

export default useDeleteDebt;

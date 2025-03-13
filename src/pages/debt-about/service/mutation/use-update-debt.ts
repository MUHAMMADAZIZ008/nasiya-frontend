import { useMutation } from "@tanstack/react-query";
import { IDebt } from "../../../../interface";
import { request } from "../../../../config/request";

export interface debtUpdate {
  id: string;
  data: Partial<IDebt>;
}

const useUpdateDebt = () => {
  return useMutation({
    mutationFn: (data: debtUpdate) =>
      request.put(`/debts/${data.id}`, data.data).then((res) => res.data),
  });
};

export default useUpdateDebt;

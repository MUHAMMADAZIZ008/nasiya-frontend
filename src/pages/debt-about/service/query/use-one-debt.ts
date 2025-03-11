import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { IDebt } from "../../../../interface";

const useOneDebt = (id: string) => {
  return useQuery({
    queryKey: ["one_debt", id],
    queryFn: () => request.get<IDebt>(`/debts/${id}`).then((res) => res.data),
  });
};

export default useOneDebt;

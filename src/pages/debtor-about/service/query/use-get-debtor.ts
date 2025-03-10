import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { IDebtor, IDebtorData } from "../../../../interface";

const useGetDebtor = (id: string) => {
  return useQuery({
    queryKey: ["one_debtor", id],
    queryFn: () =>
      request.get<IDebtorData>(`/debtor/${id}`).then((res) => res.data.data),
  });
};

export default useGetDebtor;

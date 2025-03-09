import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { IDebtor } from "../../../../interface";

const useGetDebtor = (id: string) => {
  return useQuery({
    queryKey: ["one_debtor", id],
    queryFn: () =>
      request.get<IDebtor>(`/debtor/${id}`).then((res) => res.data),
  });
};

export default useGetDebtor;

import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { IDebtor } from "../../../../interface";

const useGetAllDebtor = () => {
  return useQuery({
    queryKey: ["debtors_list"],
    queryFn: () =>
      request
        .get<{ data: IDebtor[]; message: string; status_code: number }>(
          "/debtor"
        )
        .then((res) => res.data),
  });
};

export default useGetAllDebtor;

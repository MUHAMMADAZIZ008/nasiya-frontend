import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { IDebtor } from "../../../../interface";
import { IQuerySearch } from "../../customers";

const useGetAllDebtor = (searchQuery: IQuerySearch) => {
  return useQuery({
    queryKey: ["debtors_list"],
    queryFn: () =>
      request
        .get<{ data: IDebtor[]; message: string; status_code: number }>(
          "/debtor/search",
          { params: searchQuery }
        )
        .then((res) => res.data),
  });
};

export default useGetAllDebtor;

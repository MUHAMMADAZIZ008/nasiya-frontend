import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { IDebtor } from "../../../../interface";
import { IQuerySearch } from "../../customers";

const useGetAllDebtor = (searchQuery: IQuerySearch) => {
  return useQuery({
    queryKey: ["debtors_list",searchQuery],
    queryFn: () =>
      request
        .get<{ data: IDebtor[]; message: string; status_code: number }>(
          "/debtor/search",
          {
            params: {
              search: searchQuery.search,
              search_by: searchQuery.search_by,
              order_by: searchQuery.order_by,
              take: searchQuery.take,
              skip: searchQuery.skip,
            },
          }
        )
        .then((res) => {
          return res.data;
        }),
  });
};

export default useGetAllDebtor;

import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { IStoreStatistic } from "../../../../interface";

export const useGetStatistic = () => {
  return useQuery({
    queryKey: ["home-statistic"],
    queryFn: () =>
      request.get<IStoreStatistic>("/store/statistics").then((res) => res.data),
  });
};

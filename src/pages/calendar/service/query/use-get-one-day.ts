import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

const useGetOneDay = (date: Date) => {
  return useQuery({
    queryKey: ["calendar_data", date],
    queryFn: () =>
      request.get("/store/one-day-debts", {
        params: {
          date: date,
        },
      }),
  });
};

export default useGetOneDay;

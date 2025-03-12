import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { CalendarApi } from "../../../../interface";

const useGetOneDay = (date: string) => {
  return useQuery({
    queryKey: ["calendar_data", date],
    queryFn: () =>
      request
        .get<CalendarApi>("/store/one-day-debts", {
          params: {
            date: date,
          },
        })
        .then((res) => res.data),
  });
};

export default useGetOneDay;

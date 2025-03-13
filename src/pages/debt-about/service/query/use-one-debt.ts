import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { DebtAboutApi} from "../../../../interface";

const useOneDebt = (id: string) => {
  return useQuery({
    queryKey: ["one_debt", id],
    queryFn: () => request.get<DebtAboutApi>(`/debts/${id}`).then((res) => res.data.data),
  });
};

export default useOneDebt;

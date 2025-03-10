import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { DebtForm } from "../../debts-create";

const useDebtCreate = () => {
  return useMutation({
    mutationFn: (data: DebtForm) =>
      request.post("/debts", data).then((res) => res.data),
  });
};

export default useDebtCreate;

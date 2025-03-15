import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { PaymentDataT } from "../../../../interface";

const useAnyPayment = () => {
  return useMutation({
    mutationFn: (data: Omit<PaymentDataT, "monthCount">) =>
      request
        .post("/payment/for-month", {
          sum: data.sum,
          type: data.type,
          debtId: data.debtId,
        })
        .then((res) => res.data),
  });
};

export default useAnyPayment;

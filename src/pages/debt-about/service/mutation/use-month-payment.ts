import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { PaymentDataT } from "../../../../interface";

const useMonthPayment = () => {
  return useMutation({
    mutationFn: (data: PaymentDataT) =>
      request
        .post(
          "/payment/for-month",
          {
            sum: data.sum,
            type: data.type,
            debtId: data.debtId,
          },
          {
            params: {
              monthCount: data.monthCount,
            },
          }
        )
        .then((res) => res.data),
  });
};

export default useMonthPayment;

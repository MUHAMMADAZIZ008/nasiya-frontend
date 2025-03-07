import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { FieldType } from "../../customer-create";

const useCreateDebtor = () => {
  return useMutation({
    mutationFn: (data: FieldType) =>
      request.post<FieldType>("/debtor", data).then((res) => res.data),
  });
};

export default useCreateDebtor;

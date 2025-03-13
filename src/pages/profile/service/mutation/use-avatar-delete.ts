import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export interface deleteAvatarT {
  id: string;
  image: null;
}

const useAvatarDelete = () => {
  return useMutation({
    mutationFn: (data: deleteAvatarT) =>
      request
        .put(`/store/${data.id}`, { image: data.image })
        .then((res) => res.data),
  });
};

export default useAvatarDelete;

import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { Profile } from "../../../../interface";

const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => request.get<Profile>("/auth/profile").then((res) => res.data.data),
  });
};
export default useGetProfile;

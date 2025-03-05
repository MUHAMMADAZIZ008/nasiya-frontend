import axios from "axios";
import { getCookie } from "./cookie";
import { UserInfoEnum } from "../enum";

export const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

request.interceptors.request.use((_config) => {
  const token = getCookie(UserInfoEnum.ACCESS_TOKEN);
  _config.headers.Authorization = `Bearer ${token}`;
  return _config;
});

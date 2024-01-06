import axios, { AxiosRequestConfig } from "axios";
// config
import { HOST_API } from "../config-global";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  product: {
    list: "/api/products",
    details: "/api/products/details",
    search: "/api/products/search",
    latest: "/api/products/latest",
    related: "/api/products/related",
  },
};

//

export type ResponseType<T> = {
  data?: T;
  message: string;
};

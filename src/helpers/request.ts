import axios, { type AxiosInstance } from "axios";

axios.defaults.timeout = 10 * 60 * 1000;

declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}

const service: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.PROD && import.meta.env.MODE !== "test"
      ? "https://www.waltonchain.pro/v2/api"
      : "/v2/api",
});

// response interception
service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      return Promise.reject(response.data.message || "Network error");
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;

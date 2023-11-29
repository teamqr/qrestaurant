import _axios from "axios";

const axios = _axios.create({
  baseURL: "http://192.168.0.94:8080",
});

axios.interceptors.request.use(
  async (config) => {
    // const token = await getToken();

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;

import _axios from "axios";

const axios = _axios.create({
  baseURL: "http://localhost:8080",
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

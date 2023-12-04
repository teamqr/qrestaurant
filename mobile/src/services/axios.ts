import _axios from "axios";

import { useAuthStore } from "@/stores/auth";
import { getToken, clearToken } from "@/utils/token";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8080";

const axios = _axios.create({
  baseURL: BASE_URL,
});

axios.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  async (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      await clearToken();
      await useAuthStore.getState().signOut();
    }

    return Promise.reject(error);
  },
);

export default axios;

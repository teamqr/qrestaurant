import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth.token" as const;

export const setToken = async (token: string) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

export const getToken = async () => {
  return SecureStore.getItemAsync(TOKEN_KEY);
};

export const clearToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};

import { create } from "zustand";

export type SignUpState = {
  email: string;
  password: string;
  setCache: ({ email, password }: { email: string; password: string }) => void;
  resetCache: () => void;
};

export const useSignUpStore = create<SignUpState>((set, get) => ({
  email: "",
  password: "",
  setCache: ({ email, password }) => {
    set({
      email,
      password,
    });
  },
  resetCache: () => {
    set({
      email: "",
      password: "",
    });
  },
}));

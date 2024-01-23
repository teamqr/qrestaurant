import { create } from "zustand";

import { AppUser } from "@/common/types";
import { SignInSchemaType, SignUpSchemaType } from "@/context/auth/types";
import { auth } from "@/services/auth";
import { wait } from "@/utils/promise";
import { clearToken, getToken, setToken } from "@/utils/token";

type AuthState = {
  user: AppUser | null;
  signUp: (creds: SignUpSchemaType) => Promise<void>;
  signInWithEmailAndPassword: (creds: SignInSchemaType) => Promise<void>;
  signOut: () => Promise<void>;
  validateToken: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  signUp: async ({
    email,
    password,
    firstname,
    lastname,
  }: SignUpSchemaType) => {
    await wait(1000);

    await auth.signUp({
      email,
      password,
      firstname,
      lastname,
    });
  },
  signInWithEmailAndPassword: async ({ email, password }: SignInSchemaType) => {
    await wait(1000);

    const token = await auth.signInWithEmailAndPassword({
      email,
      password,
    });

    if (token) {
      await get().validateToken();
      await setToken(token);
    } else {
      // throw new Error("Invalid credentials");
    }
  },
  signOut: async () => {
    set({ user: null });
    await clearToken();
  },
  validateToken: async () => {
    const token = await getToken();

    if (!token) return;

    const user = await auth.me();

    if (user) {
      set({ user });
    }
  },
}));

export const useIsAuthenticated = () => {
  const user = useAuthStore((state) => state.user);
  return !!user;
};

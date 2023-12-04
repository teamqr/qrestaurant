import axios from "./axios";

import {
  SignInResponseSchema,
  SignInSchemaType,
  SignUpSchemaType,
} from "@/context/auth/types";

export const auth = {
  signUp: async (data: SignUpSchemaType) => {
    try {
      await axios.post(
        "api/app/auth/register",
        data satisfies SignUpSchemaType,
      );
    } catch (error) {
      throw error;
    }
  },

  signInWithEmailAndPassword: async ({ email, password }: SignInSchemaType) => {
    try {
      const response = await axios.post("api/app/auth/login", {
        email,
        password,
      });

      const { token } = SignInResponseSchema.parse(response.data);

      return token;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  me: async () => {
    try {
      const response = await axios.get("api/app/user/me");

      return response.data?.me;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

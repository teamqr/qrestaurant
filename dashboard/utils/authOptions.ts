import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthCredentials } from "@/types/AuthCredentials";

async function getToken(credentials: AuthCredentials) {
  const reqUrl = process.env.SERVER_URL + "/api/dashboard/auth/login";

  const res = await fetch(reqUrl, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const json = await res.json();
    return JSON.stringify(json.token);
  }
  const errorMessage =
    "Status " + res.status.toString() + " - " + res.statusText.toString();
  throw new Error(errorMessage);
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail" },
        password: { label: "Hasło" },
      },
      async authorize(credentials, req) {
        credentials = {
          email: req.body?.email,
          password: req.body?.password,
        };
        try {
          const token = await getToken(credentials);
          const userData = {
            id: "1",
            email: credentials.email,
            token: token,
          };

          return userData;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

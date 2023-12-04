import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthCredentials } from "@/types/AuthCredentials";
import { serverUrl } from "@/config/serverConfig";
import { decodeToken } from "./apiUtils";
import { TokenData } from "@/types/TokenData";
import { cookies } from "next/headers";
import { sealData } from "iron-session";

async function getToken(credentials: AuthCredentials) {
  const reqUrl = `${serverUrl}/api/dashboard/auth/login`;

  const res = await fetch(reqUrl, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const json = await res.json();

    return json.token;
  }
  const errorMessage = `Status  ${res.status} - ${res.statusText}`;
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
        const cookieStore = cookies();
        credentials = {
          email: req.body?.email,
          password: req.body?.password,
        };
        try {
          const token = await getToken(credentials);
          const tokenData: TokenData = await decodeToken(token);
          const sessionSecret: string = process.env.SESSION_SECRET || "";
          const sealedToken = await sealData(token, {
            password: sessionSecret,
          });
          cookieStore.set("user-token", sealedToken, {
            sameSite: "strict",
            httpOnly: true,
          });
          const userData = {
            id: "1",
            email: credentials.email,
            userToken: token,
            role: tokenData.role,
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
  session: {
    maxAge: 60 * 60 * 24, // Session token expires after 24 hours
  },
  callbacks: {
    async jwt({ token, trigger, user }) {
      if (trigger == "signIn") {
        token.userToken = user.userToken;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.userToken = token.userToken;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

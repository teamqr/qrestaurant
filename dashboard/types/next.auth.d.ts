import NextAuth, { DefaultUser } from "next-auth";
import { DefaultSession } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      userToken: string;
      role: string;
    } & DefaultSession["user"];
  }
  interface User {
    id: number;
    userToken: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface DefaultJWT {
    id: number;
    userToken: string;
    role: string;
  }
}

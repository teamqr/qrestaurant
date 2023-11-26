import NextAuth, { DefaultUser } from "next-auth";
import { DefaultSession } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      userToken?: string;
    } & DefaultSession["user"];
  }
  interface User {
    userToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface DefaultJWT {
    userToken?: string;
  }
}

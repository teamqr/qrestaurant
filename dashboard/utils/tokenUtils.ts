"use server";
import { unsealData } from "iron-session";
import { cookies } from "next/headers";
import { decodeToken } from "./apiUtils";

export async function removeTokenFromCookies() {
  const cookieStore = cookies();
  cookieStore.delete("user-token");
}

export async function getTokenFromCookies() {
  const cookiesStore = cookies();
  const sessionSecret: string = process.env.SESSION_SECRET || "";
  const encryptedToken = cookiesStore.get("user-token")?.value;
  const token: string | null = encryptedToken
    ? await unsealData(encryptedToken, { password: sessionSecret })
    : null;

  return token;
}

export async function getTokenData(token: string) {
  const decodedToken = await decodeToken(token);
  return decodedToken;
}

"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";

interface Props {
  children?: React.ReactNode;
  session?: Session | null;
}

const NextAuthSessionProvider = ({ children, session }: Props) => {
  return <SessionProvider session={session} basePath="/dashboard/api/auth">{children}</SessionProvider>;
};

export default NextAuthSessionProvider;

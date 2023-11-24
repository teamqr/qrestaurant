"use client";
import LoginForm from "@/components/auth/LoginForm";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return <></>;
  }

  return (
    <div className="flex flex-col justify-center items-center ">
      <main>
        <h1>Main dashboard</h1>
        <p>Zalogowano jako {session.user?.email}</p>
        <button onClick={() => signOut()}>Wyloguj się</button>
      </main>
    </div>
  );
}

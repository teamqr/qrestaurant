"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";

const HomePage = () => {
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
        <button
          onClick={() => {
            signOut();
          }}
        >
          Wyloguj się
        </button>
      </main>
    </div>
  );
};

export default HomePage;

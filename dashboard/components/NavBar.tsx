"use client";
import { removeTokenFromCookies } from "@/utils/tokenUtils";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <div>
      <header className="flex justify-center bg-gray-900 px-5 p-5 mb-5">
        <div className="flex text-6xl justify-center items-center w-full">
          <Link href="/">
            <strong>QR</strong>estaurant
          </Link>
        </div>
        <div id="signOutButton">
          {session?.user ? (
            <>
              <button
                className="text-red-500"
                onClick={async () => {
                  await removeTokenFromCookies();
                  signOut();
                }}
              >
                Wyloguj się
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </header>
    </div>
  );
};

export default NavBar;

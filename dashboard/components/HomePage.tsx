"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Role } from "@/types/Role";

type Props = {
  restaurantName: string | null;
  token: string | null;
};

const HomePage = (props: Props) => {
  if (!props.token) {
    signOut({ redirect: false });
  }

  const { data: session, status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return <></>;
  }

  const restaurant = props?.restaurantName;

  const role = session.user?.role == Role.ADMIN ? "Administrator" : "Pracownik";

  return (
    <div className="flex flex-col px-5">
      <h1 className="flex flex-col justify-center items-center m-5">
        Strona główna
      </h1>
      <main>
        <div id="userData" className="flex justify-between mb-10">
          <div>
            <p>Restauracja: {restaurant} </p>
          </div>
          <div className="flex flex-col items-end">
            <p>Zalogowano jako: {session.user?.email}</p>
            <p>Rola: {role} </p>
          </div>
        </div>
        <div className="flex justify-center items-center flex-wrap ">
          {session.user?.role == Role.ADMIN ? (
            <div className="flex justify-center items-center flex-wrap ">
              <Link
                className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500 m-5 "
                href="/restaurant"
              >
                Zarządzaj restauracją
              </Link>
              <Link
                className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500 m-5"
                href="/menu"
              >
                Zarządzaj menu
              </Link>
            </div>
          ) : (
            <></>
          )}
          <Link
            className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500 m-5"
            href="/tables"
          >
            Zarządzaj stolikami
          </Link>
          <Link
            className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500 m-5 "
            href="/orders"
          >
            Oczekujące zamówienia
          </Link>
          <Link
            className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 hover:bg-blue-500 m-5 "
            href="/orders/history"
          >
            Historia zamówień
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

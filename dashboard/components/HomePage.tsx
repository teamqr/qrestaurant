"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Role } from "@/types/Role";

type Props = {
  restaurantName: string | undefined;
};

const HomePage = (props: Props) => {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return <></>;
  }

  const restaurant = props?.restaurantName;

  return (
    <div className="flex flex-col px-5">
      <main>
        <div id="userData" className="flex justify-around mb-10">
          <p>Zalogowano jako {session.user?.email}</p>
          <p>Restauracja: {restaurant} </p>
        </div>
        {session.user?.role == Role.ADMIN ? (
          <div className="flex justify-center items-center ">
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
      </main>
    </div>
  );
};

export default HomePage;

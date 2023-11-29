"use client";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { fetchRestaurantData } from "@/utils/fetchRestaurant";

const HomePage = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  const token = session?.user?.userToken;

  const [restaurant, setResturant] = useState(undefined);

  (async () => {
    const restaurantData = await fetchRestaurantData(token);
    setResturant(restaurantData?.name);
  })();

  if (status === "loading") {
    return <></>;
  }

  return (
    <div className="flex flex-col px-5">
      <main>
        <div id="userData" className="flex justify-around mb-10">
          <p>Zalogowano jako {session.user?.email}</p>
          <p>Restauracja: {restaurant} </p>
        </div>
        {session.user?.role == "ADMIN" ? (
          <div className="flex justify-center items-center ">
            <Link
              className="block rounded-md border-0 my-4 py-1.5 px-7 text-white-900 ring-1 ring-inset ring-gray-300 hover:ring-2 "
              href="/restaurant"
            >
              Zarządzaj restauracją
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

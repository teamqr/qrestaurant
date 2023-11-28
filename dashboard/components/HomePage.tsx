"use client";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

async function fetchRestaurantData(token: any) {
  if (token) {
    const tokenData: any = jwtDecode(token);
    const restaurantId: number = tokenData.restaurantId;
    const reqUrl = `http://localhost:8080/api/dashboard/restaurant/${restaurantId}`;
    const res = await fetch(reqUrl, {
      headers: { Authorization: "Bearer " + token },
    });
    if (res.ok) {
      const json = await res.json();
      return json.restaurant;
    }
  }
  return null;
}

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
    <div className="flex flex-col justify-center items-center ">
      <main>
        <h1>Main dashboard</h1>
        <p>Zalogowano jako {session.user?.email}</p>
        <p>Restauracja: {restaurant} </p>
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

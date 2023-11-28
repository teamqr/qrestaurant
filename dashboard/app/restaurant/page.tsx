"use client";

import { fetchRestaurantData } from "@/utils/fetchRestaurant";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const RestaurantManagement = () => {
  const { data: session, status } = useSession({
    required: true,
  });
  const [restaurant, setResturant] = useState(undefined);
  const token = session?.user.userToken;
  (async () => {
    const restaurantData = await fetchRestaurantData(token);
    setResturant(restaurantData?.name);
  })();

  if (status != "authenticated") {
    return <></>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl">Zarządzanie restauracją</h1>
      <h2>{restaurant}</h2>
    </div>
  );
};

export default RestaurantManagement;
